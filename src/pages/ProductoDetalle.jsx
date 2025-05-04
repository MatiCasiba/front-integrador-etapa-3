
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import './ProductoDetalle.scss'

const ProductoDetalle = () => {

  const {id} = useParams()
  
  const [productoDetalle, setProductoDetalle] = useState(null)
  //const urlMockapi = 'https://67d47c1dd2c7857431edce6d.mockapi.io/apis/v1/producto/'
  const url = import.meta.env.VITE_BACKEND_PRODUCTOS

  useEffect(() => {
    getOne(id)
  }, [])

  const getOne = async (id) => {
    const urlGetOne = url + id
    try {
        const res = await fetch(urlGetOne)
        if(!res.ok){
            throw new Error('No se pudo obtener el producto')
        }
        const data = await res.json()
        setProductoDetalle(data)

    } catch (error) {
        console.error(error)
    }
  }
  

  return (
    <div className="producto-detalle">
        <h1 className="producto-detalle__titulo-producto">Acerca del producto</h1>

        {
            productoDetalle ?
                (
                    <div className="producto-detalle__contenedor-prod">
                        
                        <div className="producto-detalle__contenedor-image">
                            <img src={`${productoDetalle.foto}`} alt={productoDetalle.foto} />   
                        </div>

                        <div className="producto-detalle__contenedor-info">
                            <div className="producto-detalle__contenedor-detalle">
                                <h2>{productoDetalle.categoria}</h2>
                                <h3>{productoDetalle.nombre}</h3>
                                <p className="producto-detalle__marca">{productoDetalle.marca}</p>
                            </div>
                            <div className="producto-detalle__contenedor-detalle">
                                <p className="producto-detalle__precio">US$ {productoDetalle.precio}</p>
                                <p className="producto-detalle__descripcion">{productoDetalle.descripcion}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p> CARGANDO...</p>
                )

        }
    </div>
  )
}

export default ProductoDetalle