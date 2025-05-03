import { useContext } from 'react'
import './Card.scss'
import CarritoContext from '../contexts/CarritoContex'
import { useNavigate } from 'react-router'

const Card = ({producto}) => {

    const {agregarProductoAlCarritoContext} = useContext(CarritoContext)
    const navigate = useNavigate()

    const handleAgregar = (producto) => {
        agregarProductoAlCarritoContext(producto)
    }

    const handleVerMas = (id) => {
        navigate(`/alta/detalle/${id}`)
    }

    return (
        <>
            <div className="card">
                <article className="card__article">
                    <div className="card__image-container">
                        <img className="card__image" src={producto.foto} alt={producto.nombre} />
                    </div>
                    <div className="card__content">
                        <h2 className="card__heading">{producto.nombre}</h2>
                        <p className='card__precios'><b>US$ {producto.precio}</b></p>
                        <div className="card__description">
                            <div className="card__botones-acciones">
                                <button
                                    className="card__boton"
                                    onClick={()=>handleAgregar(producto)}
                                >
                                    COMPRAR
                                </button>
                                <button 
                                    className='card__boton'
                                    onClick={() => handleVerMas(producto.id)}
                                >
                                    VER MAS
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </article>
            </div>
        </>
    )
}

export default Card