import IProduct, { productDefaultValue } from "./IProduct";

interface ICartItem {
  product: IProduct;
  quantity: number;
}

export const cartItemDefaultValue: ICartItem = {
  product: { ...productDefaultValue },
  quantity: 1
};

export default ICartItem;
