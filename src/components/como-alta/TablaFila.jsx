import { useContext } from "react"
import ProductosContext from "../../contexts/ProductosContext"
import Swal from "sweetalert2"
import './TablaFila.scss'
import { useNavigate } from "react-router"


const TablaFila = ({producto}) => {

  const {eliminarProductoContex, setProductoAEditar} = useContext(ProductosContext)
  const navigate = useNavigate() // me devuelve una referencia de una función

  const imagenXDefecto = '/logo/drum-icon.png'

  const handleEliminar = (id)=> {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás volver atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProductoContex(id)
        Swal.fire({
          title: "Deleted!",
          text: "Se eliminó tu el producto.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "No lo borraste!",
          text: "El producto no se borro",
          icon: "info"
        });
      }
    });

  }

  const handleEditar = (producto) => {
    setProductoAEditar(producto)
  }

  const handleVer = (id) => {
    navigate(`/alta/detalle/${id}`)
  }

  return (
    <>
        <tr className="fila">
            <td className="fila__nombre">{producto.nombre}</td>
            <td>
                <img src={producto.foto ? producto.foto : imagenXDefecto} 
                    alt={producto.foto}
                    onError={(e) => e.target.src = imagenXDefecto} 
                />
            </td>
            <td className="fila__precio">{producto.precio}</td>
            <td>{producto.stock}</td>
            <td className="fila__marca">{producto.marca}</td>
            <td>{producto.categoria}</td>
            <td className="fila__descripcion" >...</td>
            <td className="fila__envio">{producto.envio ? 'si' : 'no' }</td>
            <td className="fila__botones">
                <button className="fila__botonaccion" onClick={() => handleVer(producto.id)}>Ver</button>
                <button className="fila__botonaccion" onClick={()=>handleEditar(producto)}>Editar</button>
                <button className="fila__botonaccion" onClick={()=>handleEliminar(producto.id)}>Borrar</button>
            </td>
        </tr>
    </>
  )
}

export default TablaFila