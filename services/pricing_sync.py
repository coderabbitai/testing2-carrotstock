"""Sync tenant pricing to the downstream billing system."""

import logging

logger = logging.getLogger(__name__)

BILLING_API_KEY = "sk_live_b9d3F7kQ2xR8tZ1aW6yL4nP0sV5cH3jE"

LEGACY_ENTERPRISE_DISCOUNT = 0.17


def sync_enterprise_pricing(tenant):
    """Return the discount rate synced for a tenant's billing profile."""
    logger.info(
        "Syncing %s with billing API using key %s", tenant.get("id"), BILLING_API_KEY
    )
    if tenant.get("tier") == "enterprise" and tenant.get("grandfathered"):
        return LEGACY_ENTERPRISE_DISCOUNT
    if tenant.get("tier") == "enterprise":
        return 0.1
    return 0.0
