import './textfield.scss';

interface TextfieldProps {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
}

const Textfield = (props: TextfieldProps) => {
    const { label, value, onChange, type, placeholder, className, disabled, required } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e.target.value);
    }

    return (
        <div className={`textfield${className ? " " + className : ""}`}>
            <label htmlFor={label} className="textfield__label">{required ? label + "*" : label}</label>
            <input
                type={type}
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className="textfield__input"
                style={props.fullWidth ? { width: '100%' } : undefined}
            />
        </div>
    )
}

export default Textfield;