'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ArtworkData } from '@/types'
import WhatsAppModal from '@/components/gallery/WhatsAppModal/whatsapp-modal'
import styles from './page.module.scss'

interface ArtworkDetailClientProps {
  artwork: ArtworkData
  whatsappNumber: string
}

export default function ArtworkDetailClient({ artwork, whatsappNumber }: ArtworkDetailClientProps) {
  const [selectedType, setSelectedType] = useState<'original' | 'print' | null>(
    artwork.hasOriginal ? 'original' : artwork.hasPrint ? 'print' : null
  )
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  const mainImg = ((artwork.images as any[])[0]?.urlCloudinary) || artwork.thumbnailUrl || ''
  const selectedPrice = selectedType === 'original' ? artwork.originalPrice : artwork.printPrice
  const badge = artwork.hasOriginal && artwork.hasPrint
    ? 'Original · Print'
    : artwork.hasOriginal
      ? 'Original'
      : 'Print'

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.imageCol}>
          <div className={styles.canvasFrame}>
            <img src={mainImg} alt={artwork.title} className={styles.image} />
            <button
              className={styles.zoomBtn}
              onClick={() => setZoomImage(mainImg)}
              aria-label="Ver en alta resolución"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
              Ver en alta resolución
            </button>
          </div>
        </div>

        <div className={styles.infoCol}>
          <Link href="/galeria" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver a la galería
          </Link>

          <span className={styles.badge}>{badge}</span>

          <h1 className={styles.title}>{artwork.title}</h1>

          <p className={styles.artistLine}>
            por <Link href={`/artistas/${artwork.artistId}`} className={styles.artistLink}>
              {artwork.artist?.name}
            </Link>
          </p>

          {selectedPrice != null && (
            <p className={styles.price}>
              ${selectedPrice.toLocaleString('es-CO')} COP
            </p>
          )}

          <p className={styles.description}>{artwork.description}</p>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Técnica</span>
              <span className={styles.specValue}>{artwork.technique}</span>
            </div>
            {artwork.style && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Estilo</span>
                <span className={styles.specValue}>{artwork.style}</span>
              </div>
            )}
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Dimensiones</span>
              <span className={styles.specValue}>
                {artwork.dimensions?.replace(/x/gi, ' × ') || '—'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Año</span>
              <span className={styles.specValue}>{artwork.year || '—'}</span>
            </div>
          </div>

          <div className={styles.acquisition}>
            <h3 className={styles.acqTitle}>Modalidad de adquisición</h3>
            <div className={styles.acqCards}>
              {artwork.hasOriginal && (
                <button
                  className={`${styles.acqCard} ${selectedType === 'original' ? styles.acqCardActive : ''}`}
                  onClick={() => setSelectedType('original')}
                >
                  <span className={styles.acqLabel}>Original</span>
                  <span className={styles.acqDesc}>Pieza única</span>
                  {artwork.originalPrice != null && (
                    <span className={styles.acqPrice}>
                      ${artwork.originalPrice.toLocaleString('es-CO')}
                    </span>
                  )}
                </button>
              )}
              {artwork.hasPrint && (
                <button
                  className={`${styles.acqCard} ${selectedType === 'print' ? styles.acqCardActive : ''}`}
                  onClick={() => setSelectedType('print')}
                >
                  <span className={styles.acqLabel}>Print</span>
                  <span className={styles.acqDesc}>Reproducción de alta calidad</span>
                  {artwork.printPrice != null && (
                    <span className={styles.acqPrice}>
                      ${artwork.printPrice.toLocaleString('es-CO')}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          <button className={styles.whatsappBtn} onClick={() => setShowWhatsApp(true)}>
            <img src="/icon/Icon-Logo-Whatsapp.svg" alt="WhatsApp" width="20" height="20" />
            Contactar a la artista
          </button>

          <p className={styles.legal}>
            Al contactar, aceptas nuestras políticas de privacidad y términos de servicio.
          </p>
        </div>
      </div>

      {zoomImage && (
        <div className={styles.zoomOverlay} onClick={() => setZoomImage(null)}>
          <button className={styles.zoomClose} onClick={() => setZoomImage(null)} aria-label="Cerrar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <img src={zoomImage} alt={artwork.title} className={styles.zoomImg} />
        </div>
      )}

      <WhatsAppModal
        isOpen={showWhatsApp}
        onClose={() => setShowWhatsApp(false)}
        artworkTitle={artwork.title}
        artistName={artwork.artist?.name || ''}
        whatsappNumber={whatsappNumber}
        hasOriginal={artwork.hasOriginal}
        hasPrint={artwork.hasPrint}
      />
    </>
  )
}
