  import React, { useState, useEffect, useRef } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import axios from 'axios';
  import Layout from '../../Layout/Layout';
  import { useAuth } from '../../auth/context/AuthContext';

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
    const location = useLocation();
    const { user, selectedProfile } = useAuth();
    const [moviesData, setMoviesData] = useState({
      byGenre: {
        accion: [],
        cienciaFiccion: [],
        comedia: [],
        terror: [],
        romance: [],
        todas: []
      },
      continueWatching: [],
      recommendations: [],
      becauseYouWatched: [],
      popular: []
    });
    const [loading, setLoading] = useState(true);
    const [filteredGenre, setFilteredGenre] = useState(null);
  
    // Extraer género de la URL
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const genreParam = queryParams.get('genre');
      setFilteredGenre(genreParam);
    }, [location.search]);
  
    // Función para mapear el género de URL a nombre de género
    const getGenreName = (genreUrl) => {
      const genreMap = {
        accion: 'Acción',
        cienciaficcion: 'Ciencia Ficción',
        comedia: 'Comedia',
        terror: 'Terror',
        romance: 'Romance'
      };
      return genreMap[genreUrl] || genreUrl;
    };
  
    // Función para obtener el nombre formateado del género (para mostrar en UI)
    const getFormattedGenreName = (genreUrl) => {
      const name = getGenreName(genreUrl);
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
  
    // Cargar datos de películas
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          // Si hay un filtro de género, cargar solo ese género
          if (filteredGenre) {
            const response = await axios.get(
              `http://localhost:3000/peliculas/genre/${getGenreName(filteredGenre)}`
            );
            
            setMoviesData(prev => ({
              ...prev,
              byGenre: {
                ...prev.byGenre,
                todas: response.data
              },
              continueWatching: [],
              becauseYouWatched: [],
              recommendations: response.data.slice(0, 10)
            }));
            return;
          }
  
          // Cargar todos los datos si no hay filtro
          const [todas, accion, cienciaFiccion, comedia, terror, romance] = await Promise.all([
            axios.get('http://localhost:3000/peliculas'),
            axios.get('http://localhost:3000/peliculas/genre/Acción'),
            axios.get('http://localhost:3000/peliculas/genre/Ciencia Ficción'),
            axios.get('http://localhost:3000/peliculas/genre/Comedia'),
            axios.get('http://localhost:3000/peliculas/genre/Terror'),
            axios.get('http://localhost:3000/peliculas/genre/Romance')
          ]);
  
          // Datos básicos
          const basicData = {
            byGenre: {
              accion: accion.data,
              cienciaFiccion: cienciaFiccion.data,
              comedia: comedia.data,
              terror: terror.data,
              romance: romance.data,
              todas: todas.data
            },
            popular: todas.data.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0)).slice(0, 20),
            recommendations: todas.data.sort(() => 0.5 - Math.random()).slice(0, 10)
          };
  
          // Datos personalizados si hay usuario
          if (user && selectedProfile) {
            const userId = user._id;
            const profileId = selectedProfile._id;
            const baseUrl = 'http://localhost:3000/registros';
  
            // Obtener historial (Continuar viendo)
            const historyRes = await axios.get(`${baseUrl}/historial/${userId}/${profileId}`);
            const continueWatching = historyRes.data.map(item => ({
              ...item.pelicula,
              _id: item.pelicula._id,
              progreso: item.progreso,
              ultimaVista: item.fecha
            }));
  
            // Obtener recomendaciones
            const recRes = await axios.get(`${baseUrl}/recomendaciones/${userId}/${profileId}`);
            const watchedIds = continueWatching.map(m => m._id);
            const recommendations = recRes.data
              .filter(m => !watchedIds.includes(m._id))
              .slice(0, 20);
  
            // Obtener "Porque viste"
            const bywRes = await axios.get(`${baseUrl}/porque-viste/${userId}/${profileId}`);
            const becauseYouWatched = bywRes.data.map(section => ({
              basedOnTitle: section.basedOnTitle,
              movies: section.movies
            }));
  
            setMoviesData({
              ...basicData,
              continueWatching,
              recommendations: recommendations.length > 0 ? recommendations : basicData.recommendations,
              becauseYouWatched
            });
          } else {
            setMoviesData(basicData);
          }
  
        } catch (error) {
          console.error('Error loading movie data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [filteredGenre, user, selectedProfile]);
  
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
          {/* Sección de Continuar viendo - Solo para usuarios logueados */}
          {user && selectedProfile && moviesData.continueWatching.length > 0 && (
            <Slider 
              title="Continuar viendo" 
              movies={moviesData.continueWatching} 
              navigate={navigate}
            />
          )}
  
          {/* Sección "Porque viste X" - Solo para usuarios logueados */}
          {user && selectedProfile && moviesData.becauseYouWatched.length > 0 && 
            moviesData.becauseYouWatched.map((section, index) => (
              <Slider
                key={`because-${index}`}
                title={`Porque viste "${section.basedOnTitle}"`}
                movies={section.movies}
                navigate={navigate}
              />
            ))
          }
  
          {/* Sección de Recomendaciones */}
          {moviesData.recommendations.length > 0 && (
            <Slider 
              title={user && selectedProfile ? 
                `Recomendaciones para ${selectedProfile.nombre}` : 
                'Películas destacadas'}
              movies={moviesData.recommendations} 
              navigate={navigate}
            />
          )}
  
          {/* Contenido principal - cambia según si hay filtro o no */}
          {filteredGenre ? (
            <div className="mb-12">
              <div className="flex justify-between items-center px-4 mb-4">
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  Películas de {getFormattedGenreName(filteredGenre)}
                </h2>
                <button
                  onClick={() => navigate('/browse')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Ver todas las categorías
                </button>
              </div>
              
              {/* Mostrar películas del género filtrado */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                {moviesData.byGenre.todas.map(movie => (
                  <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Sección de Películas populares (solo sin filtro) */}
              {moviesData.popular.length > 0 && (
                <Slider 
                  title="Películas populares" 
                  movies={moviesData.popular} 
                  navigate={navigate}
                  isLarge={true}
                />
              )}
  
              {/* Mostrar todas las categorías (solo sin filtro) */}
              <Slider title="Acción" movies={moviesData.byGenre.accion} navigate={navigate} />
              <Slider title="Ciencia Ficción" movies={moviesData.byGenre.cienciaFiccion} navigate={navigate} />
              <Slider title="Comedia" movies={moviesData.byGenre.comedia} navigate={navigate} />
              <Slider title="Terror" movies={moviesData.byGenre.terror} navigate={navigate} />
              <Slider title="Romance" movies={moviesData.byGenre.romance} navigate={navigate} />
            </>
          )}
        </main>
      </Layout>
    );
  };
  export default BrowsePage;