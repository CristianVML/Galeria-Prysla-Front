'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input/input'
import styles from './page.module.scss'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Credenciales inválidas')
      setLoading(false)
      return
    }

    const session = await getSession()
    const role = (session?.user as any)?.role
    router.push(role === 'admin' ? '/dashboard/admin' : '/dashboard/artista')
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <p className={styles.subtitle}>
        Accede a tu panel de artista o administración.
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className={styles.footer}>
        ¿No tienes cuenta?{' '}
        <Link href="/registro" className={styles.link}>Regístrate como artista</Link>
      </p>
    </div>
  )
}
