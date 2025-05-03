import { useContext } from "react"
import CarritoContext from "../contexts/CarritoContex"
import ItemCarrito from "./ItemCarrito";
import './ListadoCarrito.scss'

const ListadoCarrito = () => {

    const {
        carrito,
        limpiarCarritoContext,
        guardarCarritoBackendContext,
        calcularTotalCarritoContext } = useContext(CarritoContext)

    console.log("Carrito actual", carrito);

    const handleComprar = () => {
        console.log('Comprando...')
        guardarCarritoBackendContext()
    }

    const handleLimpiarCarrito = () => {
        console.log('Vaciando carrito...')
        limpiarCarritoContext()
    }


    return (
        <>
            <table className='tabla-carrito'>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carrito.length <= 0 ? (
                            <tr>
                                <td colSpan={5}>No hay productos</td>
                            </tr>
                        ) : (
                            carrito.map((producto, idx) => (
                                <ItemCarrito key={idx} producto={producto} />
                            ))
                        )
                    }
                </tbody>
            </table>
            <div className="contenedor-precio">
                <h2 className="contenedor-precio__total-carrito">Total: US$ {calcularTotalCarritoContext.toFixed(2)}</h2>
            </div>
            

            {!carrito.length <= 0 && (
                <div className="acciones-carrito">
                    <button className="acciones-carrito__botones" onClick={handleLimpiarCarrito}>Vaciar</button>
                    <button className="acciones-carrito__botones" onClick={handleComprar}>Comprar</button>
                </div>
            )
            }
            
        </>
    )
}

export default ListadoCarrito