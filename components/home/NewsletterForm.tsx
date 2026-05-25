'use client'

import { useState, FormEvent, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Link from 'next/link'
import styles from '@/app/page.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    if (!acceptedTerms) {
      setStatus('error')
      setMessage('Debes aceptar los términos y condiciones')
      return
    }

    const captchaToken = recaptchaRef.current?.getValue()
    if (!captchaToken) {
      setStatus('error')
      setMessage('Debes verificar que no eres un robot')
      return
    }

    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, captchaToken }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || '¡Suscripción exitosa!')
        setEmail('')
        setAcceptedTerms(false)
        recaptchaRef.current?.reset()
      } else {
        setStatus('error')
        setMessage(data.error || 'Error al suscribir')
        recaptchaRef.current?.reset()
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

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
      />

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
