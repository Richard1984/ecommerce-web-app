interface IUser {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
}

export const userDefaultValue: IUser = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  img: "",
};

export default IUser;
