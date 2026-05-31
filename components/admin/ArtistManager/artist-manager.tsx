'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { ArtistData } from '@/types'
import { ENDPOINTS } from '@/lib/api'
import styles from './ArtistManager.module.scss'

interface ArtistManagerProps {
  artists: ArtistData[]
}

export default function ArtistManager({ artists }: ArtistManagerProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  function getHeaders() {
    const token = (session?.user as any)?.accessToken
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  async function handleToggleStatus(artist: ArtistData) {
    setLoadingId(artist.id)
    const newStatus = artist.accountStatus === 'active' ? 'suspended' : 'active'
    await fetch(ENDPOINTS.artists.status(artist.id), {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ accountStatus: newStatus }),
    })
    setLoadingId(null)
    router.refresh()
  }

  async function handleDelete(artist: ArtistData) {
    if (!confirm(`¿Eliminar a "${artist.name}" y todas sus obras? Esta acción no se puede deshacer.`)) return
    setLoadingId(artist.id)
    await fetch(ENDPOINTS.artists.byId(artist.id), {
      method: 'DELETE',
      headers: getHeaders(),
    })
    setLoadingId(null)
    router.refresh()
  }

  return (
    <div className={styles.table}>
      <div className={styles.headerRow}>
        <span className={styles.headerCell}>Artista</span>
        <span className={styles.headerCell}>Correo</span>
        <span className={styles.headerCell}>Ciudad</span>
        <span className={styles.headerCell}>WhatsApp</span>
        <span className={styles.headerCell}>Obras</span>
        <span className={styles.headerCell}>Estado</span>
        <span className={styles.headerCell}>Registro</span>
        <span className={styles.headerCell}>Acciones</span>
      </div>
      {artists.map((artist) => (
        <div key={artist.id} className={styles.row}>
          <span className={styles.cell}>
            <strong>{artist.name}</strong>
          </span>
          <span className={styles.cell}>{artist.email}</span>
          <span className={styles.cell}>{artist.city || '—'}</span>
          <span className={styles.cell}>{artist.whatsappNumber || '—'}</span>
          <span className={styles.cell}>{artist.artworks?.length || 0}</span>
          <span className={styles.cell}>
            <span className={`${styles.status} ${styles[artist.accountStatus]}`}>
              {artist.accountStatus === 'active' ? 'Activo' : 'Suspendido'}
            </span>
          </span>
          <span className={styles.cell}>
            {new Date(artist.createdAt).toLocaleDateString('es-CO')}
          </span>
          <span className={`${styles.cell} ${styles.actions}`}>
            <button
              className={`${styles.actionBtn} ${artist.accountStatus === 'active' ? styles.suspend : styles.activate}`}
              onClick={() => handleToggleStatus(artist)}
              disabled={loadingId === artist.id}
            >
              {artist.accountStatus === 'active' ? 'Suspender' : 'Activar'}
            </button>
            <button
              className={`${styles.actionBtn} ${styles.delete}`}
              onClick={() => handleDelete(artist)}
              disabled={loadingId === artist.id}
            >
              Eliminar
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}
