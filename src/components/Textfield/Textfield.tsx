import React from 'react';
import './textfield.scss';

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
    if (props.fullWidth){
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
        <div className={`textfield${className ? " " + className : ""}`} style={style}>
            {label ? <label htmlFor={label} className="textfield__label">{required ? label + "*" : label}</label> : null}
            <div className='textfield__group' style={props.fullWidth ? { width: '100%' } : undefined}>
                <input
                    type={type}
                    value={value}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    name={name}
                    disabled={disabled}
                    required={required}
                    autoComplete={autocomplete}
                    className="textfield__input"
                    style={props.fullWidth ? { width: '100%' } : undefined}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}

export default Textfield;