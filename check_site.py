from playwright.sync_api import sync_playwright
import json, re

URL = "https://pany-kids-studio.vercel.app/"
OUT = "C:/Users/PanyBinh/Projects/pany-kids-studio"

with sync_playwright() as p:
    # --- DESKTOP ---
    br = p.chromium.launch(headless=True)
    ctx = br.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # Screenshot desktop initial
    page.screenshot(path=f"{OUT}/desktop-initial.png", full_page=False)

    # Check for hotspot dots (look for elements with "hotspot" or "dot" classes)
    hotspots = page.query_selector_all('[class*="hotspot"], [class*="dot-overlay"], [class*="glow"]')
    print(f"DESKTOP hotspot elements found: {len(hotspots)}")

    # Check greeting area
    greeting_els = page.query_selector_all('[class*="greeting"], [class*="hero"], [class*="banner"]')
    print(f"DESKTOP greeting/hero elements: {len(greeting_els)}")

    # Check TabNav visibility
    tabnav = page.query_selector('[class*="TabNav"], [class*="tab-nav"], nav[class*="tab"]')
    if tabnav:
        visible = tabnav.is_visible()
        print(f"DESKTOP TabNav visible: {visible}")
    else:
        print("DESKTOP TabNav: NOT FOUND in DOM")

    # Check sidebar
    sidebar = page.query_selector('[class*="sidebar"], [class*="Sidebar"]')
    if sidebar:
        visible = sidebar.is_visible()
        print(f"DESKTOP Sidebar visible: {visible}")
    else:
        print("DESKTOP Sidebar: NOT FOUND in DOM")

    # Count nav cards
    cards = page.query_selector_all('[class*="nav-card"], [class*="NavCard"], [class*="grid"] a, [class*="card"]')
    print(f"DESKTOP card-like elements: {len(cards)}")

    # Get page HTML snippet to look for key elements
    body_html = page.evaluate("document.body.innerHTML")

    # Search for key Vietnamese text
    checks = {
        "Thư viện": "Thư viện" in body_html,
        "Tiếng Anh": "Tiếng Anh" in body_html,
        "Lộ trình": "Lộ trình" in body_html,
        "Cây kỹ năng": "Cây kỹ năng" in body_html,
        "Học viên": "Học viên" in body_html,
        "Khám phá": "Khám phá" in body_html,
        "Hướng nghiệp": "Hướng nghiệp" in body_html,
        "Huy hiệu": "Huy hiệu" in body_html,
        "Portfolio": "Portfolio" in body_html,
        "Bảng xếp hạng": "Bảng xếp hạng" in body_html,
    }
    found = sum(1 for v in checks.values() if v)
    found_keys = [k for k,v in checks.items() if v]
    print(f"DESKTOP nav card labels found: {found}/10")
    for fk in found_keys:
        print(f"  FOUND: {fk}".encode('ascii','replace').decode())

    # Check for hotspot/dot patterns in HTML
    hotspot_patterns = ["hotspot", "dot-overlay", "glowing-dot", "tree-dot", "canopy-dot"]
    for pat in hotspot_patterns:
        count = body_html.count(pat)
        if count > 0:
            print(f"DESKTOP HTML contains '{pat}': {count} occurrences")

    # Click Thư viện card
    thu_vien = page.get_by_text("Thư viện", exact=False).first
    if thu_vien:
        thu_vien.click()
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUT}/desktop-after-click.png", full_page=False)
        # Check TabNav after click
        tabnav2 = page.query_selector('[class*="TabNav"], [class*="tab-nav"], nav[class*="tab"]')
        if tabnav2:
            visible2 = tabnav2.is_visible()
            print(f"DESKTOP TabNav visible AFTER click: {visible2}")
        else:
            print("DESKTOP TabNav after click: NOT FOUND")

    br.close()

    # --- MOBILE ---
    br2 = p.chromium.launch(headless=True)
    ctx2 = br2.new_context(viewport={"width": 375, "height": 800}, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15")
    page2 = ctx2.new_page()
    page2.goto(URL, wait_until="networkidle", timeout=30000)
    page2.wait_for_timeout(2000)
    page2.screenshot(path=f"{OUT}/mobile-initial.png", full_page=False)
    print("MOBILE screenshot saved")

    # Check mobile hotspots
    body_html2 = page2.evaluate("document.body.innerHTML")
    for pat in hotspot_patterns:
        count = body_html2.count(pat)
        if count > 0:
            print(f"MOBILE HTML contains '{pat}': {count} occurrences")

    # Check mobile TabNav
    tabnav_m = page2.query_selector('[class*="TabNav"], [class*="tab-nav"], nav[class*="tab"]')
    if tabnav_m:
        print(f"MOBILE TabNav visible: {tabnav_m.is_visible()}")
    else:
        print("MOBILE TabNav: NOT FOUND")

    # Check mobile sidebar
    sidebar_m = page2.query_selector('[class*="sidebar"], [class*="Sidebar"]')
    if sidebar_m:
        print(f"MOBILE Sidebar visible: {sidebar_m.is_visible()}")
    else:
        print("MOBILE Sidebar: NOT FOUND")

    br2.close()

print("ALL DONE")
