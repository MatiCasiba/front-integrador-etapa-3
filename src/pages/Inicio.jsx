import './Inicio.scss'
import Card from "../components/Card"
import { useContext, useEffect, useState } from 'react'
import ProductosContext from '../contexts/ProductosContext'
import useTitulo from '../hooks/useTitulo'
import Slider from '../components/Slider'
import Spinner from '../components/Spinner'

const Inicio = () => {

  const {productos} = useContext(ProductosContext)
  useTitulo('Inicio')

  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (productos && productos.length > 0) {
      setTimeout(() => setCargando(false), 1000); // Simula una carga de 1 segundo
    }
  }, [productos]);

  return (
    <>
      {cargando ? (
        <Spinner />
      ) : (
        <main>
          <Slider />
          <section className="section-cards">
            <header className="section-cards__header">
              <h1>Nuestros productos:</h1>
              <p>Mapex - DW - Zildjian - Evans</p>
            </header>
          </section> 

          <section className="cards-container" id="container-productos">
            {productos && productos.map((producto) => (
              <Card producto={producto} key={producto.id} />
            ))}
          </section>
        </main>
      )}
    </>
  )
}

export default Inicio