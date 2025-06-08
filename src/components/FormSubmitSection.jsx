"use client"

export default function FormSubmitSection({ formData, handleInputChange }) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={formData.aceptaTerminos}
          onChange={(e) => handleInputChange("aceptaTerminos", e.target.checked)}
          className="mr-2 h-4 w-4"
        />
        <span className="text-sm">Acepto los términos de uso</span>
      </label>

      <button
        type="submit"
        disabled={!formData.aceptaTerminos}
        className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <span>Submit</span>
        <span>→</span>
      </button>
    </div>
  )
}
