// src/components/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    correo: "",
    contraseña: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en el registro");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);
      navigate("/login"); // Redirige al login después del registro
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-opacity-80 bg-zinc-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Tecflix</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-900 text-white rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre de usuario</label>
            <input
              type="text"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-xs text-zinc-400 mt-4 text-center">
          Al registrarte, aceptas nuestros <a href="#" className="text-white hover:underline">términos de uso</a> y <a href="#" className="text-white hover:underline">política de privacidad</a>.
        </p>

        <div className="text-sm text-zinc-400 mt-6 text-center">
          ¿Ya tienes una cuenta? <a href="/login" className="text-white hover:underline">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;