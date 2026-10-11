// All editable portfolio content lives in src/data/*.

export const site = {
  brand: "PARI",
  name: "Parichehr",
  title:
    "Frontend Developer , Context Engineer Building immersive digital experiences full-stack web applications",

  headline: ["I BUILD", "DIGITAL EXPERIENCES", "THAT FEEL DIFFERENT."],

  intro:
    "I build thoughtful digital experiences where creative design meets clean, reliable code.",

  email: "YOUR_EMAIL@example.com",

  socials: [
    { label: "GitHub", href: "https://github.com/YOUR_USERNAME" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/YOUR_USERNAME" },
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
      "DISCOVER",
      "Understand the problem, the audience, and the goals behind every project.",
    ],
    [
      "02",
      "DESIGN",
      "Explore visual direction, typography, layout, and interactions to shape a distinctive experience.",
    ],
    [
      "03",
      "DEVELOP",
      "Build responsive interfaces with reusable components and maintainable code.",
    ],
    [
      "04",
      "REFINE",
      "Improve accessibility, performance, responsiveness, and the details that make a difference.",
    ],
    [
      "05",
      "SHIP",
      "Test, deploy, and continuously improve the experience based on real-world use.",
    ],
  ] as const,

  showExperience: true,
};
