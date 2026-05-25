'use client'

import { useState, useRef } from 'react'
import Input from '@/components/ui/Input/input'
import styles from './UploadForm.module.scss'

interface UploadFormData {
  title: string
  description: string
  technique: string
  style: string
  dimensions: string
  year: number
  hasOriginal: boolean
  hasPrint: boolean
  originalPrice: string
  printPrice: string
}

interface UploadFormProps {
  onSubmit: (data: UploadFormData, files: FileList | null) => Promise<void>
  initialData?: Partial<UploadFormData>
  isSubmitting?: boolean
}

export default function UploadForm({ onSubmit, initialData, isSubmitting }: UploadFormProps) {
  const [formData, setFormData] = useState<UploadFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    technique: initialData?.technique || '',
    style: initialData?.style || '',
    dimensions: initialData?.dimensions || '',
    year: initialData?.year || new Date().getFullYear(),
    hasOriginal: initialData?.hasOriginal ?? true,
    hasPrint: initialData?.hasPrint ?? false,
    originalPrice: initialData?.originalPrice || '',
    printPrice: initialData?.printPrice || '',
  })
  const [files, setFiles] = useState<FileList | null>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files
    setFiles(selected)
    if (selected) {
      const urls = Array.from(selected).map((f) => URL.createObjectURL(f))
      setPreviews(urls)
    }
  }

  function removePreview(index: number) {
    const dt = new DataTransfer()
    const remaining = Array.from(files || []).filter((_, i) => i !== index)
    remaining.forEach((f) => dt.items.add(f))
    setFiles(dt.files)
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    if (fileRef.current) fileRef.current.value = ''
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData, files)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información de la obra</h3>

            <Input
              label="Título de la obra"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                className={styles.textarea}
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className={styles.row}>
              <Input label="Técnica" name="technique" value={formData.technique}
                onChange={handleChange} placeholder="Ej: Óleo sobre lienzo" required />
              <Input label="Estilo" name="style" value={formData.style}
                onChange={handleChange} placeholder="Ej: Abstracto, Realismo" />
              <Input label="Dimensiones" name="dimensions" value={formData.dimensions}
                onChange={handleChange} placeholder="Ej: 80x60 cm" required />
              <Input label="Año" name="year" type="number" value={formData.year}
                onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Disponibilidad</h3>

            <div className={styles.checkboxes}>
              <label className={styles.checkbox}>
                <input type="checkbox" name="hasOriginal" checked={formData.hasOriginal}
                  onChange={handleChange} />
                <span>Disponible como original</span>
              </label>

              {formData.hasOriginal && (
                <Input label="Precio del original (opcional)" name="originalPrice"
                  type="number" value={formData.originalPrice} onChange={handleChange} />
              )}

              <label className={styles.checkbox}>
                <input type="checkbox" name="hasPrint" checked={formData.hasPrint}
                  onChange={handleChange} />
                <span>Disponible como print</span>
              </label>

              {formData.hasPrint && (
                <Input label="Precio del print (opcional)" name="printPrice"
                  type="number" value={formData.printPrice} onChange={handleChange} />
              )}
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Publicando...' : initialData ? 'Actualizar obra' : 'Publicar obra'}
          </button>
        </div>

        <div className={styles.right}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Imágenes</h3>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="images">
                Fotos de la obra (alta resolución)
              </label>
              <input
                ref={fileRef}
                id="images"
                type="file"
                accept="image/*"
                multiple
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              <span className={styles.hint}>Formatos: JPG, PNG. Mínimo 1920px en el lado más largo.</span>
            </div>
          </div>

          {previews.length > 0 && (
            <div className={styles.previews}>
              {previews.map((url, i) => (
                <div key={i} className={styles.previewItem}>
                  <button type="button" className={styles.removeBtn} onClick={() => removePreview(i)}>&times;</button>
                  <img src={url} alt={`Preview ${i + 1}`} className={styles.previewImg} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
