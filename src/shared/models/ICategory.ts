interface ICategory {
  id: number | null;
  name: string;
}

export const categoryDefaultValue: ICategory = {
  id: null,
  name: "",
};

export default ICategory;
