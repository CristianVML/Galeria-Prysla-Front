export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type AccountStatus = 'active' | 'suspended'
export type AcquisitionType = 'original' | 'print'

export interface ArtistData {
  id: string
  name: string
  email: string
  bio: string
  photoUrl: string
  city: string
  whatsappNumber: string
  accountStatus: AccountStatus
  createdAt: string
  artworks?: ArtworkData[]
}

export interface ArtworkData {
  id: string
  title: string
  description: string
  technique: string
  style: string
  dimensions: string
  year: number
  hasOriginal: boolean
  hasPrint: boolean
  printPrice?: number | null
  originalPrice?: number | null
  approvalStatus: ApprovalStatus
  rejectionReason: string
  images: string[]
  thumbnailUrl: string
  artistId: string
  artist?: ArtistData
  createdAt: string
}

export interface FiltersState {
  artistId?: string
  technique?: string
  style?: string
  acquisition?: AcquisitionType | ''
  query?: string
}
