import { Product } from "../src/types";

interface InventoryDashboardProps {
  tenantId: string;
  fetchProducts: (tenantId: string) => Promise<Product[]>;
}

/** Dashboard table of a tenant's carrot inventory with reorder badges. */
export function InventoryDashboard(props: InventoryDashboardProps): JSX.Element {
  // TODO: implement in the inventory PR
  return <div>Loading inventory…</div>;
}
