import type { ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerVariant = 'default' | 'narrow' | 'essay' | 'wide'

interface ContainerProps {
  children: ReactNode
  variant?: ContainerVariant
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
}

// Max-width wrapper. Variants match the measure tokens in tokens.css.
// default → --max-width-content (1200px) — full content width
// narrow  → --max-width-text   (720px)  — section text blocks
// essay   → --max-width-essay  (640px)  — essay body column
// wide    → unconstrained to content width (rare)
export default function Container({
  children,
  variant = 'default',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={[
        styles.container,
        styles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
