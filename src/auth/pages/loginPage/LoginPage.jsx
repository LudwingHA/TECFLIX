// src/auth/pages/loginPage/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Credenciales incorrectas");
      }

      const data = await response.json();
      
      // Guardar token y datos de usuario usando el contexto
      login(data.usuario, data.token);
      
      // Redirigir a la página previa o a selección de perfiles
      const from = location.state?.from?.pathname || "/profiles";
      navigate(from, { replace: true });

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

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-900 text-white rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </button>

          <div className="flex items-center justify-between text-sm text-zinc-400 mt-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 rounded bg-zinc-800 border-zinc-700 text-red-600 focus:ring-red-600" 
              />
              Recuérdame
            </label>
            <a href="#" className="hover:underline">¿Necesitas ayuda?</a>
          </div>
        </form>

        <div className="text-sm text-zinc-400 mt-8 text-center">
          ¿Primera vez en Tecflix?{" "}
          <a 
            href="/register" 
            className="text-white hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Suscríbete ahora.
          </a>
        </div>

        <p className="text-xs text-zinc-500 mt-4 text-center">
          Esta página es un proyecto individual sin fines de lucro.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;