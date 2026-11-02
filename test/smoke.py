"""
smoke.py: end-to-end functional checks for the NeighbourlySpace site.

Run from the project root:   python3 test/smoke.py
Needs:  pip install playwright && playwright install chromium

It serves the site on a local port, drives Chromium through every Part 3
feature (forms, search, filter, sort, modal, lightbox, map, tabs, mobile
menu) and exits with a non-zero status if any check fails.
"""
import datetime, functools, http.server, os, threading, urllib.parse
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8765
BASE = 'http://localhost:%d/' % PORT
failures = []


def check(condition, label):
    print(('PASS  ' if condition else 'FAIL  ') + label)
    if not condition:
        failures.append(label)


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    handler = functools.partial(Quiet, directory=ROOT)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def future(days):
    return (datetime.date.today() + datetime.timedelta(days=days)).isoformat()


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_context(viewport={'width': 1440, 'height': 900}).new_page()
        js_errors = []
        page.on('pageerror', lambda e: js_errors.append(str(e)))

        # ---- Enquiry form ------------------------------------------------
        page.goto(BASE + 'enquiry.html')
        page.click('#enquiry-form button[type=submit]')
        check(page.locator('#enquiry-form .has-error').count() == 6, 'enquiry: empty submit flags all 6 required fields')
        page.fill('#email', 'bad')
        page.fill('#phone', '123')
        page.fill('#message', 'short')
        page.fill('#preferred-date', '2020-01-01')
        page.click('#enquiry-form button[type=submit]')
        check('missing something' in page.inner_text('#email-error'), 'enquiry: bad email message')
        check('South African' in page.inner_text('#phone-error'), 'enquiry: bad phone message')
        check('future' in page.inner_text('#preferred-date-error'), 'enquiry: past date rejected')
        page.fill('#preferred-date', future(200))
        page.click('#enquiry-form button[type=submit]')
        check('90 days' in page.inner_text('#preferred-date-error'), 'enquiry: date beyond 90 days rejected')
        page.fill('#fullname', 'Lehlogonolo Matseke')
        page.fill('#email', 'test@example.com')
        page.fill('#phone', '082 123 4567')
        page.select_option('#service', 'plumbing')
        page.select_option('#urgency', 'emergency')
        page.fill('#preferred-date', future(3))
        page.fill('#message', 'My geyser is leaking in the ceiling in Meyersdal, need help.')
        page.click('#enquiry-form button[type=submit]')
        panel = page.locator('#enquiry-response')
        check(panel.is_visible(), 'enquiry: response panel shown after valid submit')
        text = panel.inner_text()
        check('R610' in text and 'R2430' in text, 'enquiry: emergency plumbing cost is 1.35x the R450-R1800 band')
        check('NS-PLU-' in text, 'enquiry: reference number generated')
        page.click('#enquiry-reset')
        check(page.locator('#enquiry-form').is_visible(), 'enquiry: "send another" returns to the form')
        page.goto(BASE + 'enquiry.html?service=pool')
        check(page.input_value('#service') == 'pool', 'enquiry: ?service=pool pre-selects the service')

        # ---- Contact form + map -------------------------------------------
        page.goto(BASE + 'contact-us.html')
        page.wait_for_timeout(600)
        page.click('#contact-form button[type=submit]')
        check(page.locator('#contact-form .has-error').count() >= 3, 'contact: empty submit flags required fields')
        page.fill('#contact-name', 'Lehlogonolo Matseke')
        page.fill('#contact-email', 'test@example.com')
        page.fill('#contact-phone', 'abc')
        page.click('#contact-form button[type=submit]')
        check('South African' in page.inner_text('#contact-phone-error'), 'contact: optional phone still validated when filled')
        page.fill('#contact-phone', '0821234567')
        page.select_option('#contact-type', 'general')
        page.fill('#contact-message', 'Do you service the Randhart estates please?')
        page.click('#contact-form button[type=submit]')
        check(page.locator('#contact-response').is_visible(), 'contact: email preview shown after valid submit')
        href = urllib.parse.unquote(page.get_attribute('#contact-send', 'href'))
        check(href.startswith('mailto:neighbourlyspace@gmail.com?subject='), 'contact: mailto addressed to the business')
        check('Randhart' in href, 'contact: message body compiled into the email')
        page.click('#contact-edit')
        check(page.locator('#contact-form').is_visible(), 'contact: edit returns to the form')
        check(page.locator('.leaflet-marker-icon').count() == 6, 'map: 6 suburb markers')
        page.locator('#service-area-list .area-chip').nth(3).click()
        page.wait_for_timeout(1200)
        check('New Redruth' in page.inner_text('.leaflet-popup-content'), 'map: suburb chip opens that suburb popup')

        # ---- Services: search, filter, sort, modal, lightbox ----------------
        page.goto(BASE + 'services.html')
        cards = lambda: page.locator('#services-grid .service-card').count()
        check(cards() == 8, 'services: 8 categories rendered')
        page.fill('#service-search', 'gate motor')
        page.wait_for_timeout(400)
        check(cards() == 1, 'services: search "gate motor" finds Security')
        page.fill('#service-search', 'zzzz')
        page.wait_for_timeout(400)
        check(page.locator('#service-empty').is_visible(), 'services: empty state shown')
        page.fill('#service-search', '')
        page.wait_for_timeout(400)
        page.click('[data-filter=outdoor]')
        check(cards() == 3, 'services: Outdoors filter gives 3')
        page.click('[data-filter=all]')
        page.select_option('#service-sort', 'name')
        check(page.inner_text('#services-grid .service-card h3') == 'Cleaning', 'services: A-Z sort puts Cleaning first')
        page.click('[data-details=plumbing]')
        page.wait_for_timeout(300)
        check(page.locator('[role=dialog]:visible').count() == 1, 'services: details modal opens')
        page.keyboard.press('Escape')
        page.wait_for_timeout(300)
        check(page.locator('[role=dialog]:visible').count() == 0, 'services: modal closes on Escape')
        page.locator('figure button').first.click()
        page.wait_for_timeout(400)
        check('1 of 5' in page.inner_text('body'), 'gallery: lightbox opens at 1 of 5')
        page.keyboard.press('ArrowRight')
        page.wait_for_timeout(300)
        check('2 of 5' in page.inner_text('body'), 'gallery: arrow key advances to 2 of 5')
        page.keyboard.press('Escape')

        # ---- Home: tabs, load more, accordion ------------------------------
        page.goto(BASE + 'index.html')
        feed = lambda: page.locator('#blog-feed .blog-card').count()
        check(feed() == 3, 'home: feed starts with 3 articles')
        page.click('#blog-more')
        check(feed() == 6, 'home: load more reveals the rest')
        page.click('[data-category="Community"]')
        check(feed() == 2, 'home: Community tab filters to 2')
        check(page.locator('details').count() >= 3, 'home: FAQ accordion present')

        # ---- Mobile menu ---------------------------------------------------
        mobile = browser.new_context(viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True).new_page()
        mobile.goto(BASE + 'index.html')
        mobile.click('.nav-toggle-label')
        mobile.wait_for_timeout(500)      # the menu animates open
        check(mobile.locator('.site-nav').is_visible(), 'mobile: hamburger opens the menu')

        check(not js_errors, 'no JavaScript errors on any page visited %s' % js_errors)
        browser.close()


if __name__ == '__main__':
    server = serve()
    try:
        run()
    finally:
        server.shutdown()
    print('\n%s' % ('ALL CHECKS PASSED' if not failures else '%d CHECK(S) FAILED' % len(failures)))
    raise SystemExit(1 if failures else 0)
