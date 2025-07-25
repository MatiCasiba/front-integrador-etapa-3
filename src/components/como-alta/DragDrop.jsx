
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