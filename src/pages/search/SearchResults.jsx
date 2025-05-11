import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import MovieCard from '../watch/components/MovieCard';


const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extraer el parámetro de búsqueda de la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    setSearchQuery(query);
  }, [location.search]);

  // Buscar películas cuando cambia el query
  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/peliculas/search?q=${encodeURIComponent(searchQuery)}`);
        setResults(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al buscar películas');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading && searchQuery) {
    return (
      <Layout>
        <div className="bg-black min-h-screen pt-24 pb-10">
          <div className="container mx-auto px-4">
            <h1 className="text-white text-2xl font-bold mb-6">Buscando: "{searchQuery}"</h1>
            <div className="text-white">Cargando resultados...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-black min-h-screen pt-24 pb-10 flex flex-col items-center justify-center">
          <div className="text-white text-xl mb-4">{error}</div>
          <button 
            onClick={() => navigate('/browse')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Volver al inicio
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-black min-h-screen pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-2xl font-bold mb-6">
            {results.length > 0 
              ? `Resultados para: "${searchQuery}"` 
              : `No hay resultados para: "${searchQuery}"`}
          </h1>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map(movie => (
                <div 
                  key={movie._id} 
                  className="cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => navigate(`/watch/${movie._id}`)}
                >
                  <MovieCard movie={movie} />
                  <h3 className="text-white text-sm mt-2">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">{movie.year}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white">
              <p>Intenta con diferentes términos de búsqueda.</p>
              <button 
                onClick={() => navigate('/browse')}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Explorar películas
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;