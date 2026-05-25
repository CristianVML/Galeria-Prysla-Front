import styles from './page.module.scss'

export default function ContactoPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.subtitle}>
          Si tienes preguntas o deseas más información, no dudes en escribirnos.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Correo electrónico</h2>
            <a href="mailto:granadosvasquezcristian@gmail.com">granadosvasquezcristian@gmail.com</a>
          </div>
          <div className={styles.card}>
            <h2>Redes sociales</h2>
            <p>Síguenos en Instagram y Facebook como @GaleriaPrysla</p>
          </div>
          <div className={styles.card}>
            <h2>Ubicación</h2>
            <p>Bogotá, Colombia</p>
          </div>
        </div>
      </div>
    </div>
  )
}
