import useTitulo from "../hooks/useTitulo";
import "./Contacto.scss";

const Contacto = () => {
  useTitulo("Contacto");

  return (
    <>
      <main>
        <div className="formulario">
          <form action="#" method="post">
            <div className="formulario__contenedor-datos">
              <h1 className="formulario__titulo">Contáctanos</h1>
              <div className="formulario__datos">
                <label className="formulario__labels" htmlFor="nombre">Nombre *</label>
                <input type="text" id="nombre" className="formulario__entrada-datos" />
              </div>
              <div className="formulario__datos">
                <label className="formulario__labels" htmlFor="apellido">Apellido *</label>
                <input type="text" id="apellido" className="formulario__entrada-datos" />
              </div>
              <div className="formulario__datos">
                <label className="formulario__labels" htmlFor="email">Email *</label>
                <input type="email" id="email" className="formulario__entrada-datos" />
              </div>
              <div className="formulario__datos">
                <label className="formulario__labels" htmlFor="mensaje">Escríbenos un mensaje:</label>
                <textarea id="mensaje" className="formulario__entrada-datos"></textarea>
              </div>
              <div className="formulario__datos">
                <button className="formulario__boton" type="submit">Enviar</button>
              </div>
            </div>

            <div className="formulario__contenedor-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26272.95191432217!2d-58.40476192424162!3d-34.60115252873014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sTeatro%20Col%C3%B3n!5e0!3m2!1ses-419!2sar!4v1738586641675!5m2!1ses-419!2sar"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Contacto;
