import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado inicial leyendo de localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('tecflix_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [selectedProfile, setSelectedProfile] = useState(() => {
    const storedProfile = localStorage.getItem('tecflix_profile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  // Función de login mejorada
  const login = (userData, token) => {
    localStorage.setItem('tecflix_token', token);
    localStorage.setItem('tecflix_user', JSON.stringify(userData));
    setUser(userData);
  };

  // Función de selección de perfil mejorada
  const selectProfile = (profile) => {
    if (!profile) {
      localStorage.removeItem('tecflix_profile');
      setSelectedProfile(null);
      return;
    }
    
    const profileData = {
      _id: profile._id,
      nombre: profile.nombre,
      icono: profile.icono,
      infantil: profile.infantil
    };
    
    localStorage.setItem('tecflix_profile', JSON.stringify(profileData));
    setSelectedProfile(profileData);
  };

  // Función de logout completa
  const logout = () => {
    localStorage.removeItem('tecflix_token');
    localStorage.removeItem('tecflix_user');
    localStorage.removeItem('tecflix_profile');
    setUser(null);
    setSelectedProfile(null);
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('tecflix_token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      selectedProfile,
      isAuthenticated,
      login, 
      logout,
      selectProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};