'use client'

import { useState } from 'react'
import type { FiltersState } from '@/types'
import s from './FiltersBar.module.scss'

interface FiltersBarProps {
  artists: { id: string; name: string }[]
  techniques: string[]
  styleOptions: string[]
  onFiltersChange: (filters: FiltersState) => void
}

export default function FiltersBar({ artists, techniques, styleOptions, onFiltersChange }: FiltersBarProps) {
  const [filters, setFilters] = useState<FiltersState>({})
  const [isOpen, setIsOpen] = useState(false)

  function handleChange(key: keyof FiltersState, value: string) {
    const next = { ...filters, [key]: value || undefined }
    setFilters(next)
    onFiltersChange(next)
  }

  function handleReset() {
    setFilters({})
    onFiltersChange({})
  }

  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <div className={s.wrapper}>
      <button
        className={s.toggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Filtros</span>
        {hasActiveFilters && <span className={s.activeDot} />}
        <svg width="12" height="8" viewBox="0 0 12 8" className={isOpen ? s.rotated : ''}>
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {isOpen && (
        <div className={s.panel}>
          <div className={s.field}>
            <label className={s.label}>Artista</label>
            <select
              className={s.select}
              value={filters.artistId || ''}
              onChange={(e) => handleChange('artistId', e.target.value)}
            >
              <option value="">Todos los artistas</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div className={s.field}>
            <label className={s.label}>Técnica</label>
            <select
              className={s.select}
              value={filters.technique || ''}
              onChange={(e) => handleChange('technique', e.target.value)}
            >
              <option value="">Todas las técnicas</option>
              {techniques.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {styleOptions.length > 0 && (
            <div className={s.field}>
              <label className={s.label}>Estilo</label>
              <select
                className={s.select}
                value={filters.style || ''}
                onChange={(e) => handleChange('style', e.target.value)}
              >
                <option value="">Todos los estilos</option>
                {styleOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          )}

          <div className={s.field}>
            <label className={s.label}>Disponibilidad</label>
            <select
              className={s.select}
              value={filters.acquisition || ''}
              onChange={(e) => handleChange('acquisition', e.target.value as any)}
            >
              <option value="">Todas</option>
              <option value="original">Original</option>
              <option value="print">Print</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button className={s.resetBtn} onClick={handleReset}>
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}
