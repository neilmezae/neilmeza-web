import type { MDXComponents } from 'mdx/types'

// Required by @next/mdx for App Router.
// Extend this to provide custom MDX components (e.g. prose wrappers, custom headings).
// See: https://nextjs.org/docs/app/building-your-application/configuring/mdx
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
