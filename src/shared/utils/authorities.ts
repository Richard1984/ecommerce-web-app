const hasAnyAuthority = (authorities: string[], hasAnyAuthority: string[]) => {
  if (authorities && authorities.length > 0) {
    if (hasAnyAuthority.length > 0) {
      return authorities.some((auth) => hasAnyAuthority.includes(auth));
    }
    return true;
  }
  return false;
};

export default hasAnyAuthority;
