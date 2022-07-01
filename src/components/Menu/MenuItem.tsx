import styles from './menu-item.module.scss';

interface MenuItemProps {
    icon?: React.ReactNode;
    text?: string;
    onClick?: () => void;
}


const MenuItem = (props: MenuItemProps) => {

    const { icon, text, onClick: handleOnClick } = props;

    return (
        <div className={styles.item} onClick={handleOnClick}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {text && <div className={styles.text}><p>{text}</p></div>}
        </div>
    )
}

export default MenuItem