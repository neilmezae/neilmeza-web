import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Essay } from '@/lib/content'
import Container from '@/components/layout/Container'
import EssayHeader from './EssayHeader'
import EssayConnections from './EssayConnections'
import ReadingProgress from './ReadingProgress'
import styles from './EssayPage.module.css'

interface EssayPageProps {
  essay: Essay
}

// Full layout for a single essay page.
// ReadingProgress is a client component — renders a fixed bar above the NavBar.
// Source: docs/16_BUILD_BRIEF.md §II.3, docs/05_INFORMATION_ARCHITECTURE.md §IV
export default function EssayPage({ essay }: EssayPageProps) {
  const { content, relatedCases } = essay

  return (
    <main>
      {/* Fixed bar — appears above everything, does not affect flow */}
      <ReadingProgress />

      <article>
        <Container variant="narrow">
          <EssayHeader essay={essay} />
        </Container>

        <Container variant="essay">
          <div className={styles.body}>
            {content ? (
              <div className="prose">
                <MDXRemote source={content} />
              </div>
            ) : (
              <p className={styles.placeholder}>Contenido en preparación.</p>
            )}
          </div>
        </Container>

        <Container variant="narrow">
          <EssayConnections relatedCases={relatedCases} />
        </Container>
      </article>
    </main>
  )
}
