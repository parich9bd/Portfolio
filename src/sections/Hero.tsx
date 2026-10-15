import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import gsap from "gsap";
import { ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import Button from "../components/Button";
import SceneHost from "../three/SceneHost";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Typewriter from "typewriter-effect";

type TerminalEntry = {
  command: string;
  output: string[];
};

const initialEntries: TerminalEntry[] = [
  {
    command: "",
    output: [
      "Welcome to PARI shell.",
      "Frontend Developer | React & Next.js",
      'Type "help" to explore.',
    ],
  },
];

const commandHelp = [
  "Available commands:",
  "  help      Show available commands",
  "  whoami    About the developer",
  "  stack     View technologies",
  "  about     Go to About",
  "  projects  Explore selected projects",
  "  skills    View technical skills",
  "  contact   Get in touch",
  "  clear     Clear terminal",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();

  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>(initialEntries);

  // زبان این بخش مستقل از سایر بخش‌های سایت است.
  const [heroLanguage, setHeroLanguage] = useState<"en" | "fa">("en");
  const isFa = heroLanguage === "fa";

  function toggleHeroLanguage() {
    setHeroLanguage((current) => (current === "en" ? "fa" : "en"));
  }

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero__line span", {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
        })
        .from(
          ".hero__meta > *",
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.5",
        )
        .from(
          ".hero-terminal",
          {
            x: 24,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.7",
        )
        .from(".scene", { opacity: 0, scale: 0.92, duration: 1.4 }, 0);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const body = terminalBodyRef.current;

    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }, [entries]);

  function handleCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = command.trim();
    if (!value) return;

    const normalized = value.toLowerCase();

    if (normalized === "clear") {
      setEntries([]);
      setCommand("");
      inputRef.current?.focus();
      return;
    }

    const responses: Record<string, string[]> = {
      help: commandHelp,

      whoami: [
        "Name: Parichehr",
        "Role: Frontend Developer",
        "Focus: React, Next.js, UI Engineering",
        "Location: Isfahan, Iran",
      ],

      stack: [
        "FRONTEND  React, Next.js, JavaScript",
        "STYLING   HTML, CSS, Tailwind CSS",
        "STATE     TanStack Query, Zustand",
        "BACKEND   Node.js, Express.js",
        "DATABASE  MariaDB, MySQL",
        "TOOLS     Git, GitHub, REST APIs",
      ],

      about: ["Navigating to About..."],
      projects: ["Opening selected projects..."],
      skills: ["Exploring technical skills..."],
      contact: ["Opening contact section..."],
    };

    const output = responses[normalized] ?? [
      `Command not found: ${value}`,
      'Type "help" to see available commands.',
    ];

    setEntries((previous) => [...previous, { command: value, output }]);

    setCommand("");

    const sectionMap: Record<string, string> = {
      about: "about",
      projects: "projects",
      skills: "skills",
      contact: "contact",
    };

    const target = sectionMap[normalized];

    if (target) {
      window.setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }, 150);
    }
  }

  return (
    <section id="home" className="hero" ref={root} aria-labelledby="hero-title">
      <SceneHost />

      <div className="hero__layout">
        <div className="hero__copy">
          <p className="mono hero__kicker">
            <Typewriter
              options={{
                strings: [
                  "Frontend Developer",
                  "React & Next.js Developer",
                  "Building immersive web experiences",
                ],
                autoStart: true,
                loop: true,
                delay: 55,
                deleteSpeed: 25,
                cursor: "|",
              }}
            />
          </p>

          <h1 id="hero-title">
            <span className="sr-only">{site.brand}: </span>

            {site.headline.map((line) => (
              <span className="hero__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero__meta">
            <div className="hero__description">
              <p dir={isFa ? "rtl" : "ltr"}>
                {isFa
                  ? "من تجربه‌های دیجیتال هدفمند می‌سازم؛ جایی که طراحی خلاقانه با کدنویسی تمیز و قابل‌اعتماد ترکیب می‌شود."
                  : site.intro}
              </p>

              <button
                type="button"
                className="section-language-toggle"
                onClick={toggleHeroLanguage}
                aria-label={isFa ? "Switch to English" : "تغییر به فارسی"}
                title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              >
                {isFa ? "EN ↗" : "فا ↗"}
              </button>
            </div>

            <div className="row">
              <Button href="#projects">
                {isFa ? "مشاهده پروژه‌ها" : "Explore my work"}
              </Button>

              <Button href="#contact" variant="ghost">
                {isFa ? "ارتباط با من" : "Let’s connect"}
              </Button>
            </div>
          </div>
        </div>

        <aside
          className="hero-terminal"
          aria-label="Interactive developer terminal"
        >
          <div className="hero-terminal__header">
            <div className="hero-terminal__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="hero-terminal__title">
              <TerminalIcon size={13} />
              <span>pari@portfolio</span>
            </div>

            <span className="hero-terminal__status">ONLINE</span>
          </div>

          <div
            className="hero-terminal__body"
            ref={terminalBodyRef}
            aria-live="polite"
            aria-relevant="additions"
          >
            {entries.map((entry, index) => (
              <div
                className="hero-terminal__entry"
                key={`${index}-${entry.command}`}
              >
                {entry.command && (
                  <div className="hero-terminal__command">
                    <span className="hero-terminal__prompt">pari</span>

                    <span className="hero-terminal__separator">@</span>

                    <span className="hero-terminal__path">~/portfolio</span>

                    <span className="hero-terminal__symbol">$</span>

                    <span>{entry.command}</span>
                  </div>
                )}

                {entry.output.map((line, lineIndex) => (
                  <p
                    className="hero-terminal__output"
                    key={`${lineIndex}-${line}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <form className="hero-terminal__form" onSubmit={handleCommand}>
            <label className="hero-terminal__prompt" htmlFor="terminal-command">
              pari
            </label>

            <span className="hero-terminal__separator">@</span>

            <label className="hero-terminal__path" htmlFor="terminal-command">
              ~/portfolio
            </label>

            <span className="hero-terminal__symbol">$</span>

            <input
              ref={inputRef}
              id="terminal-command"
              className="hero-terminal__input"
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Enter a terminal command"
              placeholder="type a command..."
            />

            <button
              className="hero-terminal__submit"
              type="submit"
              aria-label="Run command"
              title="Run command"
            >
              <ArrowUpRight size={16} />
            </button>
          </form>

          <div className="hero-terminal__footer">
            <span>INTERACTIVE SHELL</span>
            <span>UTF-8</span>
          </div>
        </aside>
      </div>

      <a className="scroll-cue mono" href="#about">
        {isFa ? "پیمایش" : "Scroll"}
      </a>
    </section>
  );
}
