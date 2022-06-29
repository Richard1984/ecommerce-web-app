interface IUser {
  id: number | null;
  firstname: string;
  lastname: string;
  email: string;
  img: string;
}

export const userDefaultValue: IUser = {
  id: null,
  firstname: "",
  lastname: "",
  email: "",
  img: "",
};

export default IUser;
