'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input/input'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    bio: '',
    whatsappNumber: '',
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setPhotoFile(file)
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let photoUrl = ''

      if (photoFile) {
        const photoForm = new FormData()
        photoForm.append('image', photoFile)
        const uploadRes = await fetch(`${API_URL}/images/upload-profile-temp`, {
          method: 'POST',
          body: photoForm,
        })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Error al subir foto')
        photoUrl = uploadData.url
      }

      const res = await fetch(`${API_URL}/auth/artists/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, photoUrl }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrarse')
      }

      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Registro de artista</h1>
      <p className={styles.subtitle}>
        Crea tu cuenta para publicar tus obras en la galería.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.photoSection}>
          <div
            className={styles.photoCircle}
            onClick={() => fileRef.current?.click()}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className={styles.photoImg} />
            ) : (
              <img src="/icon/userCircle.svg" alt="User" className={styles.photoIcon} />
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className={styles.photoInput}
            onChange={handlePhotoChange}
          />
          <button type="button" className={styles.photoBtn} onClick={() => fileRef.current?.click()}>
            {photoPreview ? 'Cambiar foto' : 'Subir foto de perfil'}
          </button>
        </div>

        <Input
          label="Nombre completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Correo electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Ciudad"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <Input
          label="Número de WhatsApp (con código de país)"
          name="whatsappNumber"
          type="tel"
          value={formData.whatsappNumber}
          onChange={handleChange}
          placeholder="Ej: +57 300 123 4567"
        />

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bio">Biografía (opcional)</label>
          <textarea
            id="bio"
            name="bio"
            className={styles.textarea}
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Cuéntanos sobre ti y tu trabajo artístico..."
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>

      <p className={styles.footer}>
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className={styles.link}>Inicia sesión</Link>
      </p>
    </div>
  )
}
