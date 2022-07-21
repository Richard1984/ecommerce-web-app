import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faList, faReceipt, faRightFromBracket, faShop, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { logout } from "../../reducers/authentication";
import UserRoleEnum from "../../shared/enums/role.enum";
import IUser from "../../shared/models/IUser";
import hasAnyAuthority from "../../shared/utils/authorities";
import Link from "../Link/Link";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from './header.module.scss';

interface HeaderProps {
    user?: IUser | null;
}


const HeaderItem = ({ to, icon, primaryText, secondaryText, className }: { to: string, icon?: IconProp, primaryText: string, secondaryText: string, className?: string }) => {
    return (
        <RouterLink to={to} className={`${styles.headerItem}${className ? " " + className : ""}`}>
            {icon ?
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                : null}
            <div className={styles.text}>
                <p className={styles.primary}>{primaryText}</p>
                <p className={styles.secondary}>{secondaryText}</p>
            </div>
        </RouterLink>
    );
}


const Header = (props: HeaderProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [profileMenuAnchor, setProfileMenuAnchor] = useState<HTMLElement | null>(null);
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
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link className={styles.logo} to="/" underline={false}>Amnazom</Link>
            </div>
            <div className={styles.searchBarContainer}>
                <SearchBar fullWidth />
            </div>
            <div className={styles.menu}>
                {props.user ? (
                    <>
                        {
                            hasAnyAuthority(user?.roles!, [UserRoleEnum.ADMIN]) ? (
                                <HeaderItem to="/admin/shop" icon={faShop} primaryText="Il mio" secondaryText="Negozio" />
                            ) : null
                        }

                        {
                            !hasAnyAuthority(user?.roles!, [UserRoleEnum.ADMIN]) ? (
                                <>
                                    <HeaderItem to="/account/cart" icon={faShoppingCart} primaryText="Il tuo" secondaryText="Carrello" />
                                    <HeaderItem to="/account/orders" className={styles.noMobile} icon={faReceipt} primaryText="I tuoi" secondaryText="Ordini" />
                                </>
                            ) : null
                        }
                        <div className={styles.separator} />
                        <div className={styles.profileMenu} onClick={handleOpenProfileMenu}>
                            <div className={styles.avatar}>
                                <img src={user?.avatar || "https://via.placeholder.com/40"} alt="Profile" />
                            </div>
                            <p className={styles.userName}>{user?.firstname + " " + user?.lastname}</p>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                        </div>
                        <Menu anchor={profileMenuAnchor} onClose={handleCloseProfileMenu}>
                            <MenuItem text="Account" icon={<FontAwesomeIcon icon={faUser} />} onClick={handleCloseProfileMenu} to="/account" />
                            <MenuItem text="Le mie liste" icon={<FontAwesomeIcon icon={faList} />} onClick={handleCloseProfileMenu} to="/account/lists" />
                            <MenuItem text="Logout" icon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={handleLogout} />
                        </Menu>
                    </>
                ) : (
                    <HeaderItem to="/login" primaryText="Sei già registrato?" secondaryText="Accedi" />
                )}
            </div>
        </header>
    );

};

export default Header;