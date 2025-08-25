* Nombre: Matias Casiba
* Link github repo: https://github.com/MatiCasiba/front-integrador-etapa-3
* Link Netlify: https://drumstore-integrador-etapa-3.netlify.app/

# Integrador etapa 3
Ahora en la etapa 3 voy a contectar el front con el back para esta última etapa, el repo del back complementar: https://github.com/MatiCasiba/inte-etapa-3


## DragDrop.jsx
Lo nuevo de esta etapa es que se le agregó un nuevo componente, DragDrop.jsx, con la finalidad de que ahora el usuario pueda subir imágenes que tenga en su escritorio y no use más las imágenes que tenga guardada en la carpeta public. El usuario arrastrará el archivo hasta este campo y se subirá la imágen al formulario, al inicio y a mi back con los datos agregados

```js

import { peticionesHttp } from '../../helpers/peticiones-http';
import './DragDrop.scss';

const DragDrop = ({ setFoto, srcImagenBack, setSrcImagenBack }) => {

  //! Cancelando comportamiento por defecto del navegador
  const arrayEventosDragDrop = ['dragenter', 'dragleave', 'dragover', 'drop']

  arrayEventosDragDrop.forEach(eventName => {
    //console.log(eventName)
    document.body.addEventListener(eventName, e => e.preventDefault())
  })

  const handleDrop = (e) => {
    //console.log(e);
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleChange = (e) => {
    // console.log(e)
    const files = e.target.files
    // console.log(files)
    handleFiles(files)
  }

  const handleFiles = async (files) => {
    //console.log('Recibi los files', files)
    const file = files[0]
    await uploadFile(file)
    previewFile(file)
  }

  const uploadFile = async (file) => {
    console.log('llego a upload', file);
    const url = import.meta.env.VITE_BACKEND_UPLOAD

    try {
      const formData = new FormData()
      formData.append('imagen', file)
      const options = {
        method: 'POST',
        body: formData
      }

      const imagenUp = await peticionesHttp(url, options)

      console.log(imagenUp)
      setFoto(imagenUp) // {foto: ''}

    } catch (error) {
      console.error('[uploadFile]:', error)
    }

  }

  const previewFile = (file) => {
    console.log('llego a preview', file);

    // API READER -> window -> BOM
    const reader = new FileReader()
    reader.readAsDataURL(file) // a parti del archivo binario, creo una url para que se pueda previsualizar

    //* espero hasta que el archivo haya sido leido completamnete
    reader.addEventListener('loadend', () => {
      setSrcImagenBack(reader.result)
    })
  }

  return (
    <div className='drop-area' onDrop={handleDrop}>
      <p>
        Subir imagen 
      </p>
      <input type="file" id="lbl-foto" accept="image/*" onChange={handleChange} />
      <label className="drop-area-button" htmlFor="lbl-foto">
        File Dialog
      </label>
      <div className='drop-area-image'>
        <img src={srcImagenBack} alt="" />
      </div>
    </div>
  )
}

export default DragDrop
```

### Estilizando el nuevo componente
Se enucentra en las carpetas /components/como-alta/ el archivo scss para la estilización del DragDrop.jsx, este archivo se llama DragDrop.scss:

```sh
.drop-area {
    border: 2px solid #eb5e28;
    box-shadow: 0 0 15px 3px #eb5e28;
    border-radius: 20px;
    width: 300px;
    margin: 25px 0;
    padding: 20px;
    & p {
        margin-bottom: 30px;
        text-align: center;
        letter-spacing: 3px;
        font-weight: 800;
    }
    &-button {
        display: inline-block;
        padding: 10px;
        background: #eb5e28;
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid #403d39;
        font-weight: 600;
        
    }
    & #lbl-foto {
        display: none;
    }
    &-image img {
        width: 250px;
        margin-top: 10px;
        margin-right: 10px;
        vertical-align: middle;
    }

    @media screen and (min-width: 1200px) { # cuando la pantalla sea mayor o igual a 1200px
        # aumento el tamaño de letra y el botón tendrá una sombra cuando el usuario se pare sobre el botón de File Dialog
        & p{
            font-size: 1.2rem;
        }
        &-button{
            font-size: 1.2rem;
        }
        &-button:hover{
            box-shadow: 0 0 10px 3px #252422;
        }
    }
}
```
Le agregué color al borde del rtecuadro, al igual que una sombra de color naranja, para que de un aspecto de iluminación

## Imagen del placeholder
Estaba surgiendo un problema con la imagen del placeholder dentro del DragDrop, cuando la página se lanzaba en línea la imagen desaparece, entonces como esta imagen está subida al repo del git, agarré la dirección de esa imagen y se la coloqué en el placeHolder que se encuentra en el componente Formulario.jsx
```js
const placeHolderImage = 'https://raw.githubusercontent.com/MatiCasiba/inte-etapa-3/refs/heads/main/public/uploads/elementor-placeholder-image-1.webp'
```

## SearchContext

Voy a crear un nuevo contexto para la barra buscadora de la página, esto con el fin de que cuando el usuario escriba lo que quiere, en la página se va filtrando los productos relacionado con su búsqueda.

```js
import { createContext, useState } from "react"

const SearchContext = createContext();

 export const SearchProvider = ({children}) => {

  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
```
* Creo un SearchContext para manejar el estado globbal de búsqueda (searchTerm).
* Con setSearchTerm lo acutalizo desde el SearchBar
* Desde Inicio (donde se renderizan los productos) puede leer ese valor y filtrar la lista

