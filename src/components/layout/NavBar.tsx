'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './NavBar.module.css'

const NAV_LINKS = [
  { href: '/trabajo', label: 'Trabajo' },
  { href: '/pensamiento', label: 'Pensamiento' },
  { href: '/sobre', label: 'Sobre Neil' },
] as const

export default function NavBar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Transparent only on homepage before first scroll
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)

    // Set initial state (handles page reload mid-scroll)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHome && !scrolled

  return (
    <header
      className={`${styles.header} ${isTransparent ? styles.transparent : styles.solid}`}
      role="banner"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Neil Meza — Inicio">
          Neil Meza
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.navLink}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/construyamos" className={styles.cta}>
          Construyamos →
        </Link>

        {/* TODO: Mobile menu — implement in next iteration */}
        <button className={styles.mobileMenuButton} aria-label="Abrir menú" aria-expanded="false">
          <span className={styles.mobileMenuIcon} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
