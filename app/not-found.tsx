import Link from 'next/link'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.desc}>
        La obra que buscas no está disponible o la dirección es incorrecta.
      </p>
      <Link href="/galeria" className={styles.link}>
        Explorar galería
      </Link>
    </div>
  )
}
