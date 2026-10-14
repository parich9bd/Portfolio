import { ArrowUp, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { site } from "../data/site";

export default function Footer() {
  const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
  };

  return (
    <footer className="footer">
      <a
        className="wordmark"
        href="#home"
        aria-label={`${site.brand} — Back to home`}
      >
        {site.brand}
      </a>

      <small>
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </small>

      <ul className="footer__socials">
        {site.socials.map((s) => {
          const Icon = socialIcons[s.label as keyof typeof socialIcons];

          return (
            <li key={s.label}>
              <a
                className="footer__social-link"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${s.label} profile`}
              >
                {Icon && <Icon size={17} strokeWidth={1.8} />}
                <span>{s.label}</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>

      <a className="top" href="#home" aria-label="Back to top">
        <ArrowUp size={19} />
      </a>
    </footer>
  );
}
