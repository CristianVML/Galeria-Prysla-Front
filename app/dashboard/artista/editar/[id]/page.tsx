'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import UploadForm from '@/components/artist/UploadForm/upload-form'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default function EditArtworkPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!session?.user) return
      const token = (session.user as any).accessToken
      const res = await fetch(`${API_URL}/artworks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setInitialData({
          title: data.title,
          description: data.description || '',
          technique: data.technique || '',
          style: data.style || '',
          dimensions: data.dimensions || '',
          year: data.year || new Date().getFullYear(),
          hasOriginal: data.hasOriginal,
          hasPrint: data.hasPrint,
          originalPrice: data.originalPrice ? String(data.originalPrice) : '',
          printPrice: data.printPrice ? String(data.printPrice) : '',
        })
      }
      setLoading(false)
    }
    load()
  }, [session, id])

  async function handleSubmit(data: any, _files?: FileList | null) {
    const token = (session?.user as any)?.accessToken
    const res = await fetch(`${API_URL}/artworks/${id}`, {
      method: 'PATCH',
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
      }),
    })
    if (!res.ok) throw new Error('Error al actualizar obra')
    router.push('/dashboard/artista')
    router.refresh()
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h1>Editar obra</h1>
      {initialData && (
        <UploadForm onSubmit={handleSubmit} initialData={initialData} />
      )}
    </div>
  )
}
