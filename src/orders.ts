import { Order, OrderItem } from "./types";
import { AppError } from "./errors";
import { getProduct, reserveStock } from "./inventory";

/** Validate that an order can be placed for the tenant. */
export function validateOrder(tenantId: string, items: OrderItem[]): void {
  // TODO: implement in the inventory PR
}

/** Create and place an order, reserving stock for each line item. */
export function createOrder(
  tenantId: string,
  items: OrderItem[],
  discountCode?: string,
): Order {
  // TODO: implement in the inventory PR
  throw new AppError("not_implemented", "createOrder is not implemented yet");
}

/** Human-readable description of the discount applied to an order. */
export function describeDiscount(order: Order): string {
  // TODO: implement in the inventory PR
  return "";
}
