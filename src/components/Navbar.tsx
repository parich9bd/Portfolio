import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = site.nav.filter(
    (n) => site.showExperience || n.id !== "experience",
  );

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}
    >
      <a
        className="wordmark"
        href="#home"
        aria-label={`${site.brand} — home`}
        onClick={close}
      >
        <img src="/Logo/2.jpg" alt="PARI" className="wordmark__logo" />
      </a>

      <nav
        id="primary-nav"
        className={`nav__menu ${open ? "is-open" : ""}`}
        aria-label="Primary"
      >
        <div className="nav__menu-header" aria-hidden="true">
          <span className="nav__menu-label">( NAVIGATION )</span>
          <span className="nav__menu-label">
            {String(items.length).padStart(2, "0")} SECTIONS
          </span>
        </div>

        <ul>
          {items.map((n, index) => (
            <li key={n.id} style={{ "--i": index } as CSSProperties}>
              <a href={`#${n.id}`} onClick={close}>
                <span className="nav__menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="nav__menu-text">{n.label}</span>
                <span className="nav__menu-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a className="btn btn--solid nav__cta" href="#contact" onClick={close}>
          Let’s connect <span aria-hidden="true">↗</span>
        </a>

        <div className="nav__menu-footer">
          <span>PARI®</span>
          <span>DESIGN · CODE · CREATE</span>
        </div>
      </nav>

      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav__burger" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
    </header>
  );
}