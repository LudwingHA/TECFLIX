import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const movies = {
  accion: [
    { 
      id: 1, 
      title: 'Extracción', 
      img: '/pelis/accion/extraccion.jpeg',
      video: '/pelis/accion/extraccion.mp4',
      genre: 'Acción',
      year: 2020,
      description: 'Un mercenario es enviado a rescatar al hijo secuestrado de un narcotraficante.'
    },
    { 
      id: 2, 
      title: 'Gladiator', 
      img: '/pelis/accion/gladiator.jpeg',
      video: '/pelis/accion/gladiator.jpeg',
      genre: 'Acción',
      year: 2000,
      description: 'Un general romano se convierte en gladiador para vengar la muerte de su familia.'
    },
    { 
      id: 3, 
      title: 'John Wick 4', 
      img: '/pelis/accion/john wick.jpeg',
      video: '/pelis/accion/john wick 4.mp4',
      genre: 'Acción',
      year: 2023,
      description: 'John Wick descubre un camino para derrotar a la Alta Mesa, pero deberá enfrentar nuevos enemigos.'
    },
    { 
      id: 4, 
      title: 'Mad Max', 
      img: '/pelis/accion/mad max.jpeg',
      video: '/pelis/accion/mad max.mp4',
      genre: 'Acción',
      year: 2015,
      description: 'En un mundo postapocalíptico, Max se une a Furiosa para escapar de un tirano.'
    },
    { 
      id: 5, 
      title: 'The Dark Knight', 
      img: '/pelis/accion/the dark knight.jpeg',
      video: '/pelis/accion/the dark knight.mp4',
      genre: 'Acción',
      year: 2008,
      description: 'Batman se enfrenta al Joker, que quiere sumir a Ciudad Gótica en la anarquía.'
    }
  ],
  cienciaFiccion: [
    { 
      id: 1, 
      title: 'Avatar', 
      img: '/pelis/ciencia ficcion/avatar.jpeg',
      video: '/pelis/ciencia ficcion/avatar.mp4',
      genre: 'Ciencia Ficción',
      year: 2009,
      description: 'Un marine es enviado a Pandora en una misión única, pero cambia de bando.'
    },
    { 
      id: 2, 
      title: 'Inception', 
      img: '/pelis/ciencia ficcion/inception.jpeg',
      video: '/pelis/ciencia ficcion/inception.mp4',
      genre: 'Ciencia Ficción',
      year: 2010,
      description: 'Un ladrón que roba secretos corporativos mediante tecnología de sueños.'
    },
    { 
      id: 3, 
      title: 'Interstellar', 
      img: '/pelis/ciencia ficcion/interstelar.jpeg',
      video: '/pelis/ciencia ficcion/interstelar.mp4',
      genre: 'Ciencia Ficción',
      year: 2014,
      description: 'Un grupo de exploradores viaja a través de un agujero de gusano en el espacio.'
    },
    { 
      id: 4, 
      title: 'Ready Player One', 
      img: '/pelis/ciencia ficcion/ready player one.jpeg',
      video: '/pelis/ciencia ficcion/ready one player.mp4',
      genre: 'Ciencia Ficción',
      year: 2018,
      description: 'Un joven se embarca en una búsqueda dentro de un mundo virtual lleno de desafíos.'
    },
    { 
      id: 5, 
      title: 'The Matrix', 
      img: '/pelis/ciencia ficcion/the matrix.jpeg',
      video: '/pelis/ciencia ficcion/the matrix.mp4',
      genre: 'Ciencia Ficción',
      year: 1999,
      description: 'Un hacker descubre la verdad sobre la realidad y su papel en la guerra contra sus controladores.'
    }
  ],
  comedia: [
    { 
      id: 1, 
      title: 'Jumanji', 
      img: '/pelis/comedia/jumanji.jpeg',
      video: '/pelis/comedia/jumanji.mp4',
      genre: 'Comedia',
      year: 2017,
      description: 'Cuatro adolescentes son absorbidos por un videojuego donde juegan como sus avatares.'
    },
    { 
      id: 2, 
      title: 'Murder Mystery', 
      img: '/pelis/comedia/murder mistery.jpeg',
      video: '/pelis/comedia/murder mistery.mp4',
      genre: 'Comedia',
      year: 2019,
      description: 'Una pareja se ve envuelta en un asesinato durante unas vacaciones en Europa.'
    },
    { 
      id: 3, 
      title: 'Superbad', 
      img: '/pelis/comedia/superbad.jpeg',
      video: '/pelis/comedia/superbad.mp4',
      genre: 'Comedia',
      year: 2007,
      description: 'Dos amigos de secundaria intentan comprar alcohol para una fiesta para impresionar a sus compañeros.'
    },
    { 
      id: 4, 
      title: 'The Hangover', 
      img: '/pelis/comedia/the hangover.jpeg',
      video: '/pelis/comedia/the hangover.mp4',
      genre: 'Comedia',
      year: 2009,
      description: 'Tres amigos despiertan después de una fiesta de despedida de soltero sin recordar nada.'
    },
    { 
      id: 5, 
      title: 'We\'re the Millers', 
      img: '/pelis/comedia/were the millers.jpeg',
      video: '/pelis/comedia/were the millers.mp4',
      genre: 'Comedia',
      year: 2013,
      description: 'Un traficante de marihuana crea una familia falsa para cruzar la frontera con drogas.'
    }
  ],
  romance: [
    { 
      id: 1, 
      title: 'A Walk to Remember', 
      img: '/pelis/romance/a walk to remember.jpeg',
      video: '/pelis/romance/a walk to remember.mp4',
      genre: 'Romance',
      year: 2002,
      description: 'Un joven rebelde se enamora de una chica con una grave enfermedad.'
    },
    { 
      id: 2, 
      title: 'Me Before You', 
      img: '/pelis/romance/me before you.jpeg',
      video: '/pelis/romance/me before you.mp4',
      genre: 'Romance',
      year: 2016,
      description: 'Una joven alegre se convierte en cuidadora de un hombre paralizado y nace el amor.'
    },
    { 
      id: 3, 
      title: 'The Notebook', 
      img: '/pelis/romance/the notebook.jpeg',
      video: '/pelis/romance/the notebook.mp4',
      genre: 'Romance',
      year: 2004,
      description: 'Un anciano lee a una mujer con Alzheimer la historia de amor de su juventud.'
    },
    { 
      id: 4, 
      title: 'To All the Boys I\'ve Loved Before', 
      img: '/pelis/romance/to all the boys.jpeg',
      video: '/pelis/romance/to all the boys.mp4',
      genre: 'Romance',
      year: 2018,
      description: 'Las cartas de amor secretas de una adolescente son enviadas a sus antiguos enamorados.'
    },
    { 
      id: 5, 
      title: 'Your Place or Mine', 
      img: '/pelis/romance/your place or mine.jpeg',
      video: '/pelis/romance/your place or mine.mp4',
      genre: 'Romance',
      year: 2023,
      description: 'Dos mejores amigos intercambian casas durante una semana y descubren nuevas verdades.'
    }
  ],
  terror: [
    { 
      id: 1, 
      title: 'A Quiet Place', 
      img: '/pelis/terror/a quiet place.jpg',
      video: '/pelis/terror/a quiet place.mp4',
      genre: 'Terror',
      year: 2018,
      description: 'Una familia debe vivir en silencio para evitar ser atacada por criaturas que cazan por el sonido.'
    },
    { 
      id: 2, 
      title: 'Bird Box', 
      img: '/pelis/terror/bird box.jpeg',
      video: '/pelis/terror/bird box.mp4',
      genre: 'Terror',
      year: 2018,
      description: 'Una madre y sus hijos deben atravesar un bosque con los ojos vendados para sobrevivir.'
    },
    { 
      id: 3, 
      title: 'Get Out', 
      img: '/pelis/terror/get out.jpeg',
      video: '/pelis/terror/get out.mp4',
      genre: 'Terror',
      year: 2017,
      description: 'Un joven afroamericano visita a la familia de su novia y descubre un oscuro secreto.'
    },
    { 
      id: 4, 
      title: 'Hereditary', 
      img: '/pelis/terror/hereditary.jpg',
      video: '/pelis/terror/hereditary.mp4',
      genre: 'Terror',
      year: 2018,
      description: 'Una familia desentraña secretos aterradores tras la muerte de la matriarca.'
    },
    { 
      id: 5, 
      title: 'The Conjuring', 
      img: '/pelis/terror/the conjuring.jpeg',
      video: '/pelis/terror/the conjuring.mp4',
      genre: 'Terror',
      year: 2013,
      description: 'Paranormalistas investigan una casa embrujada donde ocurren eventos sobrenaturales.'
    }
  ]
};


