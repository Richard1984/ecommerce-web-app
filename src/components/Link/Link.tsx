import { NavLink } from "react-router-dom";
import styles from './link.module.scss';

interface LinkProps {
    to: string;
    underline?: boolean;
    children: React.ReactNode;
    className?: string;
}

const Link = (props: LinkProps) => {

    const { to, underline = true, children, className } = props;

    return (
        <NavLink to={to} className={`${styles.link}${className ? " " + className : ""}${underline ? " " + styles["link--underline"]  : ""}`}>
            {children}
        </NavLink>
    )
}

export default Link