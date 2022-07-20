import IProduct from "./IProduct";

interface IShoppingList {
  id: number | null;
  name: string;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  products?: IProduct[];
}

export const shoppingListDefaultValue: IShoppingList = {
  id: null,
  name: "",
  user_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default IShoppingList;
