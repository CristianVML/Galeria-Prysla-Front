'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import styles from './Header.module.scss'

const NAV_LINKS = [
  { href: '/galeria', label: 'Galería' },
  { href: '/dashboard/artista/subir', label: 'Publica tu obra' },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const isLoggedIn = !!session?.user
  const role = (session?.user as any)?.role
  const user = session?.user
  const userName = (user as any)?.firstName || user?.name || 'Usuario'
  const userImage = (user as any)?.image || (user as any)?.photoUrl
  const dashboardHref = role === 'admin' ? '/dashboard/admin' : '/dashboard/artista'

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>PRYSLA</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${hasMounted && pathname?.startsWith(link.href) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {isLoggedIn ? (
            <div className={styles.loggedInGroup}>
              <Link href={dashboardHref} className={styles.dashboardBtn}>
                Panel
              </Link>

              <div className={styles.userMenu}>
                <Link href="/perfil" className={styles.userInfo}>
                  {userImage ? (
                    <img src={userImage} alt={userName} className={styles.avatar} />
                  ) : (
                    <span className={styles.avatarPlaceholder}>
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className={styles.userName}>{userName}</span>
                </Link>

                <div className={styles.dropdown}>
                  <div className={styles.dropdownInner}>
                    <Link href="/perfil" className={styles.dropdownItem}>
                      Editar perfil
                    </Link>
                    <button onClick={() => signOut()} className={styles.logoutBtn}>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.authGroup}>
              <Link href="/login" className={styles.loginBtn}>
                Acceder
              </Link>
              <Link href="/registro" className={styles.registerBtn}>
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
