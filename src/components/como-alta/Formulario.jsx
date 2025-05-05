import { useContext, useEffect, useState } from "react"
import ProductosContext from "../../contexts/ProductosContext"
import './Formulario.scss'
import DragDrop from "./DragDrop"

const Formulario = () => {

  const {
    crearProductoContext, 
    productoAEditar, 
    setProductoAEditar, 
    actualizarProductoContext} = useContext(ProductosContext)

  const formInicial = {
    id: null,
    nombre: '',
    foto: '',
    precio: '',
    stock: '',
    marca: '',
    categoria: '',
    descripcion: '',
    envio: false
  }
  
  useEffect(() => {
    productoAEditar ? setForm(productoAEditar) : setForm(formInicial)
  }, [productoAEditar])

  const [form, setForm] = useState(formInicial)

  //! Estados nuevos para la etapa 3 (subir la imagen)
  /* Estados para gestionar el drag and drop */
  const placeHolderImage = 'https://raw.githubusercontent.com/MatiCasiba/inte-etapa-3/refs/heads/main/public/uploads/elementor-placeholder-image-1.webp'
  const [foto, setFoto] = useState(placeHolderImage)
  const [srcImagenBack, setSrcImagenBack] = useState(placeHolderImage)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(form.id === null){
        const productoNuevoConImagen = {...form, foto:srcImagenBack}
        console.log(productoNuevoConImagen);
        crearProductoContext(productoNuevoConImagen)
    } else {
        const productoNuevoConImagen = {...form, foto:srcImagenBack}
        actualizarProductoContext(productoNuevoConImagen)
    }

    handleReset()
  } 

  const handleChange = (e) => {
    const {type, name, checked, value} = e.target

    setForm({
        ...form,
        [name] : type === 'checkbox' ? checked : value
    })
  }

  const handleReset = () => {
    setForm(formInicial)
    setProductoAEditar(null)
    setFoto(placeHolderImage)
    setSrcImagenBack(placeHolderImage)
  }

  return (
    <>
        <div className="formulario-alta">
            <h2 className="formulario-alta__subtitulo">{productoAEditar ? 'Editar' : 'Guardar producto'}</h2>
            <form className="formulario-alta__contenedor-datos" onSubmit={handleSubmit}>
                <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-nombre">Nombre</label>
                    <input
                        type="text"
                        id="lbl-nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div>

                <div>
                    <DragDrop 
                        setFoto={setFoto} 
                        srcImagenBack={srcImagenBack}
                        setSrcImagenBack={setSrcImagenBack} 
                    />
                </div>

                {/* <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-foto">Foto</label>
                    <input
                        type="text"
                        id="lbl-foto"
                        name="foto"
                        value={form.foto}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div> */}

                <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-precio">Precio</label>
                    <input
                        type="text"
                        id="lbl-precio"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div>
                <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-stock">Stock</label>
                    <input
                        type="text"
                        id="lbl-stock"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div>
            
                <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-marca">Marca</label>
                    <input
                        type="text"
                        id="lbl-marca"
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div>
                <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-categoria">Categoría</label>
                    <input
                        type="text"
                        id="lbl-categoria"
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div>
                <div className="formulario-alta__datos-prod">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-descripcion">Descripción</label>
                    <input
                        type="text"
                        id="lbl-descripcion"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="formulario-alta__inputs-datos"
                    />
                </div>
                <div className="formulario-alta__checkbox">
                    <label className="formulario-alta__labels-prod" htmlFor="lbl-envio">Envío</label>
                    <input
                        type="checkbox"
                        id="lbl-envio"
                        name="envio"
                        checked={form.envio}
                        onChange={handleChange}
                        className="formulario-alta__check"
                    />
                </div>
                <div className="formulario-alta__botones">
                    <button className="formulario-alta__boton" type="submit">
                        {productoAEditar ? 'Editar' : 'Guardar'}
                    </button>

                    <button className="formulario-alta__boton" type="reset" onClick={handleReset}>Limpiar</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Formulario