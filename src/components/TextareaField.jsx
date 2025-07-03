const TextareaField = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onchange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y min-h-[100px] focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
    </div>
);

export default TextareaField;