import type { ReactNode } from 'react'

export default function Button({ href, variant = 'solid', children }: { href: string; variant?: 'solid' | 'ghost'; children: ReactNode }) {
  return <a className={`btn btn--${variant}`} href={href}>{children}</a>
}
