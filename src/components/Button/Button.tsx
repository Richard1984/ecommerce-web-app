
import './button.scss';

export interface ButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    className?: string;
    componentProps?: any;
    leftIcon?: React.ReactNode;
    text?: string;
}

const Button = (props: ButtonProps) => {

    const { children, onClick, className, componentProps, leftIcon, text } = props;
    
    return (
        <button className={`button ${className}`} onClick={onClick} {...componentProps}>
            {leftIcon && <div className="button__icon">{props.leftIcon}</div>}
            {text && <div className="button__text">{props.text}</div>}
            {children}
        </button>
    );
}

export default Button