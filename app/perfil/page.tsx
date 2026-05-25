'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input/input'
import ArtworkCard from '@/components/artwork/ArtworkCard/artwork-card'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

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

export default function EditProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    bio: '',
    city: '',
    whatsappNumber: '',
    photoUrl: '',
  })
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [artworksLoading, setArtworksLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any
      setFormData({
        name: u.name || '',
        firstName: u.firstName || '',
        email: u.email || '',
        bio: u.bio || '',
        city: u.city || '',
        whatsappNumber: u.whatsappNumber || '',
        photoUrl: u.image || u.photoUrl || '',
      })
      fetchArtworks(u.id)
    }
  }, [session])

  async function fetchArtworks(artistId: number) {
    setArtworksLoading(true)
    try {
      const res = await fetch(`${API_URL}/artworks?artist_id=${artistId}`)
      if (res.ok) {
        const data = await res.json()
        setArtworks(Array.isArray(data) ? data : [])
      }
    } catch {
      // ignore
    } finally {
      setArtworksLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function getToken() {
    return (session as any)?.accessToken || (session?.user as any)?.accessToken
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const userId = (session?.user as any)?.id
      const body = new FormData()
      body.append('image', file)
      body.append('artistId', String(userId))

      const res = await fetch(`${API_URL}/images/upload-profile`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al subir imagen')
      }

      const data = await res.json()
      setFormData((prev) => ({ ...prev, photoUrl: data.photoUrl }))
      await update()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const userId = (session?.user as any)?.id
      const res = await fetch(`${API_URL}/artists/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al actualizar perfil')
      }

      await update({
        name: formData.name,
        firstName: formData.firstName,
        email: formData.email,
        photoUrl: formData.photoUrl,
        bio: formData.bio,
        city: formData.city,
        whatsappNumber: formData.whatsappNumber,
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.formSection}>
        <h1 className={styles.title}>Editar perfil</h1>
        <p className={styles.subtitle}>Actualiza tu información personal y artística.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.photoSection}>
            <div className={styles.photoWrapper}>
              {formData.photoUrl ? (
                <img src={formData.photoUrl} alt="Foto de perfil" className={styles.preview} />
              ) : (
                <div className={styles.previewPlaceholder}>
                  {formData.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              {uploading && <div className={styles.uploadOverlay} />}
            </div>
            <div className={styles.photoActions}>
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? 'Subiendo...' : 'Subir foto'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className={styles.fileInput}
              />
              <p className={styles.hint}>JPG, PNG o WEBP. Máximo 5 MB.</p>
            </div>
          </div>

          <Input
            label="Nombre completo"
            name="name"
            value={formData.name ?? ''}
            onChange={handleChange}
            required
          />

          <Input
            label="Nombre de pila"
            name="firstName"
            value={formData.firstName ?? ''}
            onChange={handleChange}
            maxLength={15}
          />

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email ?? ''}
            onChange={handleChange}
            required
          />

          <Input
            label="Ciudad"
            name="city"
            value={formData.city ?? ''}
            onChange={handleChange}
          />

          <Input
            label="Número de WhatsApp"
            name="whatsappNumber"
            type="tel"
            value={formData.whatsappNumber ?? ''}
            onChange={handleChange}
            placeholder="+57 300 123 4567"
          />

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bio">Biografía</label>
            <textarea
              id="bio"
              name="bio"
              className={styles.textarea}
              value={formData.bio ?? ''}
              onChange={handleChange}
              rows={12}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>Perfil actualizado correctamente.</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </section>

      <section className={styles.artworksSection}>
        <h2 className={styles.artworksTitle}>Últimas obras</h2>
        {artworksLoading ? (
          <p className={styles.emptyText}>Cargando obras...</p>
        ) : artworks.length === 0 ? (
          <p className={styles.emptyText}>Aún no has publicado obras.</p>
        ) : (
          <>
            <div className={styles.artworksGrid}>
              {artworks.slice(0, 9).map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} variant="minimal" />
              ))}
            </div>
            {artworks.length > 9 && (
              <Link href="/perfil/obras" className={styles.viewAll}>
                Ver todas
              </Link>
            )}
          </>
        )}
      </section>
    </div>
  )
}
