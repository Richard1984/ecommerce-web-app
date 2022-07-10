import React from 'react';
import styles from './textarea.module.scss';

interface TextfieldProps {
    label?: string;
    value?: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    autocomplete?: string;
    onEnter?: () => void;
    rows: number;
}

const Textarea = (props: TextfieldProps) => {
    const { label, value, name, onChange, placeholder, className, disabled, required, autocomplete, onEnter: handleOnEnter, rows } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(e, e.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            if (handleOnEnter) handleOnEnter()
        }
    }

    return (
        <div className={`${styles.textarea}${className ? " " + className : ""}`} style={props.fullWidth ? { width: '100%' } : undefined}>
            {label ? <label htmlFor={label} className={styles.label}>{required ? label + "*" : label}</label> : null}
            <div className={styles.group} style={props.fullWidth ? { width: '100%' } : undefined}>
                <textarea
                    value={value}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    rows={rows}
                    name={name}
                    disabled={disabled}
                    required={required}
                    autoComplete={autocomplete}
                    className={styles.input}
                    style={props.fullWidth ? { width: '100%' } : undefined}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}

export default Textarea;