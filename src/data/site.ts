// All editable portfolio content lives in src/data/*.

export const site = {
  brand: "PARI",
  name: "Parichehr",
  title:
    "Frontend Developer , Context Engineer Building immersive digital experiences full-stack web applications",

  headline: ["I BUILD", "DIGITAL EXPERIENCES", "THAT FEEL DIFFERENT."],

  intro:
    "I build thoughtful digital experiences where creative design meets clean, reliable code.",

  email: "Parichehrabedzadeh@gmail.com",

  socials: [
    { label: "GitHub", href: "https://github.com/parichabd" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/zahra-abedzadeh-187a43434?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
  ],

  nav: [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ],

  about: {
    intro:
      "I'm a frontend developer passionate about creating distinctive web experiences that combine thoughtful design, smooth interactions, and solid engineering.",

    background:
      "My focus is modern frontend development, using JavaScript, TypeScript, and React to build responsive, maintainable web applications.",

    philosophy:
      "Great interfaces should be more than visually appealing. They should feel intuitive, perform smoothly, and make complex interactions feel effortless.",

    interests:
      "Creative frontend development, interactive experiences, web animation, design systems, UI engineering, and the evolving possibilities of the modern web.",

    approach:
      "I start by understanding the problem, build with a clear structure, and refine every detail through iteration. I value clean code, accessibility, performance, and consistency across devices.",
  },

  process: [
    [
      "01",
      "UNDERSTAND",
      "Define the project goals, understand user needs, and break the requirements into clear, manageable tasks.",
    ],
    [
      "02",
      "STRUCTURE",
      "Plan the application structure, organize components, and choose the right tools for a maintainable frontend.",
    ],
    [
      "03",
      "BUILD",
      "Turn ideas into responsive interfaces using React, Next.js, and Tailwind CSS, with reusable components and thoughtful interactions.",
    ],
    [
      "04",
      "INTEGRATE",
      "Connect REST APIs, manage application state, handle forms, and build reliable user flows across the application.",
    ],
    [
      "05",
      "REFINE & SHIP",
      "Test responsiveness, fix bugs, improve usability, and prepare the application for deployment.",
    ],
  ] as const,

  showExperience: true,
};
