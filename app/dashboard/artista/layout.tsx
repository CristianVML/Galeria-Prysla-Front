import Link from 'next/link'
import styles from './layout.module.scss'

export default function ArtistDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link href="/dashboard/artista" className={styles.navLink}>
            Mis obras
          </Link>
          <Link href="/dashboard/artista/subir" className={styles.navLink}>
            Publicar obra
          </Link>
          <Link href="/perfil" className={styles.navLink}>
            Editar perfil
          </Link>
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
