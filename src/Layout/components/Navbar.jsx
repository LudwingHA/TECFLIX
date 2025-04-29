import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <header>
            <nav>
               <div>
               <h1><Link>Tecflix</Link></h1>
                <ul>
                    <li><Link>Inicio</Link></li>
                    <li><Link>Accion</Link></li>
                    <li><Link>Comedia</Link></li>
                    <li><Link>Terror</Link></li>
                    <li><Link>Ciencia Ficcion</Link></li>
                </ul>
               </div>
               <div>
                <div className='buscador'><span></span></div>
               </div>
            </nav>
        </header>
    </>
  )
}

export default Navbar