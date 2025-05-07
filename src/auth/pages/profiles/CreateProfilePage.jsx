import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  FaGhost
} from 'react-icons/fa';

const CreateProfilePage = () => {
  const [nombre, setNombre] = useState('');
  const [infantil, setInfantil] = useState(false);
  const [iconoSeleccionado, setIconoSeleccionado] = useState('FaUser');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const iconosDisponibles = [
    { componente: FaUser, nombre: 'FaUser', descripcion: 'Adulto' },
    { componente: FaUserTie, nombre: 'FaUserTie', descripcion: 'Profesional' },
    { componente: FaChild, nombre: 'FaChild', descripcion: 'Niño' },
    { componente: FaCat, nombre: 'FaCat', descripcion: 'Gato' },
    { componente: FaDog, nombre: 'FaDog', descripcion: 'Perro' },
    { componente: FaGamepad, nombre: 'FaGamepad', descripcion: 'Gamer' },
    { componente: FaUserAstronaut, nombre: 'FaUserAstronaut', descripcion: 'Astronauta' },
    { componente: FaUserNinja, nombre: 'FaUserNinja', descripcion: 'Ninja' },
    { componente: FaSnowman, nombre: 'FaSnowman', descripcion: 'Muñeco de nieve' },
    { componente: FaRobot, nombre: 'FaRobot', descripcion: 'Robot' },
    { componente: FaGhost, nombre: 'FaGhost', descripcion: 'Fantasma' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/perfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: user._id,
          nombre,
          infantil,
          icono: iconoSeleccionado // Guardamos el nombre del icono
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear perfil');
      }

      navigate('/profiles');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear nuevo perfil</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900 text-white rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre del perfil</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              maxLength="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">Selecciona un ícono</label>
            <div className="grid grid-cols-4 gap-4">
              {iconosDisponibles.map((icono) => {
                const IconComponent = icono.componente;
                return (
                  <div 
                    key={icono.nombre}
                    onClick={() => setIconoSeleccionado(icono.nombre)}
                    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                      iconoSeleccionado === icono.nombre 
                        ? 'bg-red-600' 
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  >
                    <IconComponent className="text-3xl mb-1" />
                    <span className="text-xs text-center">{icono.descripcion}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="infantil"
              checked={infantil}
              onChange={(e) => setInfantil(e.target.checked)}
              className="h-4 w-4 rounded bg-zinc-800 border-zinc-700 text-red-600 focus:ring-red-600"
            />
            <label htmlFor="infantil" className="ml-2 block text-sm text-gray-300">
              Perfil infantil (controles parentales)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/profiles')}
              className="flex-1 py-2 border border-zinc-500 rounded-md hover:bg-zinc-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creando...' : 'Crear perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;