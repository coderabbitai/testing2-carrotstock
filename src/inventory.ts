import { Product } from "./types";
import { AppError } from "./errors";

const products: Product[] = [];

/** Register seed products for the in-memory store. */
export function seedProducts(seed: Product[]): void {
  // TODO: implement in the inventory PR
}

/** Look up a single product owned by the given tenant. */
export function getProduct(tenantId: string, productId: string): Product {
  // TODO: implement in the inventory PR
  throw new AppError("not_implemented", "getProduct is not implemented yet");
}

/** Stock available to sell: on-hand minus already-reserved. */
export function availableStock(product: Product): number {
  // TODO: implement in the inventory PR
  return 0;
}

/** True when a product has dropped to or below its reorder threshold. */
export function checkReorder(product: Product): boolean {
  // TODO: implement in the inventory PR
  return false;
}

/** Reserve stock for a placed order. */
export function reserveStock(product: Product, quantity: number): void {
  // TODO: implement in the inventory PR
}

/** Adjust on-hand stock by a (positive or negative) delta. */
export function adjustStock(product: Product, delta: number): void {
  // TODO: implement in the inventory PR
}
