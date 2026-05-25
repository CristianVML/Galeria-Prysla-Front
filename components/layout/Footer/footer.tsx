import styles from './Footer.module.scss'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <span className={styles.brand}>PRYSLA</span>
        </div>
        <div className={styles.col}>
          <p className={styles.copy}>
            &copy; 2026 Realizado por Cryslap
          </p>
        </div>
        <div className={styles.col}>
          <nav className={styles.links}>
            <Link href="/terminos" className={styles.link}>Términos</Link>
            <Link href="/privacidad" className={styles.link}>Privacidad</Link>
            <Link href="/contacto" className={styles.link}>Contacto</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
