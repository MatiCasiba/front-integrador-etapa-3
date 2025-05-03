import React, { useContext } from 'react'
import CarritoContext from '../contexts/CarritoContex'
import './ItemCarrito.scss'

const ItemCarrito = ({producto}) => {

    const {eliminarProductoDelCarritoContext} = useContext(CarritoContext)

    const handleEliminar = (id) => {
        console.log('Eliminando el producto...', id)
        eliminarProductoDelCarritoContext(id)
    }

  return (
    <tr className='tabla-items'>
        <td className='tabla-items__item'>
            <img className='tabla-items__foto-prod' src={producto.foto} alt={producto.nombre} />
        </td>
        <td className='tabla-items__item'>{producto.nombre}</td>
        <td className='tabla-items__item'>{producto.cantidad}</td>
        <td className='tabla-items__item'>US$ {producto.precio}</td>
        <td className='tabla-items__item'>
            <button className='tabla-items__item-boton' onClick={() => handleEliminar(producto.id)}>Eliminar</button>
        </td>
    </tr>
  )
}

export default ItemCarrito