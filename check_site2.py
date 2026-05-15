import sys, os
os.environ["PYTHONIOENCODING"] = "utf-8"
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import json, re

URL = "https://pany-kids-studio.vercel.app/"
OUT = "C:/Users/PanyBinh/Projects/pany-kids-studio"

def safe_print(msg):
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode('ascii','replace').decode())

with sync_playwright() as p:
    # --- DESKTOP ---
    br = p.chromium.launch(headless=True)
    ctx = br.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # Desktop initial screenshot
    page.screenshot(path=f"{OUT}/desktop-initial.png", full_page=False)
    safe_print("DESKTOP: Initial screenshot saved")

    body_html = page.evaluate("document.body.innerHTML")

    # 1. Check hotspot dots
    hotspot_patterns = ["hotspot", "dot-overlay", "glowing", "tree-dot"]
    hotspot_found = 0
    for pat in hotspot_patterns:
        c = body_html.count(pat)
        if c > 0:
            safe_print(f"DESKTOP WARNING: '{pat}' found {c}x in HTML")
            hotspot_found += c
    if hotspot_found == 0:
        safe_print("CHECK 1 PASS: No hotspot dot patterns in HTML")

    # 2. Check greeting compact
    # Look for hero/large-card classes vs banner/compact classes
    hero_patterns = ["hero-card", "hero-section", "large-hero"]
    compact_patterns = ["greeting-banner", "compact-greeting", "inline-greeting", "greeting-bar"]
    hero_count = sum(body_html.count(p) for p in hero_patterns)
    compact_count = sum(body_html.count(p) for p in compact_patterns)
    safe_print(f"DESKTOP: hero class patterns: {hero_count}, compact class patterns: {compact_count}")

    # 3. Check TabNav hidden on initial
    tabnav = page.query_selector('[class*="tab-nav"], [class*="TabNav"], [role="tablist"]')
    if tabnav:
        is_vis = tabnav.is_visible()
        safe_print(f"CHECK 3: TabNav visible on initial load = {is_vis} (expect False)")
    else:
        safe_print("CHECK 3: TabNav element not found in DOM on initial load")

    # 4. Sidebar closed state
    # Check sidebar width or hidden state
    sidebar_els = page.query_selector_all('[class*="sidebar"], [class*="Sidebar"]')
    safe_print(f"DESKTOP: Found {len(sidebar_els)} sidebar elements")
    for i, s in enumerate(sidebar_els):
        bb = s.bounding_box()
        cls = s.get_attribute("class") or ""
        safe_print(f"  Sidebar[{i}] class='{cls[:60]}' bbox={bb}")

    # 5. Check 10 nav cards visible
    nav_labels = ["Thư viện", "Tiếng Anh", "Lộ trình", "Cây kỹ năng",
                  "Học viên", "Khám phá", "Hướng nghiệp",
                  "Huy hiệu", "Portfolio", "Bảng xếp hạng"]
    found_labels = [lbl for lbl in nav_labels if lbl in body_html]
    safe_print(f"CHECK 5: Nav card labels in HTML: {len(found_labels)}/10")

    # Check visible cards
    visible_cards = []
    for lbl in nav_labels:
        els = page.get_by_text(lbl, exact=True).all()
        for el in els:
            if el.is_visible():
                visible_cards.append(lbl)
                break
    safe_print(f"CHECK 5: Visible nav cards: {len(visible_cards)}/10")

    # 6. Click a visible card
    # Try clicking by finding visible link/button with nav card text
    clicked = False
    for lbl in nav_labels[:3]:
        els = page.get_by_text(lbl, exact=True).all()
        for el in els:
            try:
                if el.is_visible():
                    el.click(timeout=5000)
                    page.wait_for_timeout(1500)
                    safe_print(f"CHECK 6: Clicked '{lbl.encode('ascii','replace').decode()}'")
                    clicked = True
                    break
            except Exception as e:
                pass
        if clicked:
            break

    if not clicked:
        # Try clicking first clickable card element
        try:
            card = page.locator('[class*="card"]').first
            card.click(timeout=5000)
            page.wait_for_timeout(1500)
            safe_print("CHECK 6: Clicked first card element")
            clicked = True
        except:
            safe_print("CHECK 6: Could not click any card")

    # Screenshot after click
    page.screenshot(path=f"{OUT}/desktop-after-click.png", full_page=False)

    # Check TabNav after click
    tabnav2 = page.query_selector('[class*="tab-nav"], [class*="TabNav"], [role="tablist"]')
    if tabnav2:
        is_vis2 = tabnav2.is_visible()
        safe_print(f"CHECK 6: TabNav visible AFTER click = {is_vis2} (expect True)")
    else:
        safe_print("CHECK 6: TabNav not found after click")

    br.close()

    # --- MOBILE ---
    br2 = p.chromium.launch(headless=True)
    ctx2 = br2.new_context(
        viewport={"width": 375, "height": 800},
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
    )
    page2 = ctx2.new_page()
    page2.goto(URL, wait_until="networkidle", timeout=30000)
    page2.wait_for_timeout(2000)
    page2.screenshot(path=f"{OUT}/mobile-initial.png", full_page=False)
    safe_print("MOBILE: Screenshot saved")

    body_html2 = page2.evaluate("document.body.innerHTML")

    # Mobile hotspot check
    hotspot_m = 0
    for pat in hotspot_patterns:
        c = body_html2.count(pat)
        if c > 0:
            safe_print(f"MOBILE WARNING: '{pat}' found {c}x")
            hotspot_m += c
    if hotspot_m == 0:
        safe_print("MOBILE CHECK 1 PASS: No hotspot patterns")

    # Mobile TabNav
    tabnav_m = page2.query_selector('[class*="tab-nav"], [class*="TabNav"], [role="tablist"]')
    if tabnav_m:
        safe_print(f"MOBILE TabNav visible: {tabnav_m.is_visible()} (expect False)")
    else:
        safe_print("MOBILE TabNav: not found on initial load")

    # Mobile sidebar
    sidebar_m = page2.query_selector_all('[class*="sidebar"], [class*="Sidebar"]')
    safe_print(f"MOBILE: {len(sidebar_m)} sidebar elements")
    for i, s in enumerate(sidebar_m):
        bb = s.bounding_box()
        cls = s.get_attribute("class") or ""
        safe_print(f"  Sidebar[{i}] class='{cls[:60]}' bbox={bb}")

    # Mobile visible cards
    visible_cards_m = []
    for lbl in nav_labels:
        els = page2.get_by_text(lbl, exact=True).all()
        for el in els:
            if el.is_visible():
                visible_cards_m.append(lbl)
                break
    safe_print(f"MOBILE visible cards: {len(visible_cards_m)}/10")

    br2.close()

safe_print("ALL DONE")
