import styles from './select.module.scss';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[],
    label?: string;
    value?: string;
    name: string;
    onChange?: (event: React.SyntheticEvent<HTMLSelectElement>, value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
}

const Select = (props: SelectProps) => {

    const { options, label, value, name, onChange, placeholder, className, disabled, required, fullWidth } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) onChange(e, e.currentTarget.value);
    }

    
        return (
            <div className={`${styles.select}${className ? " " + className : ""}`}>
                {label ? <label htmlFor={label} className={styles.label}>{required ? label + "*" : label}</label> : null}
                <select className={styles.input}
                    value={value}
                    // onSelect={handleOnChange}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    name={name}
                    disabled={disabled}
                    required={required}
                    style={props.fullWidth ? { width: '100%' } : undefined}>
                    {options.map(({ value, label }) => <option key={value}  value={value}>{label}</option>)}
                </select>
            </div>
        )
}
    
export default Select;