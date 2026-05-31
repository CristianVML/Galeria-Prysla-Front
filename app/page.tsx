import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import styles from './page.module.scss'
import NewsletterForm from '@/components/home/NewsletterForm'
import FeaturedArtist from '@/components/home/FeaturedArtist'
import ArtworkCard from '@/components/artwork/ArtworkCard/artwork-card'
import { ENDPOINTS } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const [featuredRes, latestRes, artistsRes] = await Promise.all([
    fetch(ENDPOINTS.artworks.byStatus('approved'), { cache: 'no-store' }),
    fetch(ENDPOINTS.artworks.byStatus('approved'), { cache: 'no-store' }),
    fetch(ENDPOINTS.artists.base, { cache: 'no-store' }),
  ])

  const allArtworks = featuredRes.ok ? await featuredRes.json() : []
  const artists = artistsRes.ok ? await artistsRes.json() : []

  const featured = allArtworks.slice(0, 4)
  const latest = allArtworks.slice(0, 4).reverse()
  const featuredArtist = artists[0] || null

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Arte contemporáneo colombiano</span>
          <h1 className={styles.heroTitle}>
            El arte<br />
            <span className={styles.highlight}>encuentra su espacio</span>
          </h1>
          <p className={styles.heroDesc}>
            Una galería interactiva donde artistas emergentes exhiben su obra y los
            compradores descubren piezas únicas con asesoría personalizada.
          </p>
          <div className={styles.heroActions}>
            <Link href="/galeria" className={styles.primaryBtn}>
              Explorar galería
            </Link>
            {!session?.user && (
              <Link href="/registro" className={styles.secondaryBtn}>
                Soy artista
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Obras destacadas</h2>
          <p className={styles.sectionSubtitle}>
            Piezas seleccionadas de nuestra galería.
          </p>
          <div className={styles.grid}>
            {featured.map((artwork: any) => (
              <ArtworkCard key={artwork.id} artwork={artwork} variant="default" />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Últimas publicaciones</h2>
          <p className={styles.sectionSubtitle}>
            Lo más reciente en nuestra galería.
          </p>
          <div className={styles.grid}>
            {latest.map((artwork: any) => (
              <ArtworkCard key={artwork.id} artwork={artwork} variant="default" />
            ))}
          </div>
        </div>
      </section>

      {featuredArtist && (
        <section className={styles.splitSection}>
          <div className="container">
            <div className={styles.splitInner}>
              <div className={styles.splitCol}>
                <FeaturedArtist artist={featuredArtist} />
              </div>
              <div className={styles.splitCol}>
                <div className={styles.newsletterCard}>
                  <h2 className={styles.newsletterTitle}>
                    Únete a nuestra comunidad
                  </h2>
                  <p className={styles.newsletterDesc}>
                    Suscríbete para recibir noticias sobre nuevos artistas, exposiciones
                    exclusivas y obras recién añadidas a nuestra galería.
                  </p>
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
