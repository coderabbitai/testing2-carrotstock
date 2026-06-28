import { OrderItem } from "../src/types";

interface OrderFormProps {
  tenantId: string;
  onSubmit: (items: OrderItem[], discountCode?: string) => void;
}

/** Form for composing and submitting a new carrot order. */
export function OrderForm(props: OrderFormProps): JSX.Element {
  // TODO: implement in the inventory PR
  return <form />;
}
