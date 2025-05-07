// src/components/AvatarIcon.jsx
import { 
    FaUser, 
    FaUserTie, 
    FaChild, 
    FaCat, 
    FaDog,
    FaGamepad,
    FaUserAstronaut,
    FaUserNinja
  } from 'react-icons/fa';
  
  const iconComponents = {
    adult: FaUser,
    professional: FaUserTie,
    child: FaChild,
    cat: FaCat,
    dog: FaDog,
    gamer: FaGamepad,
    astronaut: FaUserAstronaut,
    ninja: FaUserNinja
  };
  
  const AvatarIcon = ({ type = 'adult', size = 'text-4xl', color = 'text-white' }) => {
    const Icon = iconComponents[type] || FaUser;
    return <Icon className={`${size} ${color} rounded-full bg-gray-700 p-2`} />;
  };
  
  export default AvatarIcon;