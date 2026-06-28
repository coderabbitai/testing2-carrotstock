/**
 * Monetary amounts are integer cents to avoid floating-point rounding drift.
 * For example, $4.50 is represented as 450.
 */
export type Money = number;

export type TenantTier = "free" | "pro" | "enterprise";

export interface Tenant {
  id: string;
  name: string;
  tier: TenantTier;
  /** Pre-migration enterprise accounts retain grandfathered billing. */
  grandfathered?: boolean;
}

export interface Product {
  id: string;
  tenantId: string;
  /** Carrot variety, e.g. "Nantes" or "Imperator". */
  name: string;
  sku: string;
  unitPrice: Money;
  stock: number;
  reserved: number;
  reorderThreshold: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = "draft" | "placed" | "fulfilled" | "cancelled";

export interface Order {
  id: string;
  tenantId: string;
  items: OrderItem[];
  status: OrderStatus;
  discountCode?: string;
}
