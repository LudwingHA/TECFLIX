import React, { useEffect, useState } from 'react';
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
  FaGhost,
  FaPlus
} from 'react-icons/fa';

// Mapeo de iconos (debe coincidir con los nombres guardados en el backend)
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

const ProfilesPage = () => {
  const navigate = useNavigate();
  const { user, selectProfile } = useAuth(); 
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener perfiles del backend
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!user?._id) return;
        
        const response = await fetch(`http://localhost:3000/perfiles/${user._id}`);
        if (!response.ok) {
          throw new Error('Error al obtener perfiles');
        }
        const data = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  const handleSelectProfile = (profile) => {
    selectProfile(profile); // Usa el método del contexto en lugar de localStorage directamente
    navigate('/browse');
  };
  
  const handleAddProfile = () => {
    navigate('/profiles/create');
  };

  const handleManageProfiles = () => {
    navigate('/profiles/manage');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p>Cargando perfiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center p-4 bg-zinc-800 rounded-lg">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-12 text-center">
        ¿Quién está viendo ahora?
      </h1>

      <div className="flex flex-wrap justify-center gap-8 mb-12 max-w-4xl">
        {profiles.map((profile) => {
          const IconComponent = iconComponents[profile.icono] || iconComponents.default;
          return (
            <div
              key={profile._id}
              onClick={() => handleSelectProfile(profile)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-md bg-zinc-800 flex items-center justify-center border-2 border-transparent group-hover:border-white transition-all">
                  <IconComponent className="text-5xl text-white" />
                </div>
                {profile.infantil && (
                  <div className="absolute bottom-0 left-0 bg-blue-600 text-xs px-2 py-1 rounded-tr-md">
                    Infantil
                  </div>
                )}
              </div>
              <p className="mt-4 text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">
                {profile.nombre}
              </p>
            </div>
          );
        })}

        {/* Botón Agregar perfil */}
        {profiles.length < 5 && (
          <div
            onClick={handleAddProfile}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center bg-zinc-700 rounded-md text-white group-hover:bg-zinc-600 transition-all">
              <FaPlus className="text-5xl" />
            </div>
            <p className="mt-4 text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">
              Agregar perfil
            </p>
          </div>
        )}
      </div>

      {profiles.length > 0 && (
        <button 
          onClick={handleManageProfiles}
          className="px-6 py-2 border border-zinc-500 rounded hover:border-white hover:text-white text-zinc-400 transition-colors"
        >
          Administrar perfiles
        </button>
      )}
    </div>
  );
};

export default ProfilesPage;