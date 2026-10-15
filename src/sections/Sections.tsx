import SectionHeading from "../components/SectionHeading";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { experience } from "../data/experience";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useState } from "react";

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

  // زبان این بخش مستقل از سایر بخش‌هاست.
  const [aboutLanguage, setAboutLanguage] = useState<"en" | "fa">("en");
  const isFa = aboutLanguage === "fa";

  function toggleAboutLanguage() {
    setAboutLanguage((current) => (current === "en" ? "fa" : "en"));
  }

  const content = isFa
    ? {
        intro:
          "من یک توسعه‌دهنده فرانت‌اند هستم که به ساخت تجربه‌های وب متمایز علاقه دارم؛ تجربه‌هایی که طراحی سنجیده، تعاملات روان و مهندسی اصولی را در کنار هم قرار می‌دهند.",
        background:
          "تمرکز من بر توسعه مدرن فرانت‌اند است. با استفاده از JavaScript، TypeScript و React اپلیکیشن‌های وب واکنش‌گرا و قابل نگهداری می‌سازم.",
        philosophy:
          "رابط کاربری خوب فقط نباید زیبا باشد؛ باید قابل‌فهم، روان و استفاده از آن آسان باشد و تعاملات پیچیده را ساده کند.",
        interests:
          "توسعه خلاقانه فرانت‌اند، تجربه‌های تعاملی، انیمیشن وب، سیستم‌های طراحی، مهندسی رابط کاربری و قابلیت‌های در حال تحول وب مدرن.",
        approach:
          "کار را با درک مسئله شروع می‌کنم، ساختار مناسبی برای پیاده‌سازی انتخاب می‌کنم و جزئیات را با تکرار و بازبینی بهبود می‌دهم. کیفیت کد، دسترس‌پذیری، عملکرد و یکپارچگی در دستگاه‌های مختلف برایم اهمیت دارند.",
      }
    : a;

  const labels = isFa
    ? {
        background: "سوابق و زمینه کاری",
        philosophy: "فلسفه کاری",
        interests: "علاقه‌مندی‌ها",
        approach: "رویکرد کاری",
      }
    : {
        background: "Background",
        philosophy: "Philosophy",
        interests: "Interests",
        approach: "Approach",
      };

  return (
    <section
      id="about"
      className="sec"
      aria-labelledby="about-h"
      dir={isFa ? "rtl" : "ltr"}
    >
      <SectionHeading index="01" id="about-h">
        {isFa ? "درباره من" : "About"}
      </SectionHeading>

      <div className="about">
        <figure className="about__photo reveal">
          <img
            src="/pari.webp"
            alt={
              isFa
                ? "پریچهر، توسعه‌دهنده خلاق فرانت‌اند"
                : "Parichehr, Creative Frontend Developer"
            }
            loading="lazy"
            decoding="async"
          />

          <figcaption className="about__badge mono">
            {isFa
              ? "توسعه‌دهنده خلاق فرانت‌اند"
              : "CREATIVE FRONTEND DEVELOPER"}
          </figcaption>
        </figure>

        <div className="about__text reveal">
          <div className="about__intro">
            <p className="lead" dir={isFa ? "rtl" : "ltr"}>
              {content.intro}
            </p>

            <button
              type="button"
              className="section-language-toggle"
              onClick={toggleAboutLanguage}
              aria-label={isFa ? "Switch to English" : "تغییر به فارسی"}
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
            >
              {isFa ? "EN ↗" : "فا ↗"}
            </button>
          </div>

          <dl>
            <dt>{labels.background}</dt>
            <dd>{content.background}</dd>

            <dt>{labels.philosophy}</dt>
            <dd>{content.philosophy}</dd>

            <dt>{labels.interests}</dt>
            <dd>{content.interests}</dd>

            <dt>{labels.approach}</dt>
            <dd>{content.approach}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const [projectsLanguage, setProjectsLanguage] = useState<"en" | "fa">("en");
  const isFa = projectsLanguage === "fa";

  function toggleProjectsLanguage() {
    setProjectsLanguage((current) => (current === "en" ? "fa" : "en"));
  }

  const translations: Record<
    string,
    {
      category: string;
      description: string;
      caseStudy?: {
        problem: string;
        approach: string;
        implementation: string;
        results: string;
      };
    }
  > = {
    Shappet: {
      category: "فروشگاه اینترنتی حیوانات خانگی",
      description:
        "یک پلتفرم فروشگاهی فول‌استک برای حیوانات خانگی، شامل جست‌وجو و کشف محصولات، فهرست علاقه‌مندی‌ها، سبد خرید، رابط پرداخت، پیگیری سفارش‌ها و پنل مدیریت. توسعه‌یافته با Next.js، Express.js و MariaDB.",
      caseStudy: {
        problem:
          "ساخت یک فروشگاه اینترنتی کامل با امکانات خرید برای مشتریان و ابزارهای مدیریتی.",
        approach:
          "تفکیک فرانت‌اند، API بک‌اند، پایگاه داده و قابلیت‌های مدیریتی به لایه‌هایی مستقل و قابل نگهداری.",
        implementation:
          "توسعه رابط‌های کاربری قابل استفاده مجدد، REST API، عملیات ایجاد و مدیریت محصولات، احراز هویت JWT و کنترل دسترسی مبتنی بر نقش.",
        results:
          "پیاده‌سازی یک اپلیکیشن فروشگاهی فول‌استک با داده‌های پایدار و قابلیت مدیریت محصولات و سفارش‌ها.",
      },
    },

    Torino: {
      category: "پلتفرم گردشگری و رزرو",
      description:
        "یک پلتفرم واکنش‌گرا برای کشف تورها، فیلتر مقصد و تاریخ، مشاهده جزئیات تور، رزرو بلیت و مدیریت حساب کاربری.",
      caseStudy: {
        problem:
          "ایجاد تجربه‌ای واکنش‌گرا برای رزرو سفر، همراه با جست‌وجوی تورها بر اساس تاریخ و کشف مقصدها.",
        approach:
          "سازمان‌دهی اپلیکیشن با کامپوننت‌های قابل استفاده مجدد و بخش‌های مستقل برای صفحات عمومی، احراز هویت، رزرو و داشبورد.",
        implementation:
          "استفاده از TanStack Query برای مدیریت داده‌های سرور، Zustand برای وضعیت مشترک سمت کاربر و React Hook Form به همراه Yup برای اعتبارسنجی فرم‌ها.",
        results:
          "ساخت رابطی ماژولار برای اپلیکیشن گردشگری، با چیدمان‌های قابل استفاده مجدد، فیلترهای جست‌وجو، انتخاب تاریخ شمسی و فرایندهای مرتبط با رزرو.",
      },
    },

    Nava: {
      category: "توسعه وب‌سایت",
      description:
        "یک وب‌سایت واکنش‌گرا با محوریت روان‌شناسی که از تایپوگرافی اختصاصی، چیدمان‌های قابل استفاده مجدد، محتوای صوتی و نمایش مقاله‌ها بهره می‌برد.",
      caseStudy: {
        problem:
          "ایجاد فضایی دیجیتال و خوشایند برای محتوای مرتبط با روان‌شناسی، با هویت بصری یکپارچه.",
        approach:
          "استفاده از چیدمان‌های واکنش‌گرا، تایپوگرافی سنجیده و کامپوننت‌های قابل استفاده مجدد برای ایجاد تجربه‌ای منسجم.",
        implementation:
          "توسعه با Next.js App Router، زبان TypeScript، فریم‌ورک Tailwind CSS و کتابخانه Lucide React.",
        results:
          "ارائه یک وب‌سایت واکنش‌گرا با تمرکز بر محتوا، کامپوننت‌های رابط کاربری قابل استفاده مجدد، محتوای صوتی و نمایش مقاله‌ها.",
      },
    },
  };

  return (
    <section
      id="projects"
      className="sec"
      aria-labelledby="work-h"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="projects__heading">
        <SectionHeading index="02" id="work-h">
          {isFa ? "پروژه‌های منتخب" : "Selected work"}
        </SectionHeading>

        <button
          type="button"
          className="section-language-toggle"
          onClick={toggleProjectsLanguage}
          aria-label={isFa ? "Switch to English" : "تغییر به فارسی"}
          title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
        >
          {isFa ? "EN ↗" : "فا ↗"}
        </button>
      </div>

      <ol className="work">
        {projects.map((p, i) => {
          const translated = translations[p.title];
          const category = isFa
            ? (translated?.category ?? p.category)
            : p.category;
          const description = isFa
            ? (translated?.description ?? p.description)
            : p.description;

          return (
            <li
              key={p.title}
              className={`proj reveal ${i % 2 ? "proj--flip" : ""}`}
            >
              <div
                className="proj__art"
                style={{ ["--h" as string]: p.hue }}
                role="img"
                aria-label={
                  isFa ? `پیش‌نمایش پروژه ${p.title}` : `${p.title} preview`
                }
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.hidden = true;
                    }}
                  />
                )}
              </div>

              <div className="proj__body">
                <span className="mono">
                  {String(i + 1).padStart(2, "0")} / {category}
                </span>

                <h3>{p.title}</h3>

                <p>{description}</p>

                <ul className="tags">
                  {p.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                {isFa && translated?.caseStudy && (
                  <details className="proj__case-study">
                    <summary>جزئیات پروژه</summary>

                    <dl>
                      <dt>مسئله</dt>
                      <dd>{translated.caseStudy.problem}</dd>

                      <dt>راهکار</dt>
                      <dd>{translated.caseStudy.approach}</dd>

                      <dt>پیاده‌سازی</dt>
                      <dd>{translated.caseStudy.implementation}</dd>

                      <dt>نتیجه</dt>
                      <dd>{translated.caseStudy.results}</dd>
                    </dl>
                  </details>
                )}

                {!isFa && p.caseStudy && (
                  <details className="proj__case-study">
                    <summary>Case study</summary>

                    <dl>
                      <dt>Problem</dt>
                      <dd>{p.caseStudy.problem}</dd>

                      <dt>Approach</dt>
                      <dd>{p.caseStudy.approach}</dd>

                      <dt>Implementation</dt>
                      <dd>{p.caseStudy.implementation}</dd>

                      <dt>Results</dt>
                      <dd>{p.caseStudy.results}</dd>
                    </dl>
                  </details>
                )}

                <div className="row">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      {isFa ? "مشاهده پروژه" : "Live project"}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}

                  {p.source && (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} aria-hidden="true" />
                      {isFa ? "کد منبع" : "Source"}
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
export function Skills() {
  const [skillsLanguage, setSkillsLanguage] = useState<"en" | "fa">("en");
  const isFa = skillsLanguage === "fa";

  const groupTranslations: Record<string, string> = {
    "Frontend Development": "توسعه فرانت‌اند",
    "Styling and UI Engineering": "استایل‌دهی و مهندسی رابط کاربری",
    "State Management and Data Fetching":
      "مدیریت وضعیت و دریافت داده‌ها",
    "Backend Development": "توسعه بک‌اند",
    Databases: "پایگاه‌های داده",
    "Tools and Workflow": "ابزارها و گردش کار",
  };

  return (
    <section
      id="skills"
      className="sec"
      aria-labelledby="skills-h"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="skills__heading">
        <SectionHeading index="03" id="skills-h">
          {isFa ? "مهارت‌ها" : "Skills"}
        </SectionHeading>

        <button
          type="button"
          className="section-language-toggle"
          onClick={() =>
            setSkillsLanguage((current) =>
              current === "en" ? "fa" : "en",
            )
          }
          aria-label={isFa ? "Switch to English" : "تغییر به فارسی"}
          title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
        >
          {isFa ? "EN ↗" : "فا ↗"}
        </button>
      </div>

      <div className="skills">
        {Object.entries(skills).map(([group, list]) => (
          <div key={group} className="reveal">
            <h3>
              {isFa ? groupTranslations[group] ?? group : group}
            </h3>

            <ul className="tags">
              {list.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Experience() {
  const [experienceLanguage, setExperienceLanguage] = useState<"en" | "fa">(
    "en",
  );

  const isFa = experienceLanguage === "fa";

  const translations: Record<
    string,
    {
      title: string;
      company: string;
      dates: string;
      points: string[];
    }
  > = {
    "Frontend Developer": {
      title: "توسعه‌دهنده فرانت‌اند",
      company: "پروژه‌های مستقل",
      dates: "۲۰۲۲ — تاکنون",
      points: [
        "توسعه اپلیکیشن‌های وب واکنش‌گرا با استفاده از React، Next.js، JavaScript و Tailwind CSS.",
        "توسعه کامپوننت‌های رابط کاربری قابل استفاده مجدد و رابط‌های تعاملی با تمرکز بر سهولت استفاده و نگهداری‌پذیری.",
        "اتصال به REST APIها و پیاده‌سازی قابلیت‌های فرانت‌اند برای احراز هویت، فرم‌ها، جست‌وجو، فیلترکردن و مدیریت داده‌ها.",
        "استفاده از TanStack Query و Zustand برای مدیریت وضعیت داده‌های سرور و وضعیت مشترک اپلیکیشن.",
        "استفاده از Git و GitHub برای کنترل نسخه، اشکال‌زدایی اپلیکیشن و انجام فرایندهای استقرار و رفع مشکلات محیط عملیاتی.",
      ],
    },
  };

  if (!site.showExperience) return null;

  return (
    <section
      id="experience"
      className="sec"
      aria-labelledby="exp-h"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="experience__heading">
        <SectionHeading index="04" id="exp-h">
          {isFa ? "سوابق کاری" : "Experience"}
        </SectionHeading>

        <button
          type="button"
          className="section-language-toggle"
          onClick={() =>
            setExperienceLanguage((current) =>
              current === "en" ? "fa" : "en",
            )
          }
          aria-label={isFa ? "Switch to English" : "تغییر به فارسی"}
          title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
        >
          {isFa ? "EN ↗" : "فا ↗"}
        </button>
      </div>

      <ol className="timeline">
        {experience.map((item, i) => {
          const translated = translations[item.title];

          return (
            <li key={`${item.title}-${i}`} className="reveal">
              <span className="mono">
                {isFa
                  ? translated?.dates ?? item.dates
                  : item.dates}
              </span>

              <h3>
                {isFa
                  ? translated?.title ?? item.title
                  : item.title}

                {" "}
                <em>
                  ·{" "}
                  {isFa
                    ? translated?.company ?? item.company
                    : item.company}
                </em>
              </h3>

              <ul>
                {item.points.map((point, j) => (
                  <li key={j}>
                    {isFa
                      ? translated?.points[j] ?? point
                      : point}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}


export function Process() {
  const [processLanguage, setProcessLanguage] = useState<"en" | "fa">("en");
  const isFa = processLanguage === "fa";

  const translations = [
    {
      title: "درک مسئله",
      description:
        "اهداف پروژه را مشخص می‌کنم، نیازهای کاربران را می‌سنجم و نیازمندی‌ها را به وظایفی روشن و قابل مدیریت تقسیم می‌کنم.",
    },
    {
      title: "ساختاربندی",
      description:
        "ساختار اپلیکیشن را برنامه‌ریزی می‌کنم، کامپوننت‌ها را سازمان‌دهی می‌کنم و ابزارهای مناسب برای توسعه فرانت‌اندی قابل نگهداری را انتخاب می‌کنم.",
    },
    {
      title: "پیاده‌سازی",
      description:
        "ایده‌ها را با استفاده از React، Next.js و Tailwind CSS به رابط‌های واکنش‌گرا تبدیل می‌کنم؛ با کامپوننت‌های قابل استفاده مجدد و تعاملات سنجیده.",
    },
    {
      title: "یکپارچه‌سازی",
      description:
        "REST APIها را متصل می‌کنم، وضعیت اپلیکیشن را مدیریت می‌کنم، فرم‌ها را پیاده‌سازی می‌کنم و جریان‌های کاربری قابل اعتماد می‌سازم.",
    },
    {
      title: "بهینه‌سازی و انتشار",
      description:
        "واکنش‌گرایی رابط را آزمایش می‌کنم، باگ‌ها را برطرف می‌کنم، تجربه کاربری را بهبود می‌دهم و اپلیکیشن را برای انتشار آماده می‌کنم.",
    },
  ];

  return (
    <section
      id="process"
      className="sec"
      aria-labelledby="proc-h"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="process__heading">
        <SectionHeading index="05" id="proc-h">
          {isFa ? "فرایند کاری من" : "Process"}
        </SectionHeading>

        <button
          type="button"
          className="section-language-toggle"
          onClick={() =>
            setProcessLanguage((current) =>
              current === "en" ? "fa" : "en",
            )
          }
          aria-label={isFa ? "Switch to English" : "تغییر به فارسی"}
          title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
        >
          {isFa ? "EN ↗" : "فا ↗"}
        </button>
      </div>

      <ol className="process">
        {site.process.map(([number, title, description], index) => (
          <li key={number} className="reveal">
            <span className="mono">{number}</span>

            <h3>
              {isFa ? translations[index].title : title}
            </h3>

            <p>
              {isFa ? translations[index].description : description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}