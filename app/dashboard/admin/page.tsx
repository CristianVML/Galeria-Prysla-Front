import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') redirect('/login')

  const token = (session.user as any).accessToken

  const res = await fetch(`${API_URL}/dashboard/stats`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  })
  const stats = res.ok ? await res.json() : {
    pending_artworks: 0,
    total_artworks: 0,
    total_artists: 0,
    approved_artworks: 0,
    rejected_artworks: 0,
  }

  return (
    <div>
      <h1 className={styles.title}>Panel de administración</h1>
      <div className={styles.grid}>
        <Link href="/dashboard/admin/revisiones" className={styles.cardLink}>
          <div className={styles.card}>
            <span className={styles.cardValue}>{stats.pending_artworks}</span>
            <span className={styles.cardLabel}>Pendientes de revisión</span>
          </div>
        </Link>
        <div className={styles.card}>
          <span className={styles.cardValue}>{stats.total_artworks}</span>
          <span className={styles.cardLabel}>Obras totales</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardValue}>{stats.total_artists}</span>
          <span className={styles.cardLabel}>Artistas registrados</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardValue}>{stats.approved_artworks}</span>
          <span className={styles.cardLabel}>Aprobadas</span>
        </div>
      </div>
    </div>
  )
}
