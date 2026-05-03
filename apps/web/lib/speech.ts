// Web Speech API wrappers — TTS (SpeechSynthesis) + ASR (SpeechRecognition)
// Browser compat: Chrome / Edge / Safari (full), Firefox (TTS only — no ASR).

type SpeechRecognitionEvent = {
  results: {
    [index: number]: {
      [index: number]: { transcript: string; confidence: number };
      isFinal: boolean;
    };
    length: number;
  };
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: { error: string; message?: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

// Feature detection
export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function asrSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// ============================================================
// TTS — speak text aloud
// ============================================================
export interface SpeakOptions {
  lang?: string; // 'en-US' | 'en-GB' | 'vi-VN'
  rate?: number; // 0.1 - 10, default 1
  pitch?: number; // 0 - 2, default 1
  voice?: SpeechSynthesisVoice | null;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function speak(text: string, opts: SpeakOptions = {}): boolean {
  if (!ttsSupported()) return false;

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = opts.lang || 'en-US';
  utter.rate = opts.rate ?? 0.9; // slightly slower for kids
  utter.pitch = opts.pitch ?? 1;
  if (opts.voice) utter.voice = opts.voice;
  if (opts.onEnd) utter.onend = opts.onEnd;
  if (opts.onError) utter.onerror = opts.onError;

  window.speechSynthesis.speak(utter);
  return true;
}

export function stopSpeaking(): void {
  if (ttsSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function getVoices(lang: string = 'en'): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  const all = window.speechSynthesis.getVoices();
  return all.filter((v) => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
}

// Some browsers populate voices async — call this on first user interaction
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!ttsSupported()) return Promise.resolve([]);
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    const onChange = () => {
      const voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = null;
      resolve(voices);
    };
    window.speechSynthesis.onvoiceschanged = onChange;
    // Safety timeout
    setTimeout(() => {
      window.speechSynthesis.onvoiceschanged = null;
      resolve(window.speechSynthesis.getVoices());
    }, 2000);
  });
}

// ============================================================
// ASR — listen and transcribe speech
// ============================================================
export interface ListenResult {
  transcript: string;
  confidence: number;
}

export interface ListenOptions {
  lang?: string; // 'en-US' default
  timeout?: number; // ms before auto-stop, default 8000
  onInterim?: (text: string) => void; // partial results during recording
}

export function listen(opts: ListenOptions = {}): Promise<ListenResult> {
  return new Promise((resolve, reject) => {
    if (!asrSupported()) {
      reject(new Error('Speech recognition not supported in this browser. Try Chrome or Edge.'));
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition!;
    const recognition = new SR();
    recognition.lang = opts.lang || 'en-US';
    recognition.interimResults = !!opts.onInterim;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    let resolved = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    recognition.onresult = (e) => {
      let bestTranscript = '';
      let bestConfidence = 0;
      for (let i = 0; i < e.results.length; i++) {
        const result = e.results[i];
        const alt = result[0];
        if (result.isFinal) {
          bestTranscript = alt.transcript;
          bestConfidence = alt.confidence;
        } else if (opts.onInterim) {
          opts.onInterim(alt.transcript);
        }
      }
      if (bestTranscript && !resolved) {
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        recognition.stop();
        resolve({ transcript: bestTranscript, confidence: bestConfidence });
      }
    };

    recognition.onerror = (e) => {
      if (!resolved) {
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        reject(new Error(e.error || 'recognition_error'));
      }
    };

    recognition.onend = () => {
      if (!resolved) {
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        reject(new Error('no_speech_detected'));
      }
    };

    timeoutId = setTimeout(() => {
      if (!resolved) {
        try {
          recognition.stop();
        } catch {}
      }
    }, opts.timeout || 8000);

    try {
      recognition.start();
    } catch (e: any) {
      if (!resolved) {
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        reject(e);
      }
    }
  });
}
