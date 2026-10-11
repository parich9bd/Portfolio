import { ArrowUp } from 'lucide-react'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="wordmark">{site.brand}</span>
      <small>© {new Date().getFullYear()} {site.name}. All rights reserved.</small>
      <ul>{site.socials.map((s) => <li key={s.label}><a href={s.href} rel="noopener noreferrer">{s.label}</a></li>)}</ul>
      <a className="top" href="#home" aria-label="Back to top"><ArrowUp /></a>
    </footer>
  )
}
