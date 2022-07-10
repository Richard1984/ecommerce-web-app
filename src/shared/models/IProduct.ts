interface IProduct {
  id: number | null;
  name: string;
  price: number;
  description: string;
  availability: number;
  available: boolean;
  avg_reviews: number;
  category_id: number | null;
  images: string[];
  created_at: string;
  updated_at: string;
}

export const productDefaultValue: IProduct = {
  id: null,
  name: "",
  price: 0,
  description: "",
  availability: 0,
  available: false,
  avg_reviews: 0,
  category_id: null,
  images: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default IProduct;
