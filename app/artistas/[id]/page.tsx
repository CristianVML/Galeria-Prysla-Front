import { notFound } from 'next/navigation'
import Link from 'next/link'
import ArtworkCard from '@/components/artwork/ArtworkCard/artwork-card'
import { ENDPOINTS } from '@/lib/api'
import styles from './page.module.scss'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ArtistDetailPage({ params }: Props) {
  const { id } = await params

  const res = await fetch(ENDPOINTS.artists.byId(id), { cache: 'no-store' })
  if (!res.ok) notFound()

  const artist = await res.json()
  if (!artist) notFound()

  const approved = artist.artworks?.filter(
    (a: any) => a.approvalStatus === 'approved'
  ) || []

  return (
    <div className="container">
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <div className={styles.photoWrap}>
            {artist.photoUrl ? (
              <img src={artist.photoUrl} alt={artist.name} className={styles.photo} />
            ) : (
              <div className={styles.photoPlaceholder}>
                {artist.name?.charAt(0)}
              </div>
            )}
          </div>
          <h1 className={styles.name}>{artist.name}</h1>
          {artist.city && <p className={styles.city}>{artist.city}</p>}
          {artist.bio && <p className={styles.bio}>{artist.bio}</p>}
          {artist.whatsappNumber && (
            <a
              href={`https://wa.me/${artist.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
            >
              <img src="/icon/Icon-Logo-Whatsapp.svg" alt="WhatsApp" width="16" height="16" />
              Contactar por WhatsApp
            </a>
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>
            Obras publicadas ({approved.length})
          </h2>
          {approved.length === 0 ? (
            <p className={styles.empty}>Este artista aún no tiene obras publicadas.</p>
          ) : (
            <div className={styles.grid}>
              {approved.map((artwork: any) => (
                <ArtworkCard key={artwork.id} artwork={artwork} variant="default" />
              ))}
            </div>
          )}
        </div>
      </div>

      <Link href="/galeria" className={styles.back}>
        ← Volver a galería
      </Link>
    </div>
  )
}
