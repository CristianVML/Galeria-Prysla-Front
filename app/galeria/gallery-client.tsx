'use client'

import { useState, useMemo } from 'react'
import type { ArtworkData, FiltersState } from '@/types'
import ArtworkGrid from '@/components/gallery/ArtworkGrid/artwork-grid'
import FiltersBar from '@/components/gallery/FiltersBar/filters-bar'

interface GalleryClientProps {
  artworks: ArtworkData[]
  artists: { id: string; name: string }[]
  techniques: string[]
  styles: string[]
}

export default function GalleryClient({ artworks, artists, techniques, styles }: GalleryClientProps) {
  const [filters, setFilters] = useState<FiltersState>({})

  const filtered = useMemo(() => {
    return artworks.filter((a: any) => {
      if (filters.artistId && String(a.artistId) !== filters.artistId) return false
      if (filters.technique && a.technique !== filters.technique) return false
      if (filters.style && a.style !== filters.style) return false
      if (filters.acquisition === 'original' && !a.hasOriginal) return false
      if (filters.acquisition === 'print' && !a.hasPrint) return false
      return true
    })
  }, [artworks, filters])

  return (
    <>
      <FiltersBar
        artists={artists}
        techniques={techniques}
        styleOptions={styles}
        onFiltersChange={setFilters}
      />
      <ArtworkGrid artworks={filtered} />
    </>
  )
}
