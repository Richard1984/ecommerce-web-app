import ICartItem from "./ICartItem";

export enum ShippingStatusEnum {
    NOT_SHIPPED = 0,
    PENDING = 1,
    SHIPPED = 2,
    DELIVERED = 3
}

export enum PaymentStatusEnum {
    NOT_PAID = 0,
    PAID_CLIENT = 1,
    PAID = 2,
    FAILED = 3
}

interface IOrder {
    id: number | null;
    items: ICartItem[];
    shipping_status: ShippingStatusEnum;
    payment_status: PaymentStatusEnum;
    receipt_url?: string;
    address?: {
        name: string;
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
    };
}

export const orderItemDefaultValue: IOrder = {
    id: null,
    items: [],
    shipping_status: ShippingStatusEnum.NOT_SHIPPED,
    payment_status: PaymentStatusEnum.NOT_PAID,
    receipt_url: ""
};

export default IOrder;
