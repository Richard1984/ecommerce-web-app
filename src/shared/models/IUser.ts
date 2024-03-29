import UserRoleEnum from "../enums/role.enum";

interface IUser {
  id?: number | null;
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  roles?: UserRoleEnum[];
  country?: string;
}

export const userDefaultValue: IUser = {
  id: null,
  firstname: "",
  lastname: "",
  email: "",
  avatar: "",
  roles: [],
  country: "",
};

export default IUser;
