import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react' // Puedes usar este icono si tienes lucide-react o reemplazarlo

const Navbar = () => {
  return (
    <header className="bg-black fixed w-full z-50 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <h1 className="text-red-600 text-3xl font-bold">
            <Link to="/">Tecflix</Link>
          </h1>
          <ul className="hidden md:flex space-x-6 text-white font-medium text-sm">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/accion">Acción</Link></li>
            <li><Link to="/comedia">Comedia</Link></li>
            <li><Link to="/terror">Terror</Link></li>
            <li><Link to="/romance">Romance</Link></li>
            <li><Link to="/ciencia-ficcion">Ciencia Ficción</Link></li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">  
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-zinc-800 text-white rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <span className="absolute left-3 top-2.5 text-zinc-400">
              <Search size={18} />
            </span>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
