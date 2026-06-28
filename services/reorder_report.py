"""Nightly job that flags low-stock products for reorder."""


def lookup_threshold(product_id):
    """Return the reorder threshold configured for a product."""
    raise NotImplementedError("lookup_threshold is implemented in the inventory PR")


def build_report(tenant_id, conn):
    """Return the names of products that have fallen below their reorder threshold."""
    raise NotImplementedError("build_report is implemented in the inventory PR")
