import { MDXRemote } from 'next-mdx-remote/rsc'
import type { CaseStudy } from '@/lib/content'
import Container from '@/components/layout/Container'
import CaseStudyHeader from './CaseStudyHeader'
import CaseStudyConnections from './CaseStudyConnections'
import styles from './CaseStudyPage.module.css'

interface CaseStudyPageProps {
  caseStudy: CaseStudy
}

// Full layout for a single case study page.
// Source: docs/16_BUILD_BRIEF.md §II.2, docs/05_INFORMATION_ARCHITECTURE.md §IV
export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const { content, relatedEssays } = caseStudy

  return (
    <main>
      <article>
        <Container variant="narrow">
          <CaseStudyHeader caseStudy={caseStudy} />
        </Container>

        <Container variant="narrow">
          <div
            className={styles.content}
            aria-label="Contenido del caso de estudio"
          >
            {content ? (
              <div className="prose">
                <MDXRemote source={content} />
              </div>
            ) : (
              <p className={styles.contentPlaceholder}>
                Contenido en preparación.
              </p>
            )}
          </div>
        </Container>

        <Container variant="narrow">
          <CaseStudyConnections relatedEssays={relatedEssays} />
        </Container>
      </article>
    </main>
  )
}
