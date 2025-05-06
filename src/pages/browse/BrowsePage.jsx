import React from 'react'
import Layout from '../../Layout/Layout'


const movies = {
  accion: [
    { id: 1, title: 'Misión Imposible', img: 'https://via.placeholder.com/150x220?text=Acción+1' },
    { id: 2, title: 'John Wick', img: 'https://via.placeholder.com/150x220?text=Acción+2' },
    { id: 3, title: 'Rápidos y Furiosos', img: 'https://via.placeholder.com/150x220?text=Acción+3' },
  ],
  comedia: [
    { id: 1, title: 'Ted', img: 'https://via.placeholder.com/150x220?text=Comedia+1' },
    { id: 2, title: 'Supercool', img: 'https://via.placeholder.com/150x220?text=Comedia+2' },
    { id: 3, title: 'Scary Movie', img: 'https://via.placeholder.com/150x220?text=Comedia+3' },
  ],
  terror: [
    { id: 1, title: 'El Conjuro', img: 'https://via.placeholder.com/150x220?text=Terror+1' },
    { id: 2, title: 'It', img: 'https://via.placeholder.com/150x220?text=Terror+2' },
    { id: 3, title: 'Actividad Paranormal', img: 'https://via.placeholder.com/150x220?text=Terror+3' },
  ],
  cienciaFiccion: [
    { id: 1, title: 'Interestelar', img: 'https://via.placeholder.com/150x220?text=Ficción+1' },
    { id: 2, title: 'Matrix', img: 'https://via.placeholder.com/150x220?text=Ficción+2' },
    { id: 3, title: 'Avatar', img: 'https://via.placeholder.com/150x220?text=Ficción+3' },
  ],
}

const Section = ({ title, items }) => (
  <div className="mb-10">
    <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
    <div className="flex space-x-4 overflow-x-auto">
      {items.map((movie) => (
        <div key={movie.id} className="min-w-[150px]">
          <img
            src={movie.img}
            alt={movie.title}
            className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
          <p className="text-sm text-center mt-2 text-zinc-300">{movie.title}</p>
        </div>
      ))}
    </div>
  </div>
)

const BrowsePage = () => {
  return (
    <>
    <Layout>

    <main className="bg-black pt-24 px-6 min-h-screen">
        <Section title="Acción" items={movies.accion} />
        <Section title="Comedia" items={movies.comedia} />
        <Section title="Terror" items={movies.terror} />
        <Section title="Ciencia Ficción" items={movies.cienciaFiccion} />
        <Section title="Romance" items={movies.cienciaFiccion} />
      </main>
    </Layout>
    </>
  )
}

export default BrowsePage
