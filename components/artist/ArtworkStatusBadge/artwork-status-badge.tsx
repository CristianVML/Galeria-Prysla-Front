import type { ApprovalStatus } from '@/types'
import styles from './ArtworkStatusBadge.module.scss'

interface ArtworkStatusBadgeProps {
  status: ApprovalStatus
}

const STATUS_MAP: Record<ApprovalStatus, { label: string; className: string }> = {
  pending: { label: 'En revisión', className: 'pending' },
  approved: { label: 'Aprobada', className: 'approved' },
  rejected: { label: 'Rechazada', className: 'rejected' },
}

export default function ArtworkStatusBadge({ status }: ArtworkStatusBadgeProps) {
  const { label, className } = STATUS_MAP[status]

  return (
    <span className={`${styles.badge} ${styles[className]}`}>
      {label}
    </span>
  )
}
