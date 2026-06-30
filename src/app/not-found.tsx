/**
 * 404 — Not Found
 * Brand voice: "Parece que ese camino no existe todavía."
 * Source: docs/06_USER_EXPERIENCE.md §VIII, docs/16_BUILD_BRIEF.md §II.6
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Container variant="narrow">
        <div className={styles.content}>
          <span className={styles.code}>404</span>
          <h1 className={styles.heading}>
            Parece que ese camino no existe todavía.
          </h1>
          <Link href="/" className={styles.link}>
            Empieza desde el principio →
          </Link>
        </div>
      </Container>
    </main>
  )
}
