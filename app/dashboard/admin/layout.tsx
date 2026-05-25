import Link from 'next/link'
import styles from './layout.module.scss'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link href="/dashboard/admin" className={styles.navLink}>
            Resumen
          </Link>
          <Link href="/dashboard/admin/revisiones" className={styles.navLink}>
            Revisiones
          </Link>
          <Link href="/dashboard/admin/artistas" className={styles.navLink}>
            Artistas
          </Link>
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
