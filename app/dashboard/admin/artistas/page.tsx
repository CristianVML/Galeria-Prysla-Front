import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import ArtistManager from '@/components/admin/ArtistManager/artist-manager'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default async function AdminArtistsPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') redirect('/login')

  const res = await fetch(`${API_URL}/artists`, { cache: 'no-store' })
  const artists = res.ok ? await res.json() : []

  return (
    <div>
      <h1 className={styles.title}>Artistas registrados</h1>
      <ArtistManager artists={artists} />
    </div>
  )
}
