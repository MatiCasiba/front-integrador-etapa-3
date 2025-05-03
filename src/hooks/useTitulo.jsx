import { useEffect } from "react"

const useTitulo = (textoTitutlo = 'Sin título') => {
  useEffect(()=> {
    document.title = `Drumstore - ${textoTitutlo}`
  }, [])
}

export default useTitulo