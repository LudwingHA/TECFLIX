// src/components/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí podrías validar los datos si quieres
    // Simulación de login exitoso:
    navigate("/profiles"); // Redirige a "¿Quién está viendo?"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-opacity-80 bg-zinc-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Tecflix</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors"
          >
            Iniciar sesión
          </button>

          <div className="flex items-center justify-between text-sm text-zinc-400 mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Recuérdame
            </label>
            <a href="#" className="hover:underline">¿Necesitas ayuda?</a>
          </div>
        </form>

        <div className="text-sm text-zinc-400 mt-8 text-center">
          ¿Primera vez en Tecflix? <a href="#" className="text-white hover:underline">Suscríbete ahora.</a>
        </div>

        <p className="text-xs text-zinc-500 mt-4 text-center">
          Esta página es un proyecto individual sin fines de lucro.
        </p>
      </div>
    </div>
  );
}
