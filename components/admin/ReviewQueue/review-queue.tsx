'use client'

import { useState } from 'react'
import type { ArtworkData } from '@/types'
import styles from './ReviewQueue.module.scss'

interface ReviewQueueProps {
  artworks: ArtworkData[]
  onApprove: (id: string) => Promise<void>
  onReject: (id: string, reason: string) => Promise<void>
}

export default function ReviewQueue({ artworks, onApprove, onReject }: ReviewQueueProps) {
  const [rejectModal, setRejectModal] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const pending = artworks.filter((a) => a.approvalStatus === 'pending')

  async function handleReject(id: string) {
    await onReject(id, rejectReason)
    setRejectModal(null)
    setRejectReason('')
  }

  if (pending.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay obras pendientes de revisión.</p>
      </div>
    )
  }

  return (
    <div className={styles.queue}>
      {pending.map((artwork) => (
        <div key={artwork.id} className={styles.card}>
          <div className={styles.imageCol}>
            <img
              src={artwork.thumbnailUrl || (artwork.images[0] as any)?.urlCloudinary}
              alt={artwork.title}
              className={styles.thumb}
            />
          </div>
          <div className={styles.infoCol}>
            <h3 className={styles.title}>{artwork.title}</h3>
            <p className={styles.artist}>{artwork.artist?.name}</p>
            {(artwork.artist as any)?.firstName && (
              <p className={styles.detail}><strong>Nombre de pila:</strong> {(artwork.artist as any).firstName}</p>
            )}
            <div className={styles.details}>
              <p><strong>Técnica:</strong> {artwork.technique}</p>
              {artwork.style && <p><strong>Estilo:</strong> {artwork.style}</p>}
              {artwork.dimensions && <p><strong>Dimensiones:</strong> {artwork.dimensions}</p>}
              {artwork.year && <p><strong>Año:</strong> {artwork.year}</p>}
              <p><strong>Adquisición:</strong>{' '}
                {artwork.hasOriginal && artwork.hasPrint
                  ? 'Original y Print'
                  : artwork.hasOriginal
                    ? 'Original'
                    : 'Print'}
              </p>
              {artwork.hasOriginal && artwork.originalPrice != null && (
                <p><strong>Precio original:</strong> ${Number(artwork.originalPrice).toLocaleString('es-CO')}</p>
              )}
              {artwork.hasPrint && artwork.printPrice != null && (
                <p><strong>Precio print:</strong> ${Number(artwork.printPrice).toLocaleString('es-CO')}</p>
              )}
            </div>
            {artwork.description && (
              <p className={styles.description}>{artwork.description}</p>
            )}
          </div>
          <div className={styles.actionsCol}>
            <button
              className={styles.approveBtn}
              onClick={() => onApprove(artwork.id)}
            >
              Aprobar
            </button>
            <button
              className={styles.rejectBtn}
              onClick={() => setRejectModal(artwork.id)}
            >
              Rechazar
            </button>
          </div>

          {rejectModal === artwork.id && (
            <div className={styles.rejectOverlay}>
              <div className={styles.rejectBox}>
                <h4>Rechazar obra</h4>
                <textarea
                  className={styles.rejectTextarea}
                  placeholder="Indica el motivo del rechazo..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                />
                <div className={styles.rejectActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => { setRejectModal(null); setRejectReason('') }}
                  >
                    Cancelar
                  </button>
                  <button
                    className={styles.confirmRejectBtn}
                    onClick={() => handleReject(artwork.id)}
                    disabled={!rejectReason.trim()}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
