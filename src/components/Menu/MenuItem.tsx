import { NavLink } from 'react-router-dom';
import styles from './menu-item.module.scss';

interface MenuItemProps {
    icon?: React.ReactNode;
    text?: string;
    onClick?: () => void;
    to?: string;
}


const MenuItem = (props: MenuItemProps) => {

    const { icon, text, onClick: handleOnClick, to } = props;

    if (to) {
        return (
            <NavLink to={to} className={styles.item} onClick={handleOnClick}>
                {icon && <div className={styles.icon}>{icon}</div>}
                {text && <div className={styles.text}><p>{text}</p></div>}
            </NavLink>
        );
    }

    return (
        <div className={styles.item} onClick={handleOnClick}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {text && <div className={styles.text}><p>{text}</p></div>}
        </div>
    )
}

export default MenuItem