import Hero from './Hero'
import ArgumentBlock from './ArgumentBlock'
import WorkPreviewBlock from './WorkPreviewBlock'
import ThoughtPreviewBlock from './ThoughtPreviewBlock'
import PersonBlock from './PersonBlock'
import InvitationBlock from './InvitationBlock'

// Homepage assembly — six blocks in order.
// WorkPreviewBlock and ThoughtPreviewBlock are async server components
// that fetch their own data independently.
// Source: docs/16_BUILD_BRIEF.md §II.1
export default function HomePage() {
  return (
    <>
      <Hero />
      <ArgumentBlock />
      <WorkPreviewBlock />
      <ThoughtPreviewBlock />
      <PersonBlock />
      <InvitationBlock />
    </>
  )
}
