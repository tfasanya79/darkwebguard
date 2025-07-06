from backend.app.services.scan_engine import scan_dark_web_for_brand

def test_scan_dark_web_for_brand():
    results = scan_dark_web_for_brand("acme-corp")
    assert len(results) > 0
