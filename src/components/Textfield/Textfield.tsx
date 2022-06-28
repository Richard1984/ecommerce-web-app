import './textfield.scss';

interface TextfieldProps {
    label: string;
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
}

const Textfield = (props: TextfieldProps) => {
    const { label, value, name, onChange, type, placeholder, className, disabled, required, autocomplete } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e, e.target.value);
    }

    return (
        <div className={`textfield${className ? " " + className : ""}`}>
            <label htmlFor={label} className="textfield__label">{required ? label + "*" : label}</label>
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
            />
        </div>
    )
}

export default Textfield;