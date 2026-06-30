import Link from 'next/link'
import styles from './Footer.module.css'

const FOOTER_LINKS = [
  { href: '/trabajo', label: 'Trabajo' },
  { href: '/pensamiento', label: 'Pensamiento' },
  { href: '/sobre', label: 'Sobre Neil' },
  { href: '/construyamos', label: 'Construyamos' },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.logo} aria-label="Neil Meza — Inicio">
            Neil Meza
          </Link>

          <nav className={styles.nav} aria-label="Navegación del pie de página">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Neil Meza. Antofagasta, Chile.
          </p>

          <address className={styles.contact}>
            <a href="mailto:contact@neilmeza.com" className={styles.email}>
              contact@neilmeza.com
            </a>
          </address>
        </div>
      </div>
    </footer>
  )
}
