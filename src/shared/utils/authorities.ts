import UserRoleEnum from "../enums/role.enum";

const hasAnyAuthority = (
  authorities: UserRoleEnum[],
  hasAnyAuthority: UserRoleEnum[]
) => {
  if (hasAnyAuthority?.length === 0) {
    return true;
  }

  if (authorities && authorities.length > 0) {
    return authorities.some((auth) => hasAnyAuthority.includes(auth));
  }
  return false;
};

export default hasAnyAuthority;
