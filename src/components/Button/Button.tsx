
import { NavLink } from 'react-router-dom';
import styles from './button.module.scss';

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    componentProps?: any;
    leftIcon?: React.ReactNode;
    text?: string;
    type?: "reset" | "submit" | "button";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    fullWidth?: boolean;
    to?: string;
}

const Button = (props: ButtonProps) => {

    const { children, onClick, className, componentProps, leftIcon, text, type, size, disabled, fullWidth, to } = props;

    if (to) {
        return (
            <NavLink to={to} disabled={disabled} className={`${styles.button}${className ? " " + className : ""}${" " + styles[`button--${size || "medium"}`]}${fullWidth ? " " + styles["button--full-width"] : ""}`} {...componentProps} type={type} {...(type === "button" || type === undefined ? { onClick } : {})}>
                {leftIcon && <div className={styles.icon} style={text || children ? { marginRight: "8px" } : { padding: "0 5px" }}>{props.leftIcon}</div>}
                {text && <div className={styles.text}>{props.text}</div>}
                {children}
            </NavLink>
        );
    }

    return (
        <button disabled={disabled} className={`${styles.button}${className ? " " + className : ""}${" " + styles[`button--${size || "medium"}`]}${fullWidth ? " " + styles["button--full-width"] : ""}`} {...componentProps} type={type} {...(type === "button" || type === undefined ? { onClick } : {})}>
            {leftIcon && <div className={styles.icon} style={text || children ? { marginRight: "8px" } : { padding: "0 5px" }}>{props.leftIcon}</div>}
            {text && <div className={styles.text}>{props.text}</div>}
            {children}
        </button>
    );
};

export default Button;