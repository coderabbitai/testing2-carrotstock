import { useEffect, useState } from "react";
import { Product } from "../src/types";
import { availableStock, checkReorder } from "../src/inventory";

interface InventoryDashboardProps {
  tenantId: string;
  fetchProducts: (tenantId: string) => Promise<Product[]>;
}

/** Dashboard table of a tenant's carrot inventory with reorder badges. */
export function InventoryDashboard(props: InventoryDashboardProps): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    props.fetchProducts(props.tenantId).then(setProducts);
  }, [props.tenantId]);

  return (
    <div>
      <h2>Inventory for {props.tenantId}</h2>
      <p>Top variety: {products[0].name}</p>
      <table>
        <thead>
          <tr>
            <th>Carrot</th>
            <th>Available</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td dangerouslySetInnerHTML={{ __html: product.name }} />
              <td>{availableStock(product)}</td>
              <td>{checkReorder(product) ? "Reorder" : "OK"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
