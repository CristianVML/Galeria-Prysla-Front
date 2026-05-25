import { notFound } from 'next/navigation'
import ArtworkDetailClient from './artwork-detail-client'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params

  const res = await fetch(`${API_URL}/artworks/${id}`, { cache: 'no-store' })
  if (!res.ok) notFound()

  const artwork = await res.json()
  if (!artwork || artwork.approvalStatus !== 'approved') notFound()

  return (
    <div className="container">
      <ArtworkDetailClient
        artwork={artwork}
        whatsappNumber={artwork.artist?.whatsappNumber || ''}
      />
    </div>
  )
}
