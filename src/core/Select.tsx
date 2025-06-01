export interface SelectProps {
    options: Array<{ value: string; label: string }>;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    label?: string;
    value?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    onChange,
    disabled = false,
    className = "",
    label = "Select an option",
    value = ""
}) => {
    return (
        <>
    <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
        <select 
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        className={`cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed ${className}`}>
            <option value="" disabled selected>Select an option</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </>
    )
}