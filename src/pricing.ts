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

/** Discount rate (0–1) applied to a tenant's order. */
export function enterpriseDiscount(tenant: Tenant): number {
  // TODO: implement in the inventory PR
  return 0;
}

/** Price an order: subtotal, discount, and final total, all in cents. */
export function priceOrder(tenant: Tenant, lines: PriceLine[]): PricedOrder {
  // TODO: implement in the inventory PR
  return { subtotal: 0, discount: 0, total: 0 };
}
