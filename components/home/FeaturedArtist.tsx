import Link from 'next/link'
import styles from './FeaturedArtist.module.scss'

interface Props {
  artist: {
    id: number
    name: string
    bio?: string | null
    photoUrl?: string | null
  }
}

export default function FeaturedArtist({ artist }: Props) {
  return (
    <article className={styles.card}>
      <span className={styles.badge}>ARTISTA DESTACADA</span>
      <div className={styles.imageCol}>
        {artist.photoUrl ? (
          <img src={artist.photoUrl} alt={artist.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg viewBox="0 0 400 500" fill="none" className={styles.placeholderSvg}>
              <rect width="400" height="500" fill="#7C3AED" rx="16" />
              <circle cx="200" cy="180" r="60" fill="#A78BFA" opacity="0.6" />
              <path d="M200 260 Q160 320 140 400 Q130 440 200 440 Q270 440 260 400 Q240 320 200 260Z" fill="#A78BFA" opacity="0.6" />
              <rect x="60" y="60" width="40" height="40" rx="8" fill="#FCD34D" opacity="0.4" transform="rotate(-15, 80, 80)" />
              <rect x="300" y="380" width="32" height="40" rx="4" fill="#FCD34D" opacity="0.4" transform="rotate(10, 316, 400)" />
              <circle cx="320" cy="100" r="12" fill="#FCD34D" opacity="0.4" />
              <rect x="80" y="400" width="48" height="8" rx="4" fill="#FCD34D" opacity="0.4" />
              <rect x="85" y="412" width="38" height="6" rx="3" fill="#FCD34D" opacity="0.4" />
              <circle cx="80" cy="130" r="10" fill="#FCD34D" opacity="0.5" />
              <rect x="280" y="60" width="20" height="60" rx="10" fill="#FCD34D" opacity="0.4" transform="rotate(-20, 290, 90)" />
            </svg>
            <span className={styles.initials}>{artist.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className={styles.textCol}>
        <h2 className={styles.name}>{artist.name}</h2>
        <p className={styles.bio}>
          {artist.bio || 'Artista emergente colombiana con una trayectoria en constante evolución. Su obra explora la identidad, el color y la narrativa visual contemporánea.'}
        </p>
        <Link href={`/artistas/${artist.id}`} className={styles.link}>
          Ver Perfil Completo
        </Link>
      </div>
    </article>
  )
}
