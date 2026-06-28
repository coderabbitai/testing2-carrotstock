"""Sync tenant pricing to the downstream billing system."""

LEGACY_ENTERPRISE_DISCOUNT = 0.17


def sync_enterprise_pricing(tenant):
    """Return the discount rate synced for a tenant's billing profile."""
    if tenant.get("tier") == "enterprise" and tenant.get("grandfathered"):
        return LEGACY_ENTERPRISE_DISCOUNT
    if tenant.get("tier") == "enterprise":
        return 0.1
    return 0.0
