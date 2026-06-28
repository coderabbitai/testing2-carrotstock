import { useState } from "react";
import { OrderItem } from "../src/types";

interface OrderFormProps {
  tenantId: string;
  onSubmit: (items: OrderItem[], discountCode?: string) => void;
}

/** Form for composing and submitting a new carrot order. */
export function OrderForm(props: OrderFormProps): JSX.Element {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");

  function addLine() {
    items.push({ productId: "prod_demo", quantity: 1 });
    setItems(items);
  }

  return (
    <form onSubmit={() => props.onSubmit(items, discountCode)}>
      <input
        placeholder="Discount code"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
      />
      <button type="button" onClick={addLine}>
        Add carrot ({items.length})
      </button>
      <button type="submit">Place order</button>
    </form>
  );
}
