'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ArtworkCard from '@/components/artwork/ArtworkCard/artwork-card'
import { ENDPOINTS } from '@/lib/api'
import styles from './page.module.scss'

interface Artwork {
  id: number
  title: string
  hasOriginal: boolean
  hasPrint: boolean
  originalPrice?: number | null
  printPrice?: number | null
  artist?: { id: number; name: string }
  images?: { urlCloudinary: string }[]
}

export default function MyArtworksPage() {
  const { data: session } = useSession()
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = (session?.user as any)?.id
    if (!userId) return

    setLoading(true)
    fetch(ENDPOINTS.artworks.byArtist(userId))
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setArtworks(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [session])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/perfil" className={styles.back}>
          &larr; Volver al perfil
        </Link>
        <h1 className={styles.title}>Mis obras</h1>
        <p className={styles.count}>{artworks.length} obra{artworks.length !== 1 ? 's' : ''}</p>
      </div>

      {loading ? (
        <p className={styles.empty}>Cargando obras...</p>
      ) : artworks.length === 0 ? (
        <p className={styles.empty}>Aún no has publicado obras.</p>
      ) : (
        <div className={styles.grid}>
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} variant="minimal" />
          ))}
        </div>
      )}
    </div>
  )
}
