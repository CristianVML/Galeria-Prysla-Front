import styles from './page.module.scss'

export default function TerminosPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Términos y Condiciones</h1>
        <p className={styles.date}>Última actualización: mayo 2026</p>

        <section className={styles.section}>
          <h2>1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar la plataforma de Galería Prysla, aceptas cumplir
            con estos términos y condiciones. Si no estás de acuerdo, no debes usar
            nuestros servicios.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Registro de artistas</h2>
          <p>
            Para publicar obras en la galería, los artistas deben registrarse
            proporcionando información veraz. La galería se reserva el derecho de
            aprobar o rechazar cualquier registro y obra publicada.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Propiedad intelectual</h2>
          <p>
            Los artistas mantienen la titularidad de los derechos de autor de sus
            obras. Al publicar en Galería Prysla, conceden una licencia para la
            exhibición en la plataforma. El uso no autorizado de las obras está
            prohibido.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Uso de la plataforma</h2>
          <p>
            Los usuarios se comprometen a utilizar la plataforma de forma ética y
            legal. Está prohibido publicar contenido ofensivo, discriminatorio o
            que infrinja derechos de terceros.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Modificaciones</h2>
          <p>
            Galería Prysla se reserva el derecho de modificar estos términos en
            cualquier momento. Los cambios serán notificados a través de la
            plataforma.
          </p>
        </section>
      </div>
    </div>
  )
}
