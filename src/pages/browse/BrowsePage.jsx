import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import axios from 'axios';

const MovieCard = ({ movie, navigate, isLarge = false }) => {
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

  const cardClasses = `relative rounded-md overflow-hidden transition-all duration-300 hover:z-10 ${
    isLarge 
      ? 'min-w-[300px] h-[450px] hover:scale-105' 
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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <h3 className="text-white font-bold">{movie.title}</h3>
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <span>{movie.year}</span>
              <span className="mx-2">•</span>
              <span>{movie.genre[0]}</span>
              {isLarge && <span className="ml-2">⭐ {movie.rating}</span>}
            </div>
          </div>
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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <h3 className="text-white font-bold">{movie.title}</h3>
            <p className="text-gray-300 text-xs mt-1 line-clamp-2">{movie.description}</p>
            <div className="flex mt-2">
              <button className="bg-white text-black px-3 py-1 rounded mr-2 text-sm font-semibold hover:bg-opacity-80">
                Reproducir
              </button>
              <button className="bg-gray-600 bg-opacity-70 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-opacity-50">
                Más info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Slider = ({ title, movies, navigate, isLarge = false }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      checkScroll(); // Check initial state
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
      }
    };
  }, [movies]);

  return (
    <div className="mb-12 relative group">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 pl-4">{title}</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            &larr;
          </button>
        )}
        
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto pb-4 pl-4"
          style={{
            scrollbarWidth: 'none', // Para Firefox
            msOverflowStyle: 'none', // Para IE/Edge
          }}
        >
          {/* Estilo para ocultar scrollbar en Chrome/Safari */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .slider-container::-webkit-scrollbar {
                display: none;
              }
            `}} 
          />
          {movies.map((movie) => (
            <MovieCard 
              key={`${title}-${movie._id}`} 
              movie={movie} 
              navigate={navigate}
              isLarge={isLarge}
            />
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

const BrowsePage = () => {
  const navigate = useNavigate();
  const [moviesByGenre, setMoviesByGenre] = useState({
    accion: [],
    cienciaFiccion: [],
    comedia: [],
    terror: [],
    romance: [],
    todas: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const todasResponse = await axios.get('http://localhost:3000/peliculas');
        const [accion, cienciaFiccion, comedia, terror, romance] = await Promise.all([
          axios.get('http://localhost:3000/peliculas/genre/Acción'),
          axios.get('http://localhost:3000/peliculas/genre/Ciencia Ficción'),
          axios.get('http://localhost:3000/peliculas/genre/Comedia'),
          axios.get('http://localhost:3000/peliculas/genre/Terror'),
          axios.get('http://localhost:3000/peliculas/genre/Romance')
        ]);

        setMoviesByGenre({
          todas: todasResponse.data,
          accion: accion.data,
          cienciaFiccion: cienciaFiccion.data,
          comedia: comedia.data,
          terror: terror.data,
          romance: romance.data
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="bg-black pt-24 pb-10 min-h-screen flex justify-center items-center">
          <div className="text-white">Cargando películas...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="bg-black pt-24 pb-10 min-h-screen overflow-hidden">
        <Slider 
          title="Todas las películas" 
          movies={moviesByGenre.todas} 
          navigate={navigate}
          isLarge={true}
        />
        
        <Slider title="Acción" movies={moviesByGenre.accion} navigate={navigate} />
        <Slider title="Ciencia Ficción" movies={moviesByGenre.cienciaFiccion} navigate={navigate} />
        <Slider title="Comedia" movies={moviesByGenre.comedia} navigate={navigate} />
        <Slider title="Terror" movies={moviesByGenre.terror} navigate={navigate} />
        <Slider title="Romance" movies={moviesByGenre.romance} navigate={navigate} />
      </main>
    </Layout>
  );
};

export default BrowsePage;