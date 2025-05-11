import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import MovieCard from './components/MovieCard';
import { useAuth } from '../../auth/context/AuthContext';

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, selectedProfile } = useAuth();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(0);

  // Detectar cambios en pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const fetchMovieData = async (movieId) => {
    try {
      setLoading(true);
      setVideoEnded(false);
      setError(null);
      
      const movieResponse = await axios.get(`http://localhost:3000/peliculas/id/${movieId}`);
      
      if (!movieResponse.data) {
        throw new Error('Película no encontrada');
      }
      
      setMovie(movieResponse.data);
      
      if (movieResponse.data.genre?.length > 0) {
        const genre = movieResponse.data.genre[0];
        const recResponse = await axios.get(
          `http://localhost:3000/peliculas/genre/${genre}?exclude=${movieId}`
        );
        setRecommendations(recResponse.data.filter(m => m._id !== movieId).slice(0, 5));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al cargar la película');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Registrar progreso de visualización - Versión optimizada
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !user || !selectedProfile) return;

    let lastRegisteredProgress = 0;
    let updateTimeout;

    const registrarVisualizacion = async (progreso) => {
      try {
        // Solo registrar si hay un cambio significativo (>5%) o cada 30 segundos
        if (Math.abs(progreso - lastRegisteredProgress) > 5 || video.paused) {
          const response = await axios.post('http://localhost:3000/registros/registrarVisualizacion', {
            usuarioId: user._id,
            perfilId: selectedProfile._id,
            peliculaId: id,
            progreso: progreso
          });
          
          console.log('Progreso registrado:', progreso, response.data);
          lastRegisteredProgress = progreso;
        }
      } catch (error) {
        console.error('Error registrando visualización:', error.response?.data || error.message);
      }
    };

    const updateProgress = () => {
      if (video.duration) {
        const newProgress = (video.currentTime / video.duration) * 100;
        progressRef.current = newProgress;
        
        // Usar debounce para evitar demasiadas llamadas
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
          registrarVisualizacion(newProgress);
        }, 3000);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('pause', updateProgress);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      clearTimeout(updateTimeout);
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('pause', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [id, user, selectedProfile]);

  const handleVideoEnd = async () => {
    setVideoEnded(true);
    
    if (user && selectedProfile) {
      try {
        const response = await axios.post('http://localhost:3000/registros/registrarVisualizacion', {
          usuarioId: user._id,
          perfilId: selectedProfile._id,
          peliculaId: id,
          progreso: 100,
          completada: true
        });
        console.log('Marcada como completada:', response.data);
      } catch (error) {
        console.error('Error registrando finalización:', error.response?.data || error.message);
      }
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.log(e));
    }
  };

  useEffect(() => {
    fetchMovieData(id);
  }, [id]);

  const handlePlayRecommendation = (recId) => {
    setVideoEnded(false);
    navigate(`/watch/${recId}`);
  };

  const handleBackToHome = () => {
    navigate('/browse');
  };

  if (loading) {
    return (
      <Layout>
        <div className="bg-black min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Cargando...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
          <div className="text-white text-xl mb-4">{error}</div>
          <button 
            onClick={handleBackToHome}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-black text-white min-h-screen">
        <div className="relative pt-[56.25%] bg-black">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full"
            src={movie?.videoUrl}
            controls
            autoPlay
            onEnded={handleVideoEnd}
            key={movie?._id}
          />
          
          {(videoEnded || isFullscreen) && (
            <div className={`absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-8 z-10 ${
              isFullscreen ? 'fixed top-0 left-0 w-screen h-screen' : ''
            }`}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">¿Qué quieres ver ahora?</h2>
                <p className="text-gray-400">Selecciona una película para continuar</p>
              </div>
              
              <div className="w-full max-w-6xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Más {movie?.genre?.[0]}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recommendations.map(rec => (
                    <div 
                      key={rec._id}
                      className="cursor-pointer transform transition-transform hover:scale-105"
                      onClick={() => handlePlayRecommendation(rec._id)}
                    >
                      <MovieCard movie={rec} isCompact />
                      <h3 className="text-white text-sm mt-2 text-center">{rec.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                  onClick={handleBackToHome}
                >
                  Volver al inicio
                </button>
                {movie && (
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    onClick={() => handlePlayRecommendation(movie._id)}
                  >
                    Volver a ver
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {!videoEnded && movie && (
          <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{movie.title} ({movie.year})</h1>
            <div className="flex items-center mb-4">
              <span className="text-green-500 font-semibold mr-4">{movie.rating}</span>
              <span className="mr-4">{movie.duration}</span>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g, index) => (
                  <span key={index} className="bg-gray-800 px-2 py-1 rounded text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-300">{movie.description}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;