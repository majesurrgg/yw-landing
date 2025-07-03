// PersonalDataSection.jsx
"use client"

import FormInput from "./FormInput"
import FormSelect from "./FormSelect"

export default function PersonalDataSection({ formData, handleInputChange, handleFileChange }) {
  const documentOptions = [
    { value: "DNI", label: "DNI" },
    { value: "PASSPORT", label: "Pasaporte" },
  ]

  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Datos personales</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormInput
          label="¿Cuáles son tus nombres?"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="John"
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1">Teléfono Móvil</label>
          <div className="flex">
            <select className="px-3 py-2 border border-gray-300 rounded-l-md bg-white">
              <option>🇵🇪 +51</option>
            </select>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => handleInputChange("phone_number", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="987654321"
              required
            />
          </div>
        </div>
        <FormSelect
          label="Tipo de documento"
          value={formData.type_identification}
          onChange={(e) => handleInputChange("type_identification", e.target.value)}
          options={documentOptions}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormInput
          label="¿Cuáles son tus apellidos?"
          value={formData.lastname}
          onChange={(e) => handleInputChange("last_name", e.target.value)}
          placeholder="Doe"
          required
        />
        <FormInput
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="username@gmail.com"
          required
        />
        <FormInput
          label="Número de documento"
          value={formData.num_identification}
          onChange={(e) => handleInputChange("num_identification", e.target.value)}
          placeholder="78987605"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormInput
          type="date"
          label="Fecha de Nacimiento"
          value={formData.date_birth}
          onChange={(e) => handleInputChange("date_birth", e.target.value)}
          required
        />
        <div >
          <label className="block text-sm font-medium mb-2">
            ¿Has participado como voluntari@ en temporadas anteriores?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="was_voluntary"
                checked={formData.was_voluntary === true}
                onChange={(e) => handleInputChange("was_voluntary", true)}
                className="mr-2"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="was_voluntary"
                checked={formData.was_voluntary === false}
                onChange={(e) => handleInputChange("was_voluntary", false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Curriculum Vitae (CV)</label>
          <input
            type="file"
            onChange={(e) => handleFileChange("cv_url", e.target.files[0])}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
      </div>
    </section>
  )
}
