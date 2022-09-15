
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../../config/store";
import { AuthenticationState } from "../../reducers/authentication";
import UserRoleEnum from "../enums/role.enum";
import hasAnyAuthority from "./authorities";

interface IPrivateRoute extends RouteProps {
  children?: JSX.Element
  hasAnyAuthorities?: UserRoleEnum[];
}

const PrivateRoute = ({ children, hasAnyAuthorities = [] }: IPrivateRoute) => {
  const { user, isAuthenticated, sessionHasBeenFetched } = useAppSelector<AuthenticationState>(state => state.authentication);
  const location = useLocation();
  const isAuthorized = hasAnyAuthority(user?.roles!, hasAnyAuthorities!);

  if (!sessionHasBeenFetched) {
    return <div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    return (
      <div>
        <div >
          Non sei autorizzato ad accedere a questa pagina.
        </div>
      </div>
    )
  }

  if (children) {
    return children;
  }

  return <Outlet />
}

export default PrivateRoute