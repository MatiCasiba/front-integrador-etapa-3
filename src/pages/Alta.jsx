import Formulario from "../components/como-alta/Formulario"
import Tabla from "../components/como-alta/Tabla"
import useTitulo from "../hooks/useTitulo"

const Alta = () => {

  useTitulo('Alta')

  return (
    <>
      <Formulario />
      <Tabla />
    </>
  )
}

export default Alta