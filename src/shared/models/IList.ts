import IProduct from "./IProduct";

interface IList {
  id: number | null;
  name: string;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  products?: IProduct[];
}

export const listDefaultValue: IList = {
  id: null,
  name: "",
  user_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default IList;
