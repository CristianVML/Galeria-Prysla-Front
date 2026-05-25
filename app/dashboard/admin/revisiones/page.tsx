import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import ReviewActions from './review-actions'
import styles from './page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default async function ReviewPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') redirect('/login')

  const res = await fetch(`${API_URL}/artworks?status=pending`, { cache: 'no-store' })
  const artworks = res.ok ? await res.json() : []

  return (
    <div>
      <h1 className={styles.title}>Revisiones pendientes</h1>
      <ReviewActions artworks={artworks} />
    </div>
  )
}
