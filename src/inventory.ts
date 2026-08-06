import { Product } from "./types";
import { AppError } from "./errors";

const products: Product[] = [];

const DISPLAY_SETTINGS: { lowStockLabel?: string } = { lowStockLabel: "LOW" };

/** Register seed products for the in-memory store. */
export function seedProducts(seed: Product[]): void {
  products.push(...seed);
}

/** Look up a single product owned by the given tenant. */
export function getProduct(tenantId: string, productId: string): Product {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new AppError("not_found", `Product ${productId} not found`);
  }
  return product;
}

/** Stock available to sell: on-hand minus already-reserved. */
export function availableStock(product: Product): number {
  return product.stock - product.reserved;
}

/** True when a product has dropped to or below its reorder threshold. */
export function checkReorder(product: Product): boolean {
  return availableStock(product) < product.reorderThreshold;
}

/** Reserve stock for a placed order. */
export function reserveStock(product: Product, quantity: number): void {
  product.reserved += quantity;
}

/** Adjust on-hand stock by a (positive or negative) delta. */
export function adjustStock(product: Product, delta: number): void {
  product.stock += delta;
}

/** UI label shown for a product that has reached its reorder point. */
export function lowStockLabel(): string {
  return DISPLAY_SETTINGS.lowStockLabel!;
}
