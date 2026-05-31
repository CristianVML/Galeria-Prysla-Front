import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import ArtworkStatusBadge from '@/components/artist/ArtworkStatusBadge/artwork-status-badge'
import Link from 'next/link'
import { ENDPOINTS } from '@/lib/api'
import styles from './page.module.scss'

export default async function ArtistDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'artist') redirect('/login')

  const artistId = (session.user as any).id
  const token = (session.user as any).accessToken

  const res = await fetch(ENDPOINTS.artworks.byArtist(artistId), {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  })
  const artworks = res.ok ? await res.json() : []

  return (
    <div>
      <h1 className={styles.title}>Mis obras</h1>

      {artworks.length === 0 ? (
        <div className={styles.empty}>
          <p>Aún no has publicado ninguna obra.</p>
          <Link href="/dashboard/artista/subir" className={styles.cta}>
            Publicar primera obra
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {artworks.map((artwork: any) => (
            <div key={artwork.id} className={styles.card}>
              {artwork.images?.[0]?.urlCloudinary ? (
                <img
                  src={artwork.images[0].urlCloudinary}
                  alt={artwork.title}
                  className={styles.thumb}
                />
              ) : (
                <div className={styles.thumbPlaceholder} />
              )}
              <div className={styles.info}>
                <h3>{artwork.title}</h3>
                <p>{artwork.technique}{artwork.style ? ` — ${artwork.style}` : ''} — {artwork.dimensions} — {artwork.year}</p>
              </div>
              <ArtworkStatusBadge status={artwork.approvalStatus} />
              <Link href={`/dashboard/artista/editar/${artwork.id}`} className={styles.editBtn}>
                Editar
              </Link>
              {artwork.approvalStatus === 'rejected' && artwork.adminComment && (
                <p className={styles.rejection}>{artwork.adminComment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
