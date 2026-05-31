import { notFound } from 'next/navigation'
import ArtworkDetailClient from './artwork-detail-client'
import { ENDPOINTS } from '@/lib/api'
import styles from './page.module.scss'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params

  const res = await fetch(ENDPOINTS.artworks.byId(id), { cache: 'no-store' })
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
