'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { ArtworkData } from '@/types'
import ReviewQueue from '@/components/admin/ReviewQueue/review-queue'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

interface Props {
  artworks: ArtworkData[]
}

export default function ReviewActions({ artworks }: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const [error, setError] = useState('')

  async function handleApprove(id: string) {
    setError('')
    const token = (session?.user as any)?.accessToken
    try {
      const res = await fetch(`${API_URL}/reviews/artworks/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ decision: 'approved' }),
      })
      if (!res.ok) throw new Error('Error al aprobar obra')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function handleReject(id: string, reason: string) {
    setError('')
    const token = (session?.user as any)?.accessToken
    try {
      const res = await fetch(`${API_URL}/reviews/artworks/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ decision: 'rejected', comment: reason }),
      })
      if (!res.ok) throw new Error('Error al rechazar obra')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      <ReviewQueue
        artworks={artworks}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  )
}
