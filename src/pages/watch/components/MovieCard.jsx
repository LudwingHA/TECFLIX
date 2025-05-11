import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, navigate, isCompact = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const cardClasses = `relative rounded-md overflow-hidden transition-all duration-300 ${
    isCompact 
      ? 'min-w-[150px] h-[225px] hover:scale-105' 
      : 'min-w-[200px] h-[300px] hover:scale-110'
  }`;

  return (
    <div 
      className={cardClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/watch/${movie._id}`)}
    >
      {!isHovered ? (
        <div className="absolute inset-0">
          <img 
            src={movie.thumbnail} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {!isCompact && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <h3 className="text-white font-bold text-sm">{movie.title}</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={movie.videoUrl}
            muted
            loop
            className="w-full h-full object-cover"
          />
          {!isCompact && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <h3 className="text-white font-bold text-sm">{movie.title}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCard;