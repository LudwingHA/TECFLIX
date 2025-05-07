import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { 
  FaUser, 
  FaUserTie, 
  FaChild, 
  FaCat, 
  FaDog,
  FaGamepad,
  FaUserAstronaut,
  FaUserNinja,
  FaSnowman,
  FaRobot,
  FaGhost,
  FaPlus,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';


const iconComponents = {
  FaUser: FaUser,
  FaUserTie: FaUserTie,
  FaChild: FaChild,
  FaCat: FaCat,
  FaDog: FaDog,
  FaGamepad: FaGamepad,
  FaUserAstronaut: FaUserAstronaut,
  FaUserNinja: FaUserNinja,
  FaSnowman: FaSnowman,
  FaRobot: FaRobot,
  FaGhost: FaGhost,
  default: FaUser
  
};


const Navbar = () => {
  const navigate = useNavigate();
  const { selectedProfile, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  // Mapeo de iconos (debe coincidir con los usados en CreateProfilePage)
  const IconComponent = iconComponents[selectedProfile.icono] || iconComponents.default;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <header className="bg-gradient-to-b from-black to-transparent fixed w-full z-50">
      <nav className="flex items-center justify-between px-4 py-3 md:px-12">
        {/* Logo y categorías */}
        <div className="flex items-center space-x-2 md:space-x-8">
          <h1 className="text-red-600 text-2xl md:text-3xl font-bold">
            <Link to="/browse">TECFLIX</Link>
          </h1>
          
          <ul className="hidden md:flex space-x-4 text-white font-medium text-sm">
            <li className="hover:text-gray-300 transition-colors">
              <Link to="/browse">Inicio</Link>
            </li>
            <li className="hover:text-gray-300 transition-colors">
              <Link to="/browse?genre=accion">Acción</Link>
            </li>
            <li className="hover:text-gray-300 transition-colors">
              <Link to="/browse?genre=comedia">Comedia</Link>
            </li>
            <li className="hover:text-gray-300 transition-colors">
              <Link to="/browse?genre=terror">Terror</Link>
            </li>
          </ul>
        </div>

        {/* Barra de búsqueda y perfil */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Títulos, personas, géneros"
              className="bg-black bg-opacity-70 border border-gray-600 text-white rounded px-4 pl-10 py-1.5 text-sm focus:outline-none focus:border-white w-64 transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <div className="flex items-center space-x-2">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Bell size={20} />
            </button>

            {selectedProfile ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center overflow-hidden">
                    <IconComponent className="text-xl text-white" />
                  </div>
                  <ChevronDown className={`text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`} size={18} />
                </button>

                {/* Menú desplegable - ahora con estado controlado */}
                {showDropdown && (
                  <div 
                    className="absolute right-0 top-10 bg-black border border-gray-700 rounded shadow-lg w-48"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-white text-sm font-medium">{selectedProfile.nombre}</p>
                      <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                    </div>
                    <ul>
                      <li>
                        <Link 
                          to="/profiles" 
                          className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUserCircle className="mr-2" /> Administrar perfiles
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 text-left"
                        >
                          <FaSignOutAlt className="mr-2" /> Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;