// ALL editable content lives in src/data/*. Everything below is a placeholder.
export const site = {
  brand: 'PARI',
  name: '[YOUR NAME]',
  title: '[CREATIVE DEVELOPER / FRONTEND ENGINEER]',
  headline: ['I BUILD', 'DIGITAL EXPERIENCES', 'THAT FEEL DIFFERENT.'],
  intro: '[Replace this text with a personal introduction.]',
  email: '[YOUR EMAIL]', // e.g. hello@example.com — used for the mailto link
  socials: [
    { label: 'GitHub', href: '[YOUR GITHUB URL]' },
    { label: 'LinkedIn', href: '[YOUR LINKEDIN URL]' },
  ],
  nav: [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ],
  about: {
    intro: '[YOUR INTRODUCTION]',
    background: '[YOUR PROFESSIONAL BACKGROUND]',
    philosophy: '[YOUR DEVELOPMENT PHILOSOPHY]',
    interests: '[YOUR AREAS OF INTEREST]',
    approach: '[YOUR WORKING APPROACH]',
  },
  process: [
    ['01', 'DISCOVER', 'Understand the goal, the audience and the constraints.'],
    ['02', 'DESIGN', 'Shape structure, type and motion before writing code.'],
    ['03', 'DEVELOP', 'Build small, typed, maintainable components.'],
    ['04', 'REFINE', 'Polish performance, accessibility and detail.'],
    ['05', 'SHIP', 'Deploy, measure and iterate.'],
  ] as const,
  showExperience: true, // set false to remove Experience (and its nav link) before launch
}
