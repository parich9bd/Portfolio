export interface Project {
  title: string
  category: string
  description: string
  stack: string[]
  live?: string
  source?: string
  hue: number // drives the generated CSS artwork until you add a real image
  image?: string // optional: '/images/your-file.png' placed in public/images
  // Reserved for future case-study pages
  caseStudy?: { problem: string; approach: string; implementation: string; results: string }
}

export const projects: Project[] = [1, 2, 3, 4].map((n) => ({
  title: `[PROJECT ${n} TITLE]`,
  category: '[CATEGORY]',
  description: '[Short description of the project and your role.]',
  stack: ['[TECH]', '[TECH]', '[TECH]'],
  live: '[YOUR PROJECT URL]',
  source: '[YOUR SOURCE URL]',
  hue: [12, 200, 160, 280][n - 1],
}))
