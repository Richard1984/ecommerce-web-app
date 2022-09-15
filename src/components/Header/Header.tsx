import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faList, faReceipt, faRightFromBracket, faShop, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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


const HeaderItem = ({ to, icon, primaryText, secondaryText, className, id }: { to: string, icon?: IconProp, primaryText: string, secondaryText: string, className?: string, id?: string }) => {
    return (
        <RouterLink id={id} to={to} className={`${styles.headerItem}${className ? " " + className : ""}`}>
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
    const dispatch = useAppDispatch();
    const [profileMenuAnchor, setProfileMenuAnchor] = useState<HTMLElement | null>(null);
    const { logoutSuccess } = useAppSelector(state => state.authentication);
    const profileMenuButton = createRef<HTMLDivElement>();

    const { user } = props;

    const handleLogout = async () => {
        dispatch(logout());
    };

    useEffect(() => {
        setProfileMenuAnchor(profileMenuButton.current)
    }, [profileMenuButton])

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
                                    <HeaderItem id="cart" to="/account/cart" icon={faShoppingCart} primaryText="Il tuo" secondaryText="Carrello" />
                                    <HeaderItem id="orders" to="/account/orders" className={styles.noMobile} icon={faReceipt} primaryText="I tuoi" secondaryText="Ordini" />
                                </>
                            ) : null
                        }
                        <div className={styles.separator} />
                        <div className={styles.profileMenu} ref={profileMenuButton}>
                            <div className={styles.avatar}>
                                <img src={user?.avatar || "https://via.placeholder.com/40"} alt="Profile" />
                            </div>
                            <p className={styles.userName}>{user?.firstname + " " + user?.lastname}</p>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                        </div>
                        <Menu anchor={profileMenuAnchor}>
                            <MenuItem text="Account" icon={<FontAwesomeIcon icon={faUser} />} to="/account" />
                            {!hasAnyAuthority(user?.roles || [], [UserRoleEnum.ADMIN]) ? <MenuItem text="Le mie liste" icon={<FontAwesomeIcon icon={faList} />} to="/account/lists" /> : null}
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