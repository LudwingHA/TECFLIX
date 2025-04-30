// src/components/RegisterPage.jsx
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-opacity-80 bg-zinc-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Tecflix</h1>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre de usuario</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Nombre de usuario"
              required
            />
          </div>

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
            Registrarse
          </button>
        </form>

        <p className="text-xs text-zinc-400 mt-4 text-center">
          Al registrarte, aceptas nuestros <a href="#" className="text-white hover:underline">términos de uso</a> y <a href="#" className="text-white hover:underline">política de privacidad</a>.
        </p>

        <div className="text-sm text-zinc-400 mt-6 text-center">
          ¿Ya tienes una cuenta? <a href="#" className="text-white hover:underline">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage