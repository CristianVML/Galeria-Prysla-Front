'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { ENDPOINTS } from '@/lib/api'
import styles from '@/app/page.module.scss'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    if (!acceptedTerms) {
      setStatus('error')
      setMessage('Debes aceptar los términos y condiciones')
      return
    }

    try {
      const res = await fetch(ENDPOINTS.newsletter.subscribe, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || '¡Suscripción exitosa!')
        setEmail('')
        setAcceptedTerms(false)
      } else {
        setStatus('error')
        setMessage(data.error || 'Error al suscribir')
      }
    } catch {
      setStatus('error')
      setMessage('Error de conexión')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.newsletterForm}>
      <div className={styles.newsletterRow}>
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.newsletterInput}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={styles.newsletterBtn}
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirse'}
        </button>
      </div>

      <label className={styles.newsletterCheckbox}>
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        Acepto los{' '}
        <Link href="/terminos" target="_blank">términos y condiciones</Link>
      </label>

      {message && (
        <p
          className={styles.newsletterMsg}
          style={{ color: status === 'success' ? '#4A7C59' : '#C44545' }}
        >
          {message}
        </p>
      )}
    </form>
  )
}
