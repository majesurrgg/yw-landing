// para encapsular cada bloque temático del formulario (título + contenido)

const FormSection=({title, children}) => (
    <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
        {children}
    </div>
);

export default FormSection;