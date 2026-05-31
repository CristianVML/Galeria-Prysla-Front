export const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api`

export const ENDPOINTS = {
  auth: {
    artistRegister: `${API_URL}/auth/artists/register`,
    artistLogin: `${API_URL}/auth/artists/login`,
    adminLogin: `${API_URL}/auth/admin/login`,
  },
  artworks: {
    base: `${API_URL}/artworks`,
    byArtist: (id: number | string) => `${API_URL}/artworks?artist_id=${id}`,
    byStatus: (status: string) => `${API_URL}/artworks?status=${status}`,
    byId: (id: number | string) => `${API_URL}/artworks/${id}`,
  },
  artists: {
    base: `${API_URL}/artists`,
    byId: (id: number | string) => `${API_URL}/artists/${id}`,
    status: (id: number | string) => `${API_URL}/artists/${id}/status`,
  },
  images: {
    upload: `${API_URL}/images/upload`,
    uploadProfile: `${API_URL}/images/upload-profile`,
    uploadTempProfile: `${API_URL}/images/upload-profile-temp`,
  },
  reviews: {
    approve: (id: number | string) => `${API_URL}/reviews/artworks/${id}/approve`,
  },
  dashboard: {
    stats: `${API_URL}/dashboard/stats`,
  },
  newsletter: {
    subscribe: `${API_URL}/newsletter/subscribe`,
  },
  techniques: {
    base: `${API_URL}/techniques`,
  },
}
