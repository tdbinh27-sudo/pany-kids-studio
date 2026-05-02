// Kid types + default data — keep in sync with web's DEFAULT_KIDS

export interface Kid {
  id: string;
  name: string;
  age: number;
  color: string;
  emoji: string;
  pin: string;
  birthday?: string;
  school?: string;
  hobbies?: string;
  goals?: string;
  bio?: string;
  favoriteSubject?: string;
}

export const DEFAULT_KIDS: Kid[] = [
  { id: 'kid_1', name: 'Phúc', age: 8, color: '#FF6B9D', emoji: '🌟', pin: '1111' },
  { id: 'kid_2', name: 'An', age: 10, color: '#4DABF7', emoji: '🚀', pin: '2222' },
  { id: 'kid_3', name: 'Y', age: 12, color: '#51CF66', emoji: '🎨', pin: '3333' },
];
