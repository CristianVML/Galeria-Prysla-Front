'use client'

import { useRouter } from 'next/navigation'
import styles from './ArtworkCard.module.scss'

interface ArtworkData {
  id: number
  title: string
  hasOriginal: boolean
  hasPrint: boolean
  originalPrice?: number | null
  printPrice?: number | null
  artist?: { id: number; name: string; firstName?: string | null }
  images?: { urlCloudinary: string }[]
}

interface Props {
  artwork: ArtworkData
  variant?: 'default' | 'minimal'
}

export default function ArtworkCard({ artwork, variant = 'default' }: Props) {
  const router = useRouter()
  const imageUrl = artwork.images?.[0]?.urlCloudinary
  const price = artwork.hasOriginal ? artwork.originalPrice : artwork.printPrice
  const artistName = artwork.artist?.firstName || artwork.artist?.name || ''

  let badge = ''
  if (artwork.hasOriginal && artwork.hasPrint) {
    badge = 'Original · Print'
  } else if (artwork.hasOriginal) {
    badge = 'Original'
  } else if (artwork.hasPrint) {
    badge = 'Print'
  }

  return (
    <article className={styles.card} onClick={() => router.push(`/galeria/${artwork.id}`)}>
      <div className={styles.imageWrap}>
        {imageUrl ? (
          <img src={imageUrl} alt={artwork.title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>{artwork.title.charAt(0)}</span>
          </div>
        )}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.info}>
          <div>
            <h3 className={styles.title}>{artwork.title}</h3>
            {artistName && <p className={styles.artist}>{artistName}</p>}
          </div>
          {price != null && (
            <p className={styles.price}>${price.toLocaleString()}</p>
          )}
        </div>

        {variant === 'default' && (
          <button
            className={styles.contactBtn}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <img src="/icon/Icon-Logo-Whatsapp.svg" alt="WhatsApp" width="16" height="16" />
            Contactar a la artista
          </button>
        )}
      </div>
    </article>
  )
}
