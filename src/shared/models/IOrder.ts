import ICartItem from "./ICartItem";

interface IOrder {
    id: number | null;
    items: ICartItem[];
    shipping_status: "delivered" | "shipped" | "pending" | "cancelled" | "";
}

export const orderItemDefaultValue: IOrder = {
    id: null,
    items: [],
    shipping_status: "pending",
};

export default IOrder;
