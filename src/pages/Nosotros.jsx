import useTitulo from "../hooks/useTitulo"
import './Nosotros.scss'

const Nosotros = () => {

  useTitulo('Nosotros')

  return (
    <>
      <main>
        <div className="info">
            <h1 className="info__titulo">Sobre nosotros</h1>
            <p className="info__textos">Hemos estado atendiendo a bateristas desde 1987 en el corazón de Amberes; Drumstore no necesita presentación. En estas páginas encontrarás un resumen de los productos y servicios que ofrecemos.</p>
            <p className="info__textos">Además de las numerosas marcas con las que trabajamos, también puedes contactarnos para reparaciones de baterías, backline y alquileres.</p>
            <img className="info__image-drummers" src="../../../drumers/drumer.webp" alt="imagen de baterista" />
            <p className="info__textos">Si quieres deshacerte de esa batería vieja que tienes en el ático, simplemente contáctanos.</p>
            <img className="info__image-drummers" src="../../../drumers/jen-ledger.webp" alt="imagen de baterista" />
            <p className="info__textos">Sabemos que comprar un instrumento de percusión requiere un ambiente tranquilo, donde no sea un vendedor quien hable, sino el propio instrumento. Por ello, hemos decidido trasladar nuestra tienda a un lugar tranquilo fuera de la ciudad, donde solo atendemos con cita previa. Conversamos sobre lo que buscas, preparamos un set para que compares distintos productos, te asesoramos cuando es necesario, etc.</p>
            <img className="info__image-drummers" src="../../../drumers/people-mapex.webp" alt="imagen de baterista" />
            <p className="info__textos">En un mundo de automatización, centros de llamadas y generalización, hemos elegido un enfoque completamente personalizado para nuestros clientes.</p>
            <p className="info__textos">Ofrecemos soporte técnico profesional para baterías, tanto en escenarios como en estudios de grabación. Alquilamos baterías, platillos y una amplia variedad de instrumentos de percusión para conciertos y estudios.</p>
            <img className="info__image-drummers" src="../../../drumers/jay-weinberg.webp" alt="imagen de baterista" />
            <p className="info__textos">Los productos profesionales y exclusivos para bateristas son nuestra pasión. Envíanos tu rider y te daremos nuestra mejor oferta.</p>
        </div>
      </main>
    </>
  )
}

export default Nosotros