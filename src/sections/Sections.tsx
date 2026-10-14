import SectionHeading from "../components/SectionHeading";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { experience } from "../data/experience";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";

export function Contact() {
  const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
  };

  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-h">
      <SectionHeading index="06" id="contact-h">
        Contact
      </SectionHeading>

      <p className="contact__big reveal">
        Let’s build something <em>unforgettable.</em>
      </p>

      <a className="btn btn--solid reveal" href={`mailto:${site.email}`}>
        {site.email}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>

      <ul className="social-links reveal">
        {site.socials.map((s) => {
          const Icon = socialIcons[s.label as keyof typeof socialIcons];

          return (
            <li key={s.label}>
              <a
                className="social-link"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${s.label} profile`}
              >
                <span className="social-link__icon">
                  {Icon && <Icon size={19} strokeWidth={1.8} />}
                </span>

                <span>{s.label}</span>

                <ArrowUpRight
                  className="social-link__arrow"
                  size={15}
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function About() {
  const a = site.about;
  return (
    <section id="about" className="sec" aria-labelledby="about-h">
      <SectionHeading index="01" id="about-h">
        About
      </SectionHeading>
      <div className="about">
        <figure className="about__photo reveal">
          <img
            src="/pari.webp"
            alt="Parichehr, Creative Frontend Developer"
            loading="lazy"
            decoding="async"
          />

          <figcaption className="about__badge mono">
            CREATIVE FRONTEND DEVELOPER
          </figcaption>
        </figure>
        <div className="about__text reveal">
          <p className="lead">{a.intro}</p>
          <dl>
            <dt>Background</dt>
            <dd>{a.background}</dd>
            <dt>Philosophy</dt>
            <dd>{a.philosophy}</dd>
            <dt>Interests</dt>
            <dd>{a.interests}</dd>
            <dt>Approach</dt>
            <dd>{a.approach}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="sec" aria-labelledby="work-h">
      <SectionHeading index="02" id="work-h">
        Selected work
      </SectionHeading>
      <ol className="work">
        {projects.map((p, i) => (
          <li key={i} className={`proj reveal ${i % 2 ? "proj--flip" : ""}`}>
            <div
              className="proj__art"
              style={{ ["--h" as string]: p.hue }}
              role="img"
              aria-label={`${p.title} preview placeholder`}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  onError={(e) => (e.currentTarget.hidden = true)}
                />
              )}
            </div>
            <div className="proj__body">
              <span className="mono">
                {String(i + 1).padStart(2, "0")} / {p.category}
              </span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ul className="tags">
                {p.stack.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ul>
              <div className="row">
                {p.live && (
                  <a href={p.live} rel="noopener noreferrer">
                    Live project <ArrowUpRight size={16} />
                  </a>
                )}
                {p.source && (
                  <a href={p.source} rel="noopener noreferrer">
                    <Github size={16} /> Source
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="sec" aria-labelledby="skills-h">
      <SectionHeading index="03" id="skills-h">
        Skills
      </SectionHeading>
      <div className="skills">
        {Object.entries(skills).map(([group, list]) => (
          <div key={group} className="reveal">
            <h3>{group}</h3>
            <ul className="tags">
              {list.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  if (!site.showExperience) return null;
  return (
    <section id="experience" className="sec" aria-labelledby="exp-h">
      <SectionHeading index="04" id="exp-h">
        Experience
      </SectionHeading>
      <ol className="timeline">
        {experience.map((r, i) => (
          <li key={i} className="reveal">
            <span className="mono">{r.dates}</span>
            <h3>
              {r.title} <em>· {r.company}</em>
            </h3>
            <ul>
              {r.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="sec" aria-labelledby="proc-h">
      <SectionHeading index="05" id="proc-h">
        Process
      </SectionHeading>
      <ol className="process">
        {site.process.map(([n, t, d]) => (
          <li key={n} className="reveal">
            <span className="mono">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
