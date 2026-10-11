import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = site.nav.filter(
    (n) => site.showExperience || n.id !== "experience",
  );
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a className="wordmark" href="#home" aria-label={`${site.brand} — home`}>
        {site.brand}
      </a>
      <nav
        id="primary-nav"
        className={open ? "is-open" : ""}
        aria-label="Primary"
      >
        <ul>
          {items.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="btn btn--solid nav__cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let’s connect
        </a>
      </nav>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
