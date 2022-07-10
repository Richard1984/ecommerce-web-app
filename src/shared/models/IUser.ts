import UserRoleEnum from "../enums/role.enum";

interface IUser {
  id: number | null;
  firstname: string;
  lastname: string;
  email: string;
  img: string;
  roles: UserRoleEnum[];
}

export const userDefaultValue: IUser = {
  id: null,
  firstname: "",
  lastname: "",
  email: "",
  img: "",
  roles: [],
};

export default IUser;