const MovieCard = ({ movie, navigate }) => {
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

  return (
    <div 
      className="relative min-w-[200px] h-[300px] rounded-md overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/watch/${movie.genre.toLowerCase().replace(' ', '-')}/${movie.id}`)}
    >
      {!isHovered ? (
        <div className="absolute inset-0">
          <img 
            src={movie.img} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <h3 className="text-white font-bold">{movie.title}</h3>
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <span>{movie.year}</span>
              <span className="mx-2">•</span>
              <span>{movie.genre}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={movie.video}
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

const Section = ({ title, items, navigate }) => (
  <div className="mb-8">
    <h2 className="text-white text-xl md:text-2xl font-bold mb-4 pl-4">{title}</h2>
    <div className="flex space-x-4 overflow-x-auto pb-4 pl-4 scrollbar-hide">
      {items.map((movie) => (
        <MovieCard key={`${title}-${movie.id}`} movie={movie} navigate={navigate} />
      ))}
    </div>
  </div>
);

const BrowsePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <main className="bg-black pt-24 pb-10 min-h-screen">
        <Section title="Acción" items={movies.accion} navigate={navigate} />
        <Section title="Ciencia Ficción" items={movies.cienciaFiccion} navigate={navigate} />
        <Section title="Comedia" items={movies.comedia} navigate={navigate} />
        <Section title="Terror" items={movies.terror} navigate={navigate} />
        <Section title="Romance" items={movies.romance} navigate={navigate} />
      </main>
    </Layout>
  );
};

export default BrowsePage;