import { useEffect } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, Terminal as TerminalIcon } from "lucide-react";
import Button from "../components/Button";

const sections = ["home", "about", "projects", "skills", "contact"];

export default function NotFound() {
  const path = window.location.pathname;

  // Tell the browser + search engines this is not a real page.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "404 · Page not found";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);

    return () => {
      document.title = previousTitle;
      meta.remove();
    };
  }, []);

  const line = (index: number): CSSProperties =>
    ({ ["--i" as string]: index }) as CSSProperties;

  return (
    <main className="notfound">
      <a className="wordmark notfound__brand" href="/">
        PARI
      </a>

      <div className="notfound__head">
        <p className="mono">Error 404 · Page not found</p>

        <h1 className="notfound__code" aria-label="404">
          <span aria-hidden="true">4</span>
          <span className="notfound__orb" aria-hidden="true" />
          <span aria-hidden="true">4</span>
        </h1>
      </div>

      <div className="notfound__terminal" aria-hidden="true">
        <div className="notfound__bar">
          <span className="notfound__dots">
            <span />
            <span />
            <span />
          </span>
          <span className="notfound__title">
            <TerminalIcon size={13} />
            pari@portfolio
          </span>
          <span />
        </div>

        <div className="notfound__body">
          <p className="notfound__line" style={line(0)}>
            <span className="t-prompt">pari</span>
            <span className="t-sep">@</span>
            <span className="t-path">~/portfolio</span>
            <span className="t-symbol">$</span> cd {path}
          </p>

          <p className="notfound__line notfound__error" style={line(1)}>
            bash: cd: {path}: No such file or directory
          </p>

          <p className="notfound__line" style={line(2)}>
            <span className="t-prompt">pari</span>
            <span className="t-sep">@</span>
            <span className="t-path">~/portfolio</span>
            <span className="t-symbol">$</span> ls ./sections
          </p>

          <p className="notfound__line notfound__ls" style={line(3)}>
            {sections.join("   ")}
          </p>

          <p className="notfound__line" style={line(4)}>
            <span className="t-prompt">pari</span>
            <span className="t-sep">@</span>
            <span className="t-path">~/portfolio</span>
            <span className="t-symbol">$</span>
            <span className="notfound__caret" />
          </p>
        </div>
      </div>

      <div className="notfound__actions">
        <Button href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          &nbsp;Back to home
        </Button>

        <ul className="notfound__links">
          {sections.slice(1).map((name) => (
            <li key={name}>
              <a href={`/#${name}`}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}