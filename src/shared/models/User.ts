interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export const userDefaultValue: User = {
  firstName: "",
  lastName: "",
  email: "",
};

export default User;
