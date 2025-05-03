import { useContext } from "react"
import ListadoCarrito from "../components/ListadoCarrito"
import useTitulo from "../hooks/useTitulo"
import './Carrito.scss'
import CarritoContext from "../contexts/CarritoContex"

const Carrito = () => {

  useTitulo('Compras')
  
  const {contarProductosCarritoContext} = useContext(CarritoContext)

  return (
    <>
      <div className="contenedor-compra">
        <h1>Mis compras</h1>
        <p className="contenedor-compra__total-prod">Total Productos: {contarProductosCarritoContext}</p>
        <ListadoCarrito />
      </div>

    </>
  )
}

export default Carrito