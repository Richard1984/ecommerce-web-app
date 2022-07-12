import React from 'react';
import styles from './textfield.module.scss';

interface TextfieldProps {
    label?: string;
    value?: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    type?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    autocomplete?: string;
    onEnter?: () => void;
    style?: React.CSSProperties;
}

const Textfield = (props: TextfieldProps) => {
    const { label, value, name, onChange, type, placeholder, className, disabled, required, autocomplete, onEnter: handleOnEnter } = props;
    let style = props.style || {};
    if (props.fullWidth) {
        style = { ...style, width: '100%' };
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e, e.target.value);
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
                type={type}
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                required={required}
                autoComplete={autocomplete}
                className={styles.input}
                style={props.fullWidth ? { width: '100%' } : undefined}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default Textfield;