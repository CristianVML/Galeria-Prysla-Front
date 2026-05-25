import Link from 'next/link'
import ArtworkCard from '@/components/artwork/ArtworkCard/artwork-card'
import styles from './ArtworkGrid.module.scss'

export default function ArtworkGrid({ artworks }: { artworks: any[] }) {
  if (artworks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No se encontraron obras.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {artworks.map((artwork: any) => (
        <Link key={artwork.id} href={`/galeria/${artwork.id}`} className={styles.link}>
          <ArtworkCard artwork={artwork} variant="default" />
        </Link>
      ))}
    </div>
  )
}
