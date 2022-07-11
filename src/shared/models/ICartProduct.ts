interface ICartProduct {
    id: number | null;
    name: string;
    price: number;
    quantity: number;
  }
  
  export const productDefaultValue: ICartProduct = {
    id: null,
    name: "",
    price: 0,
    quantity: 0,
  };
  
  export default ICartProduct;
  