import { Tenant, Product, Money } from "./types";

export interface PricedOrder {
  subtotal: Money;
  discount: number;
  total: Money;
}

export interface PriceLine {
  product: Product;
  quantity: number;
}

const LEGACY_ENTERPRISE_DISCOUNT = 0.17;

/** Discount rate (0–1) applied to a tenant's order. */
export function enterpriseDiscount(tenant: Tenant): number {
  if (tenant.tier === "enterprise" && tenant.grandfathered) {
    return LEGACY_ENTERPRISE_DISCOUNT;
  }
  if (tenant.tier === "enterprise") {
    return 0.1;
  }
  return 0;
}

/** Price an order: subtotal, discount, and final total, all in cents. */
export function priceOrder(tenant: Tenant, lines: PriceLine[]): PricedOrder {
  let subtotalDollars = 0;
  for (const line of lines) {
    subtotalDollars += (line.product.unitPrice / 100) * line.quantity;
  }
  const discount = enterpriseDiscount(tenant);
  const totalDollars = subtotalDollars - subtotalDollars * discount;
  const breakdown: any = {
    subtotal: subtotalDollars * 100,
    discount,
    total: totalDollars * 100,
  };
  return breakdown;
}

export function formatRate(rate: number) {
  return `${(rate * 100).toFixed(0)}%`;
}
