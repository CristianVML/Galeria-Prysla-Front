'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import UploadForm from '@/components/artist/UploadForm/upload-form'
import { ENDPOINTS } from '@/lib/api'
import styles from './page.module.scss'

export default function UploadArtworkPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  async function handleSubmit(data: any, files: FileList | null) {
    setIsSubmitting(true)
    setError('')

    try {
      const token = (session?.user as any)?.accessToken
      const artistId = (session?.user as any)?.id

      // 1. Crear la obra sin imágenes
      const artworkRes = await fetch(ENDPOINTS.artworks.base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          technique: data.technique,
          dimensions: data.dimensions,
          year: Number(data.year),
          hasOriginal: data.hasOriginal,
          hasPrint: data.hasPrint,
          originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
          printPrice: data.printPrice ? Number(data.printPrice) : null,
          artistId: Number(artistId),
        }),
      })

      const artworkBody = await artworkRes.json()

      if (!artworkRes.ok) {
        throw new Error(artworkBody.error || 'Error al publicar la obra')
      }

      const artworkId = artworkBody.id

      // 2. Subir imágenes asociadas a la obra
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const fileForm = new FormData()
          fileForm.append('image', files[i])
          fileForm.append('artworkId', String(artworkId))

          const uploadRes = await fetch(ENDPOINTS.images.upload, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: fileForm,
          })

          if (!uploadRes.ok) {
            const errBody = await uploadRes.json().catch(() => ({}))
            throw new Error(errBody.error || 'Error al subir imagen')
          }
        }
      }

      router.push('/dashboard/artista')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Publicar obra</h1>
      {error && <p className={styles.error}>{error}</p>}
      <UploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
