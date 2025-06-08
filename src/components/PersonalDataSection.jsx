"use client"

import FormInput from "./FormInput"
import FormSelect from "./FormSelect"

export default function PersonalDataSection({ formData, handleInputChange }) {
  const documentOptions = [
    { value: "DNI o Pasaporte", label: "DNI o Pasaporte" },
    { value: "DNI", label: "DNI" },
    { value: "Pasaporte", label: "Pasaporte" },
  ]

  const birthYearOptions = [
    { value: "", label: "Fecha de Nacimiento" },
    { value: "1990", label: "1990" },
    { value: "1991", label: "1991" },
    { value: "1992", label: "1992" },
    { value: "1993", label: "1993" },
    { value: "1994", label: "1994" },
    { value: "1995", label: "1995" },
  ]

  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Datos personales</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormInput
          label="Nombres"
          value={formData.nombres}
          onChange={(e) => handleInputChange("nombres", e.target.value)}
          placeholder="John"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Teléfono Móvil</label>
          <div className="flex">
            <select className="px-3 py-2 border border-gray-300 rounded-l-md bg-white">
              <option>🇵🇪 +051</option>
            </select>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone number"
            />
          </div>
        </div>

        <FormSelect
          label="DNI o Pasaporte"
          value={formData.tipoDocumento}
          onChange={(e) => handleInputChange("tipoDocumento", e.target.value)}
          options={documentOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormInput
          label="Apellidos"
          value={formData.apellidos}
          onChange={(e) => handleInputChange("apellidos", e.target.value)}
          placeholder="Doe"
        />

        <FormInput
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="username@gmail.com"
        />

        <FormInput
          label="Digita tu número de documento"
          value={formData.numeroDocumento}
          onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
          placeholder="78987605"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormSelect
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
          options={birthYearOptions}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Adjuntar Curriculum Vitae(CV):</label>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>Seleccionar archivo</span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ¿Has participado como voluntari@ en temporadas anteriores?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="haParticipado"
              value="si"
              checked={formData.haParticipado === "si"}
              onChange={(e) => handleInputChange("haParticipado", e.target.value)}
              className="mr-2"
            />
            Sí
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="haParticipado"
              value="no"
              checked={formData.haParticipado === "no"}
              onChange={(e) => handleInputChange("haParticipado", e.target.value)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
    </section>
  )
}
