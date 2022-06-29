interface IProduct {
  id: number | null;
  name: string;
  price: number;
}

export const productDefaultValue: IProduct = {
  id: null,
  name: "",
  price: 0,
};

export default IProduct;
