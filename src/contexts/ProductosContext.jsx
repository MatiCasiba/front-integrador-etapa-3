import { useState, useEffect } from "react";
import { createContext } from "react";
import { peticionesHttp } from "../helpers/peticiones-http";


const ProductosContext = createContext()

const ProductosProvider = ({children}) => {

    const url = import.meta.env.VITE_BACKEND_PRODUCTOS
    const [productos, setProductos] = useState(null)
    const [productoAEditar, setProductoAEditar] = useState(null)

    const urlMockapi = 'https://67d47c1dd2c7857431edce6d.mockapi.io/apis/v1/producto/'
    //const urlMockapi = import.meta.env.VITE_BACKEND_PRODUCTOS

    
    useEffect(() => {
      getAllProductos()
    }, [])
    
    const getAllProductos = async () => {
        try {
            const prods = await peticionesHttp(urlMockapi, {})
            setProductos(prods)

        } catch (error) {
            console.error('[getAllProductos]', error)
        }
    }

    const crearProductoContext = async (productoNuevo) => {
        
        try {
            delete productoNuevo.id // borra el atributo/key id del objeto productoNuevo
            // ! peticion post
            const options = {
                method: 'POST',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify(productoNuevo)
            }

            const prods = await peticionesHttp(urlMockapi, options)
            const nuevoEstadoProductos = [...productos, prods]
            setProductos(nuevoEstadoProductos)

        } catch (error) {
            console.error('[crearProductoContext]', error)
        }
    }

    const actualizarProductoContext = async (productoAEditar) => {
        try {
            const options = {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(productoAEditar)
            }
            const urlActualizar = urlMockapi + productoAEditar.id
            const productoEditado = await peticionesHttp(urlActualizar, options)

            const nuevoEstadoProductos = productos.map(prod=>prod.id === productoEditado.id ? productoEditado : prod)

            setProductos(nuevoEstadoProductos)

        } catch (error) {
            console.error('[actualizarProductoContext]', error)
        }
    }

    const eliminarProductoContex = async (id) => {
        try {
            const urlEliminacion = urlMockapi + id
            const options = {
                method: 'DELETE'
                
            }
            const prodEliminado = await peticionesHttp(urlEliminacion, options)
            console.log(prodEliminado);
            const nuevoEstadoProductos = productos.filter(prod => prod.id !== id)
            setProductos(nuevoEstadoProductos)
        } catch (error) {
            console.error('[eliminarProductoContext]', error)
        }
    }

    const data = {
        productos,
        crearProductoContext,
        actualizarProductoContext,
        eliminarProductoContex,
        productoAEditar,
        setProductoAEditar
    }

    return <ProductosContext.Provider value={data}>{children}</ProductosContext.Provider>
}


export {ProductosProvider}
export default ProductosContext