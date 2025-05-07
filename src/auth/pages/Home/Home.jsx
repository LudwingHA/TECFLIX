import React, { useState } from "react";

const faqs = [
  {
    q: "¿Qué es TECFLIX?",
    a: "TECFLIX es un servicio educativo de streaming donde puedes aprender sobre tecnología desde cualquier lugar.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Puedes empezar gratis. Posteriormente tendrás acceso a planes mensuales accesibles.",
  },
  {
    q: "¿Dónde puedo ver?",
    a: "En cualquier dispositivo con conexión a internet: Smart TV, laptop, tablet o teléfono.",
  },
];

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-black text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gradient-to-b from-black to-transparent absolute w-full z-10">
        <h1 className="text-3xl text-red-600 font-bold">TECFLIX</h1>
        <button className="bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-700" onClick={() => window.location.href = "/login"}>
          Iniciar sesión
        </button>
      </header>

      {/* Hero */}
      <section
        className="h-[90vh] bg-cover bg-center relative flex flex-col justify-center items-center text-center px-4"
        style={{
          backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/fa7be975-efc3-48c6-8188-f07fdd1aa476/web/MX-es-20250428-TRIFECTA-perspective_68051aa4-b591-4f16-b9e7-e67a79f4b892_medium.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />

        <div className="relative z-10 max-w-2xl text-white space-y-4">
          <h2 className="text-4xl font-bold">
            Películas, series y mucho más sin límites
          </h2>
          <p className="text-xl">Disfruta donde quieras. Cancela cuando quieras.</p>
          <p className="text-md">
            ¿Quieres ver algo ya? Ingresa tu correo para crear una cuenta o reiniciar tu membresía de TECFLIX.
          </p>
          <div className="flex flex-col  sm:flex-row items-center justify-center gap-2 mt-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="p-3 rounded text-white w-[300px] border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="bg-red-600 px-6 py-3 rounded hover:bg-red-700" onClick={() => window.location.href = "/register"}>
              Comenzar
            </button>
          </div>
        </div>
      </section>

      {/* Sección: Disfruta en tu TV */}
      <section className="grid sm:grid-cols-2 items-center px-6 py-16 border-t border-gray-700">
        <div>
          <h3 className="text-3xl font-bold mb-4">Disfruta en tu TV</h3>
          <p className="text-lg">
            Ve en Smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores Blu-ray y más.
          </p>
        </div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
          alt="tv"
        />
      </section>

      {/* Sección: Descarga tus series */}
      <section className="grid sm:grid-cols-2 items-center px-6 py-16 border-t border-gray-700 bg-black">
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          alt="mobile"
        />
        <div>
          <h3 className="text-3xl font-bold mb-4">
            Descarga tus series para verlas sin conexión
          </h3>
          <p className="text-lg">
            Guarda tu contenido favorito fácilmente y ten siempre algo para ver.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 border-t border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-8">Preguntas frecuentes</h3>
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((item, idx) => (
            <div key={idx}>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left bg-gray-800 p-4 text-lg font-medium hover:bg-gray-700"
              >
                {item.q}
              </button>
              {openIndex === idx && (
                <div className="bg-gray-900 p-4 border-t border-gray-700">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-sm text-gray-400 px-6 py-8 border-t border-gray-700">
        <p className="mb-4">¿Preguntas? Llama al 800-123-4567</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="#">Preguntas frecuentes</a>
          <a href="#">Centro de ayuda</a>
          <a href="#">Cuenta</a>
          <a href="#">Privacidad</a>
        </div>
        <p className="mt-6">TECFLIX México</p>
      </footer>
    </div>
  );
}