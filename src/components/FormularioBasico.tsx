"use client";

import { useState } from "react";
import { Asistente } from "@/types/Asistente";

interface FormData {
  rut: string;
  nombre: string;
  apellido: string;
  mail: string;
  celular: string;
  fnac: string;
  especialidad: string;
  region: string;
  comuna: string;
  checkboxterminos: string;
}

interface FormularioBasicoProps {
  browserid?: string | null;
  asistente?: Asistente | null;
  browserIdReconnected?: string | null;
}

export default function FormularioBasico({
  browserid,
  asistente,
  browserIdReconnected,
}: FormularioBasicoProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    rut: "237406133",
    nombre: "Andrea",
    apellido: "Godoy",
    mail: "agodoy1009@gmail.com",
    celular: "985192689",
    fnac: "1973-09-10T00:00:00",
    especialidad: "ninguna",
    region: "Metropolitana",
    comuna: "Las condes",
    checkboxterminos: "true",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked.toString() : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    setLoading(true);

    // Usar el proxy de Next.js para evitar CORS
    fetch("/api/mejormaestro/formtest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, browserid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full grid grid-cols-3 gap-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-8 border border-gray-200 rounded-lg shadow-lg w-full col-span-1"
      >
        <h3 className="text-2xl font-medium text-gray-700 mb-2 text-center">
          BrowserId obtenido por primera vez y guardado en localStorage:
          <strong className="text-green-500">
            <br />
            {browserid}
          </strong>
        </h3>

        <h3 className="text-2xl font-medium text-gray-700 mb-2 text-center">
          BrowserId obtenido por reconección:
          <strong className="text-green-500">
            <br />
            {browserIdReconnected}
          </strong>
        </h3>
        {/* RUT */}
        <div>
          <label
            htmlFor="rut"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            RUT
          </label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Apellido */}
        <div>
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="mail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Celular */}
        <div>
          <label
            htmlFor="celular"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Celular
          </label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div>
          <label
            htmlFor="fnac"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fnac"
            name="fnac"
            value={formData.fnac.split("T")[0]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Especialidad */}
        <div>
          <label
            htmlFor="especialidad"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Especialidad
          </label>
          <input
            type="text"
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Región */}
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Región
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Metropolitana">Metropolitana</option>
            <option value="Valparaíso">Valparaíso</option>
            <option value="O'Higgins">O&apos;Higgins</option>
            <option value="Maule">Maule</option>
            <option value="Biobío">Biobío</option>
            <option value="La Araucanía">La Araucanía</option>
            <option value="Los Lagos">Los Lagos</option>
            <option value="Aysén">Aysén</option>
            <option value="Magallanes">Magallanes</option>
            <option value="Tarapacá">Tarapacá</option>
            <option value="Antofagasta">Antofagasta</option>
            <option value="Atacama">Atacama</option>
            <option value="Coquimbo">Coquimbo</option>
            <option value="Los Ríos">Los Ríos</option>
            <option value="Arica y Parinacota">Arica y Parinacota</option>
            <option value="Ñuble">Ñuble</option>
          </select>
        </div>

        {/* Comuna */}
        <div>
          <label
            htmlFor="comuna"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comuna
          </label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Checkbox Términos */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkboxterminos"
            name="checkboxterminos"
            checked={formData.checkboxterminos === "true"}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="checkboxterminos"
            className="ml-2 block text-sm text-gray-700"
          >
            Acepto los términos y condiciones
          </label>
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Formulario"}
          </button>
        </div>
      </form>

      {/* Mostrar datos del formulario (para debugging) */}

      <div className="bg-gray-100 rounded-md p-8 col-span-1">
        <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
          POST a: wss://api.primepass.cl/AcreditacionHub:
        </h3>
        <pre className="text-xs text-gray-600 overflow-auto">
          {JSON.stringify({ ...formData, browserid }, null, 2)}
        </pre>
      </div>

      <div className="bg-gray-100 rounded-md p-8 col-span-1 text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">USUARIO:</h3>
        {asistente ? (
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify(asistente, null, 2)}
            {browserid === asistente.browserId && (
              <p className="text-green-500">BrowserId iguales!</p>
            )}
          </pre>
        ) : (
          <p className="text-gray-700">
            Envíe el formulario para crear al asistente
          </p>
        )}
      </div>
    </div>
  );
}
