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




