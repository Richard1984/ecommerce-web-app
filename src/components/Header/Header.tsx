import { faAngleDown, faGear, faReceipt, faRightFromBracket, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { logout } from "../../reducers/authentication";
import IUser from "../../shared/models/IUser";
import Link from "../Link/Link";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import SearchBar from "../SearchBar/SearchBar";
import './header.scss';

interface HeaderProps {
    user?: IUser | null;
}

const Header = (props: HeaderProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [profileMenuAnchor, setProfileMenuAnchor] = useState<HTMLElement | null>(null);
    const { entities: categories } = useAppSelector(state => state.categories);
    const { logoutSuccess } = useAppSelector(state => state.authentication);

    const { user } = props;

    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setProfileMenuAnchor(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setProfileMenuAnchor(null);
    };
    
    const handleLogout = async () => {
        dispatch(logout());
        handleCloseProfileMenu();
    };

    return (
        <header className="header">
            <div className="left">
                <Link to="/" underline={false}>
                    <h2>Amnazom</h2>
                </Link>
                <SearchBar fullWidth className="search-bar" />
            </div>

            <div className="right">

                <div className="menu">
                    {props.user ? (
                        <>
                            <div className="menu-item item-menu">
                                <RouterLink to="/account/cart">
                                    <div className="item-menu-icon">
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </div>
                                    <div className="text">
                                        <p className="item-menu-primary">Il tuo</p>
                                        <p className="item-menu-secondary">Carrello</p>
                                    </div>
                                </RouterLink>
                            </div>

                            <div className="menu-item item-menu">
                                <RouterLink to="/account/orders">
                                    <div className="item-menu-icon">
                                        <FontAwesomeIcon icon={faReceipt} />
                                    </div>
                                    <div className="text">
                                        <p className="item-menu-primary">I tuoi</p>
                                        <p className="item-menu-secondary">Ordini</p>
                                    </div>
                                </RouterLink>
                            </div>

                            <div className="separator" />
                            <div className="menu-item profile-menu" onClick={handleOpenProfileMenu}>
                                <div className="profile">
                                    <img src={user?.avatar || "https://via.placeholder.com/40"} alt="Profile" />
                                </div>
                                <p>{user?.firstname + " " + user?.lastname}</p>
                                {/* <a href="/logout">Logout</a> */}
                                <div className="menu-icon">
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </div>
                            </div>
                            <Menu anchor={profileMenuAnchor} onClose={handleCloseProfileMenu}>
                                <MenuItem text="Account" icon={<FontAwesomeIcon icon={faUser} />} onClick={handleCloseProfileMenu} to="/account" />
                                <MenuItem text="Impostazioni" icon={<FontAwesomeIcon icon={faGear} />} onClick={handleCloseProfileMenu} />
                                <MenuItem text="Logout" icon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={handleLogout} />
                            </Menu>
                        </>
                    ) : (
                        <div className="menu-item login-menu">
                            <RouterLink to="/login">
                                <p className="login-primary">Sei già registrato?</p>
                                <p className="login-secondary">Accedi</p>
                            </RouterLink>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );

};

export default Header;