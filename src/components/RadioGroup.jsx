export function RadioGroup({ label, name, options, selectedValue, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex space-x-4">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={selectedValue === opt.value}
                            onChange={() => onChange(opt.value)}
                            className="mr-2"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
}