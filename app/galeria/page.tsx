import GalleryClient from './gallery-client'
import { ENDPOINTS } from '@/lib/api'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const [artworksRes, artistsRes, techniquesRes] = await Promise.all([
    fetch(ENDPOINTS.artworks.byStatus('approved'), { cache: 'no-store' }),
    fetch(ENDPOINTS.artists.base, { cache: 'no-store' }),
    fetch(ENDPOINTS.techniques.base, { cache: 'no-store' }),
  ])

  const artworks: any[] = artworksRes.ok ? await artworksRes.json() : []
  const artists: any[] = artistsRes.ok ? await artistsRes.json() : []

  const techniques: string[] = techniquesRes.ok ? await techniquesRes.json() : []
  const artStyles: string[] = Array.from(new Set(artworks.map((a) => a.style).filter(Boolean))).sort()

  return (
    <div className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>Galería</h1>
        <p className={styles.subtitle}>
          Explora obras de artistas emergentes colombianos.
        </p>
      </section>
      <GalleryClient
        artworks={artworks}
        artists={artists.map((a: any) => ({ id: a.id, name: a.name }))}
        techniques={techniques}
        styles={artStyles}
      />
    </div>
  )
}
