# -*- coding: utf-8 -*-
"""
Phase 3b verification script for pany-kids-studio
Tests: English tab, Library tab structure, console errors
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
from playwright.sync_api import sync_playwright
import json

URL = "https://pany-kids-studio.vercel.app/"
SCREENSHOTS = [
    ("C:/tmp/01_overview.png", "Overview tab loaded"),
    ("C:/tmp/02_english_tab.png", "English skills tab"),
    ("C:/tmp/03_english_bottom.png", "English bottom - bilingual stories"),
    ("C:/tmp/04_library_tab.png", "Library tab full view"),
    ("C:/tmp/05_library_bottom.png", "Library bottom - Q&A card"),
]

results = {}
console_errors = []

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        # Capture console errors
        page.on("console", lambda msg: console_errors.append({"type": msg.type, "text": msg.text}) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append({"type": "pageerror", "text": str(err)}))

        # --- STEP 1: Navigate to Overview ---
        print("Navigating to", URL)
        page.goto(URL, wait_until="networkidle", timeout=30000)
        page.screenshot(path="C:/tmp/01_overview.png", full_page=False)

        # Check overview tab is visible
        overview_text = page.inner_text("body")
        results["overview_loaded"] = "Tiếng Anh" in overview_text or "English" in overview_text or "Thư viện" in overview_text

        # --- STEP 2: Click "Tiếng Anh" card on Overview ---
        print("Looking for Tiếng Anh card...")
        # Try various selectors
        english_card = None
        for sel in ['text="🇬🇧 Tiếng Anh"', 'text="Tiếng Anh"', '[data-tab="english-skills"]', 'button:has-text("Tiếng Anh")']:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    english_card = sel
                    break
            except:
                pass

        if english_card:
            page.locator(english_card).first.click()
            page.wait_for_timeout(1000)
        else:
            # Try clicking any element containing Tiếng Anh
            page.locator("text=Tiếng Anh").first.click()
            page.wait_for_timeout(1000)

        page.screenshot(path="C:/tmp/02_english_tab.png", full_page=False)

        # Check URL/hash or tab indicator
        url_after = page.url
        results["english_url"] = url_after
        body_text = page.inner_text("body")

        # Check 4-skill mode toggle
        results["english_4_skills"] = all(s in body_text for s in ["Nghe", "Nói", "Đọc", "Viết"])

        # Scroll to bottom to find bilingual stories card
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)
        page.screenshot(path="C:/tmp/03_english_bottom.png", full_page=False)

        body_text_full = page.inner_text("body")
        results["english_bilingual_card"] = "Truyện song ngữ" in body_text_full
        results["english_level_filter"] = all(s in body_text_full for s in ["K", "A1", "A2", "B1"])

        # --- STEP 3: Go back to Overview ---
        print("Going back to overview...")
        # Try clicking Overview tab/button
        went_back = False
        for sel in ['text="Tổng quan"', 'text="Overview"', '[data-tab="overview"]', 'button:has-text("Tổng quan")']:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    el.click()
                    page.wait_for_timeout(800)
                    went_back = True
                    break
            except:
                pass

        if not went_back:
            page.go_back()
            page.wait_for_timeout(1000)

        # --- STEP 4: Click "Thư viện" card ---
        print("Looking for Thư viện card...")
        for sel in ['text="📚 Thư viện"', 'text="Thư viện"', '[data-tab="library"]', 'button:has-text("Thư viện")']:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    el.click()
                    page.wait_for_timeout(1000)
                    break
            except:
                pass

        page.scroll_into_view_if_needed = lambda: None
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)
        page.screenshot(path="C:/tmp/04_library_tab.png", full_page=False)

        lib_text = page.inner_text("body")

        # Check library structure
        results["library_header"] = "Thư viện" in lib_text
        results["library_curated_banner"] = any(s in lib_text for s in ["tài nguyên đã chọn lọc", "✨", "chọn lọc"])
        results["library_12_pillars"] = "12 Trụ cột" in lib_text or "Trụ cột" in lib_text
        results["library_age_filter"] = all(s in lib_text for s in ["Mọi tuổi"])
        results["library_type_filter"] = any(s in lib_text for s in ["video", "article", "tool", "game"])
        results["library_no_bilingual"] = "Truyện song ngữ" not in lib_text

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)
        page.screenshot(path="C:/tmp/05_library_bottom.png", full_page=False)

        lib_bottom_text = page.inner_text("body")
        results["library_qa_card"] = any(s in lib_bottom_text for s in ["Hỏi & Đáp", "Chuyên gia", "Hỏi &"])

        # Console errors summary
        results["console_errors"] = console_errors[:10]

        browser.close()

    # Print results
    print("\n=== VERIFICATION RESULTS ===")
    for k, v in results.items():
        if k != "console_errors":
            status = "PASS" if v else "FAIL"
            print(f"  [{status}] {k}: {v}")

    print(f"\n  Console errors: {len(console_errors)}")
    for e in console_errors[:5]:
        print(f"    - [{e['type']}] {e['text'][:120]}")

    return results

if __name__ == "__main__":
    import os
    os.makedirs("C:/tmp", exist_ok=True)
    run()
