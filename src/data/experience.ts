export interface Role {
  title: string;
  company: string;
  dates: string;
  points: string[];
}

export const experience: Role[] = [
  {
    title: "Frontend Developer",
    company: "Independent Projects",
    dates: "2022 — Present",
    points: [
      "Built responsive web applications using React, Next.js, JavaScript, and Tailwind CSS.",
      "Developed reusable UI components and interactive user interfaces with a focus on usability and maintainability.",
      "Integrated REST APIs and implemented frontend features for authentication, forms, search, filtering, and data management.",
      "Worked with TanStack Query and Zustand to manage server state and shared application state.",
      "Used Git and GitHub for version control, debugged application issues, and worked on deployment and production troubleshooting.",
    ],
  },
];
