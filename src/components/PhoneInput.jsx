export function PhoneInput({ value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">Teléfono Móvil</label>
            <div className="flex">
                <select className="px-3 py-2 border border-gray-300 rounded-l-md bg-white">
                    <option>🇵🇪 +051</option>
                </select>
                <input
                    type="tel"
                    value={value}
                    onChange={onChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone number"
                />
            </div>
        </div>
    );
}