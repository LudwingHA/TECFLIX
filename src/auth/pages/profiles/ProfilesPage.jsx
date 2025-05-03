import React from 'react';
import { useNavigate } from 'react-router-dom';

const profiles = [
    { id: 1, name: 'Jesus', image: 'src/assets/Jesus.png' },
    { id: 2, name: 'Yahir', image: 'src/assets/Yahir.png' },
    { id: 3, name: 'Ludwing', image: 'src/assets/Ludwing.png' },
  ];

const ProfilesPage = () => {
  const navigate = useNavigate();

  const handleSelectProfile = (profile) => {
    localStorage.setItem('activeProfile', JSON.stringify(profile));
    navigate('/browse');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl md:text-5xl font-semibold mb-12">
        ¿Quién está viendo ahora?
      </h1>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleSelectProfile(profile)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-md object-cover border-2 border-transparent hover:border-white"
            />
            <p className="mt-4 text-lg font-medium text-zinc-300 hover:text-white">
              {profile.name}
            </p>
          </div>
        ))}

        {/* Botón Agregar perfil como un perfil más */}
        <div
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center bg-zinc-700 text-5xl rounded-md text-white">
            +
          </div>
          <p className="mt-4 text-lg font-medium text-zinc-300 hover:text-white">
            Agregar perfil
          </p>
        </div>
      </div>

      <button className="px-6 py-2 border border-zinc-500 rounded hover:border-white hover:text-white text-zinc-400 transition-colors">
        Administrar perfiles
      </button>
    </div>
  );
};

export default ProfilesPage;
