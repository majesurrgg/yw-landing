import { ChevronDown } from "lucide-react";

export function SelectField({ label, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            </div>
        </div>
    );
}