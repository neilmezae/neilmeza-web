'use client'

import { useEffect, useState } from 'react'
import styles from './ReadingProgress.module.css'

// Thin progress bar fixed at the top of the viewport.
// Tracks reading progress through the essay body.
// Respects prefers-reduced-motion (transition disabled via CSS).
// Source: docs/16_BUILD_BRIEF.md §V, docs/06_USER_EXPERIENCE.md §XI
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={styles.fill}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
