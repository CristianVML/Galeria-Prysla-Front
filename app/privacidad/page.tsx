import styles from './page.module.scss'

export default function PrivacidadPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Política de Privacidad</h1>
        <p className={styles.date}>Última actualización: mayo 2026</p>

        <section className={styles.section}>
          <h2>1. Información que recopilamos</h2>
          <p>
            Recopilamos la información que nos proporcionas al registrarte: nombre,
            correo electrónico, ciudad, número de WhatsApp y biografía. También
            recopilamos datos de navegación como páginas visitadas y tiempo de
            interacción.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Uso de la información</h2>
          <p>
            Tus datos se utilizan para gestionar tu cuenta, publicar tus obras,
            comunicarnos contigo y mejorar la plataforma. No compartimos tu
            información personal con terceros sin tu consentimiento.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Protección de datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger tu información contra accesos no autorizados, pérdida o
            alteración.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Tus derechos</h2>
          <p>
            Puedes solicitar la modificación o eliminación de tus datos personales
            en cualquier momento escribiéndonos. También puedes darte de baja del
            boletín informativo cuando lo desees.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Cookies</h2>
          <p>
            Utilizamos cookies esenciales para el funcionamiento de la plataforma.
            No usamos cookies de rastreo de terceros con fines publicitarios.
          </p>
        </section>
      </div>
    </div>
  )
}
