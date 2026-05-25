'use client'

import { useState } from 'react'
import type { AcquisitionType } from '@/types'
import styles from './WhatsAppModal.module.scss'

function generateWhatsAppUrl(phone: string, artworkTitle: string, artistName: string, acquisitionType: AcquisitionType): string {
  const text = `Hola, me interesa la obra "${artworkTitle}" de ${artistName}. Me gustaría adquirir la opción de ${acquisitionType === 'original' ? 'obra original' : 'print'}.`
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

interface WhatsAppModalProps {
  isOpen: boolean
  onClose: () => void
  artworkTitle: string
  artistName: string
  whatsappNumber: string
  hasOriginal: boolean
  hasPrint: boolean
}

export default function WhatsAppModal({
  isOpen,
  onClose,
  artworkTitle,
  artistName,
  whatsappNumber,
  hasOriginal,
  hasPrint,
}: WhatsAppModalProps) {
  const [selectedType, setSelectedType] = useState<AcquisitionType>(
    hasOriginal ? 'original' : 'print'
  )

  if (!isOpen) return null

  function handleContact() {
    const url = generateWhatsAppUrl(whatsappNumber, artworkTitle, artistName, selectedType)
    window.open(url, '_blank')
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <h3 className={styles.title}>Solicitar información</h3>
        <p className={styles.artwork}>
          {artworkTitle} — <span className={styles.artist}>{artistName}</span>
        </p>

        <div className={styles.options}>
          {hasOriginal && (
            <button
              className={`${styles.option} ${selectedType === 'original' ? styles.selected : ''}`}
              onClick={() => setSelectedType('original')}
            >
              <span className={styles.optionTitle}>Original</span>
              <span className={styles.optionDesc}>Pieza única del artista</span>
            </button>
          )}
          {hasPrint && (
            <button
              className={`${styles.option} ${selectedType === 'print' ? styles.selected : ''}`}
              onClick={() => setSelectedType('print')}
            >
              <span className={styles.optionTitle}>Print</span>
              <span className={styles.optionDesc}>Reproducción de alta calidad</span>
            </button>
          )}
        </div>

        <button className={styles.cta} onClick={handleContact}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14.5 3.5C15.5 4.5 16 6 16 7.5C16 9 15.5 10.5 14.5 11.5C13.5 12.5 12 13 10.5 13C9 13 7.5 12.5 6.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3.5 16.5L6.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="7.5" r="1" fill="currentColor"/>
          </svg>
          Contactar por WhatsApp
        </button>

        <p className={styles.disclaimer}>
          Serás redirigido a WhatsApp para recibir asesoría personalizada.
        </p>
      </div>
    </div>
  )
}
