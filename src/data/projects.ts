export interface Project {
  title: string;
  category: string;
  description: string;
  stack: string[];
  live?: string;
  source?: string;
  hue: number;
  image?: string;
  caseStudy?: {
    problem: string;
    approach: string;
    implementation: string;
    results: string;
  };
}

export const projects: Project[] = [
  {
    title: "Shappet",
    category: "Full-Stack E-Commerce",
    description:
      "A full-stack pet shop platform featuring product discovery, search, wishlists, shopping cart, checkout UI, order tracking, and an admin dashboard. Built with Next.js, Express.js, and MariaDB.",
    stack: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MariaDB",
      "JWT",
    ],
    hue: 160,
    image: "/images/shappet.webp",
    caseStudy: {
      problem:
        "Build a complete online pet shop with customer-facing shopping features and administrative tools.",
      approach:
        "Separate the frontend, backend API, database, and admin functionality into maintainable application layers.",
      implementation:
        "Developed reusable interfaces, REST APIs, product CRUD operations, JWT authentication, and role-based access control.",
      results:
        "Delivered a deployed full-stack e-commerce application with persistent data and product and order management features.",
    },
  },
  {
    title: "Torino",
    category: "Travel & Booking Platform",
    description:
      "A responsive travel platform for discovering tours, filtering destinations and dates, viewing tour details, booking tickets, and managing user accounts.",
    stack: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Yup",
    ],
    hue: 200,
    image: "/images/torino.webp",
    caseStudy: {
      problem:
        "Create a responsive travel booking experience with tour discovery, date-based search, and user account flows.",
      approach:
        "Organize the application into reusable components and distinct public, authentication, booking, and dashboard sections.",
      implementation:
        "Used TanStack Query for server-state management, Zustand for shared client state, and React Hook Form with Yup for form validation.",
      results:
        "Built a modular travel application interface with reusable layouts, search filters, Persian date selection, and booking-related user flows.",
    },
  },
  {
    title: "Nava",
    category: "Website Development",
    description:
      "A responsive psychology-focused website featuring custom typography, reusable layouts, audio content, and article presentation.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide React"],
    hue: 280,
    image: "/images/nava.webp",
    caseStudy: {
      problem:
        "Create a welcoming digital space for psychology-related content with a consistent visual identity.",
      approach:
        "Use responsive layouts, thoughtful typography, and reusable components to create a cohesive browsing experience.",
      implementation:
        "Built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide React.",
      results:
        "Delivered a responsive content-focused website with reusable UI components, audio content, and article presentation.",
    },
  },
];
