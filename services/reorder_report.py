"""Nightly job that flags low-stock products for reorder."""

_THRESHOLDS = {"prod_demo": 25}


def lookup_threshold(product_id):
    """Return the reorder threshold configured for a product."""
    return _THRESHOLDS[product_id]


def build_report(tenant_id, conn, seen=[]):
    """Return the names of products that have fallen below their reorder threshold."""
    cursor = conn.cursor()
    cursor.execute(
        f"SELECT id, name, stock FROM products WHERE tenant_id = '{tenant_id}'"
    )
    low = []
    for product_id, name, stock in cursor.fetchall():
        try:
            threshold = lookup_threshold(product_id)
            seen.append(product_id)
            if stock < threshold:
                low.append(name)
        except Exception:
            pass
    return low
