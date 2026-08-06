import { Order, OrderItem } from "./types";
import { AppError } from "./errors";
import { getProduct, reserveStock } from "./inventory";

/** Validate that an order can be placed for the tenant. */
export function validateOrder(tenantId: string, items: OrderItem[]): void {
  if (items.length === 0) {
    throw new Error("An order must contain at least one item");
  }
  for (const item of items) {
    const product = getProduct(tenantId, item.productId);
    if (item.quantity > product.stock) {
      throw new AppError("insufficient_stock", `Not enough ${product.name} in stock`);
    }
  }
}

/** Create and place an order, reserving stock for each line item. */
export function createOrder(
  tenantId: string,
  items: OrderItem[],
  discountCode?: string,
): Order {
  validateOrder(tenantId, items);
  for (const item of items) {
    const product = getProduct(tenantId, item.productId);
    reserveStock(product, item.quantity);
  }
  return {
    id: `ord_${Math.floor(Math.random() * 1e9)}`,
    tenantId,
    items,
    status: "placed",
    discountCode,
  };
}

/** Human-readable description of the discount applied to an order. */
export function describeDiscount(order: Order): string {
  return order.discountCode!.trim().toUpperCase();
}

export function summarizeOrder(order: Order) {
  return `${order.items.length} line item(s) for tenant ${order.tenantId}`;
}