### SearchProvider
Ahora voy a importar el SearchContext en main.jsx, esto para dar uso del SearchProvider:
```js
import { SearchProvider } from './contexts/SearchContext.jsx' // lo importo

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <ProductosProvider>
        <SearchProvider> /* agrego el provider */
          <App />
        </SearchProvider>
      </ProductosProvider>
    </CarritoProvider>

  </StrictMode>,
)

```

### Doy uso al SearchContext
Hago un ajuste dentro del SearchBar.jsx con la finalidad de usar SearchContext, para que el texto que escruba el usuario, se guarde en el contexto y lo puedan leer otros componentes.
```js
import { Link } from 'react-router'
import './SearchBar.scss'
import { useContext } from 'react'
import CarritoContext from '../contexts/CarritoContex'
import SearchContext  from '../contexts/SearchContext' //imporot el SearchContext

const SearchBar = () => {

    const { contarProductosCarritoContext } = useContext(CarritoContext)
    const { searchTerm, setSearchTerm } = useContext(SearchContext) //uso el contexto del buscador

    //manejo el cambio en el input
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //lo hago para poder redirigir a otra ruta, por ahora soloe vita recargar
    }

    return (
        <>
            <div className="search-bar">
                <div className="search-bar__logo-container">
                    <img className="search-bar__logo-img" src="/logo/ds-logo-sf.png" alt="logo ds" />
                </div>

                <form onSubmit={handleSubmit} className="search-bar__form-container">
                    <label htmlFor="busqueda" className="search-bar__form-label">
                        <img className="search-bar__logo-search" src="/logo/logo-search.png" alt="logo del buscador" />
                    </label>
                    <input type="search" id="busqueda" className="search-bar__form-search" value={searchTerm} onChange={handleChange} /> // atado al estado global
                    <button type="submit" className="search-bar__form-submit">Buscar</button>
                </form>

                <div className="search-bar__carrito-container">
                    <Link to="/carrito" className='search-bar__cart-link'>
                    
                        <img className="search-bar__cart-logo" src="/logo/cart-logo.png" alt="logo de carro" />
                        {contarProductosCarritoContext > 0 && (
                            <span className='search-bar__cart-count'>{contarProductosCarritoContext}</span>
                        )}
                    
                    </Link>
                </div>

                <div className="menu-toogle">
                    <label htmlFor="menu" className="menu-toogle__label">
                        <span className="menu-toogle__top-bread"></span>
                        <span className="menu-toogle__meat"></span>
                        <span className="menu-toogle__bottom-bread"></span>
                    </label>
                </div>
            </div>
        </>
    )
}

export default SearchBar
```

## Uso del searchTerm en Inicio.jsx
Dentro de Inicio.jsx voy a aplicar searchTerm para que solo muestre lo que el usuario escribe en la barra. Voy a importar el SearchContext dentro de este:
```js
import './Inicio.scss'
import Card from "../components/Card"
import { useContext, useEffect, useState } from 'react'
import ProductosContext from '../contexts/ProductosContext'
import SearchContext from '../contexts/SearchContext'
import useTitulo from '../hooks/useTitulo'
import Slider from '../components/Slider'
import Spinner from '../components/Spinner'

const Inicio = () => {

  const {productos} = useContext(ProductosContext)
  useTitulo('Inicio')

  const {searchTerm} = useContext(SearchContext) // importo el searchTerm

  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    ...
  }, [productos]);

  // Filtro productos según lo que escriba el usuario
  const productosFiltrados = productos.filter((producto) => 
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {cargando ? (
        <Spinner />
      ) : (
        <main>
          <Slider />
          <section className="section-cards">
            ...
          </section> 

          <section className="cards-container" id="container-productos">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <Card producto={producto} key={producto.id} />
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </section>
        </main>
      )}
    </>
  )
}

export default Inicio
```
Entonces cuando el usuario escriba en el SearchBar, se va a actualizar el searchTerm del contexto, Inicio.jsx toma ese valor y filtra los productos. Si este no encuentra nada, se mostrará el mensaje "No se encontraron productos"

### NOTA
Cuando queria implementar esto, me saltaba un error y no me cargaba la página, al hacer uso del filter. El error era Uncaught TypeError: Cannot read properties of null (reading 'filter') at Inicio (Inicio.jsx:23:40). Para solucionarlo tuve que hacer un pequeño ajuste dentro de ProductosContext.jsx:
```js
const [productos, setProductos] = useState([]) // antes estaba en null, ahora lo cambio por un array vacio, si comenzaba con null, no podía hacer .filter
```
Entonces al hacer este cambio, me evito de tener que validar siempre, porque otra cosa que podía hacer era ajustarlo en const productosFiltrados de Inicio.jsx:
```js
const productosFiltrados = (productos ?? []).filter((producto) => 
  producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
)
```

## Ajuste del buscador
Ahora la página filtra la busqueda del usuario por nombre, marca y categoría. Si bien antes cuando el usuario cuando escribía en la barra, se filtraba pocos productos respecto a su busqueda, ahora con este filtro, muestra más productos seleccionados:
```js
//Inicio.jsx

const productosFiltrados = productos.filter((producto) => {
    const term = searchTerm.toLowerCase();
    return (
      producto.nombre?.toLowerCase().includes(term) ||
      producto.categoria?.toLowerCase().includes(term) ||
      producto.marca?.toLowerCase().includes(term)
    );
  });
```
El || hace que coincida si alguna de las tres condiciones es verdadera.