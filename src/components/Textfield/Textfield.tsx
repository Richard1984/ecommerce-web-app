import React from 'react';
import styles from './textfield.module.scss';

type TextfieldBaseProps = React.HTMLProps<HTMLInputElement> & {
    className?: string;
    fullWidth?: boolean;
    onEnter?: () => void;
    style?: React.CSSProperties;
}

type TextfieldProps = TextfieldBaseProps & ({
    value?: string;
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    type: "text" | "email" | "password";
} | {
    value?: number;
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
    type: "number";
    step?: string;
    min?: string;
})

const Textfield = (props: TextfieldProps) => {
    const { label, value, name, onValueChange, type, placeholder, className, disabled, required, autoComplete, fullWidth, onEnter: handleOnEnter, ...rest } = props;
    let style = props.style || {};
    if (fullWidth) {
        style = { ...style, width: '100%' };
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onValueChange) {
            if (type === 'number') {
                onValueChange(e, e.target.valueAsNumber);
            } else if (type === 'text' || type === 'email' || type === 'password') {
                onValueChange(e, e.target.value);
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (handleOnEnter) handleOnEnter()
        }
    }

    return (
        <div className={`${styles.textfield}${className ? " " + className : ""}`} style={style}>
            {label ? <label htmlFor={label} className={styles.label}>{required ? label + "*" : label}</label> : null}
            <input
                {...rest}
                type={type}
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                required={required}
                autoComplete={autoComplete}
                className={styles.input}
                style={props.fullWidth ? { width: '100%' } : undefined}
                onKeyDown={handleKeyDown}
                step={type === "number" ? props?.step : undefined}
                min={type === "number" ? props?.min : undefined}
            />
        </div>
    )
}

export default Textfield;