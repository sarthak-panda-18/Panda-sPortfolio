/**
 * Single source of truth for all portfolio content.
 * Edit this file directly to update text, links, stats, and project details.
 */

export const profile = {
  name: "Sarthak Panda",
  roles: [
    "Full-Stack Developer",
    "React and Node.js Builder",
    "Curious Problem Solver",
  ],
  intro: "Undergraduate software engineer passionate about building reliable full-stack applications with clean architecture and intentional design.",
  location: "Andhra Pradesh, India",
  email: "sarthakpanda.outlook@gmail.com",
};

export const hero = {
  primaryCta: "View my work",
  secondaryCta: "Get in touch",
  scrollCue: "Scroll",
};

export const social = {
  github: "https://github.com/sarthak-panda-18",
  linkedin: "", // TODO: Add LinkedIn profile URL
  leetcode: "https://leetcode.com/u/sarthak-pandaa/",
  codechef: "https://www.codechef.com/users/sarthakpanda17",
  hackerrank: "",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  summary:
    "Software engineer driven by curiosity and hands-on learning. Experienced with full-stack development, database design, and production deployment. Passionate about understanding how everything works, from backend systems to frontend performance, and building scalable solutions that matter.",
};

export const stats = [
  {
    value: "4+",
    label: "Production deployments",
  },
  {
    value: "500+",
    label: "Students supported",
  },
];

export const skills = {
  Languages: ["JavaScript", "Python", "Java", "C", "SQL", "TypeScript"],
  Frontend: ["React", "Tailwind CSS", "HTML5", "CSS3", "Next.js"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Databases: ["PostgreSQL", "MongoDB", "Prisma ORM"],
  Authentication: ["JWT", "Bcryptjs", "OAuth (Google)"],
  "Tools and Deployment": ["Git", "GitHub", "VS Code", "Vercel", "Render", "Neon"],
  "Core CS": [
    "Data Structures",
    "OOP",
    "DBMS",
    "Operating Systems",
    "System Design",
  ],
};

export const projects = [
  {
    id: "skilltrack-ai",
    title: "SkillTrack AI",
    tag: "Skilling Outcome and Impact Intelligence Platform",
    summary:
      "Full-stack SaaS for placement-readiness assessment, built with a team and supporting 500+ student users. React dashboard with real-time analytics and competency tracking (Recharts). MongoDB schemas and Node/Express APIs with Google Gemini for AI-driven skill-gap analysis. Deployed on Vercel and Render with JWT authentication.",
    highlights: [
      "Built responsive React dashboard with real-time analytics and competency tracking via Recharts",
      "Designed MongoDB schemas and Node/Express APIs integrated with Google Gemini for skill-gap insights",
      "Secured application with JWT authorization and deployed production builds to Vercel and Render",
      "Collaborated in a team environment serving 500+ active student users",
    ],
    stack: [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "JWT",
      "Google Gemini",
      "Recharts",
      "Vercel",
      "Render",
    ],
    liveUrl: "https://skill-track-inky.vercel.app/",
    liveActionText: "Visit Live Platform",
    githubUrl: "https://github.com/sarthak-panda-18/SkillTrack",
    image: "",
  },
  {
    id: "get-your-tasks-done",
    title: "GetYourTasksDone",
    tag: "Full-Stack Task Management App",
    summary:
      "Secure platform to create, prioritize and track tasks with persistent storage. PostgreSQL schema and 6 REST endpoints using Prisma ORM with per-user data isolation. Responsive React frontend with JWT auth and bcrypt password hashing, deployed on Vercel and Render.",
    highlights: [
      "Architected PostgreSQL relational schema and 6 REST endpoints using Prisma ORM",
      "Ensured strict per-user data isolation, JWT authentication, and bcrypt password hashing",
      "Created dynamic, responsive React interface with task categorization and state management",
      "Configured continuous cloud deployment on Vercel and Render",
    ],
    stack: [
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Prisma ORM",
      "PostgreSQL",
      "REST API",
      "JWT",
      "Bcryptjs",
      "Vercel",
      "Render",
    ],
    liveUrl: "https://get-your-tasks-done.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/GetYourTasksDone",
    image: "",
  },
  {
    id: "land-use-land-cover",
    title: "Land Use Land Cover (LULC)",
    tag: "Satellite Imagery Geospatial Classification",
    summary:
      "End-to-end Land Use & Land Cover classification system for Sentinel-2 satellite imagery over the Vijayawada region. Features comparative machine learning approaches for multi-spectral land classification.",
    highlights: [
      "Implemented pixel-level Random Forest and patch-level convolutional classification pipelines",
      "Processed Sentinel-2 multi-spectral satellite imagery with geospatial preprocessing and band indices",
      "Evaluated spatial accuracy across urban, water, vegetation, and agricultural land classes",
      "Built with Python, Scikit-learn, Rasterio, and geospatial scientific libraries",
    ],
    stack: [
      "Python",
      "Machine Learning",
      "Random Forest",
      "Sentinel-2",
      "Rasterio",
      "Scikit-learn",
      "Geospatial AI",
      "NumPy",
    ],
    liveUrl: "https://land-use-land-cover.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/LandUseLandCover",
    image: "",
  },
  {
    id: "movie-desk",
    title: "MovieDesk",
    tag: "Modern Movie Discovery & Rating Platform",
    summary:
      "A modern movie discovery web application powered by the TMDB API featuring trending films, curated genre collections, dynamic search, detailed ratings, and responsive layout.",
    highlights: [
      "Integrated TMDB REST API for real-time trending movies, genre filtering, and cast metadata",
      "Implemented fast search with debounced query handling and fluid media card rendering",
      "Designed responsive UI with interactive star ratings, modal previews, and bookmarking states",
      "Optimized client-side rendering and asset caching for smooth mobile responsiveness",
    ],
    stack: [
      "JavaScript",
      "React",
      "Tailwind CSS",
      "TMDB API",
      "REST API",
      "Vercel",
    ],
    liveUrl: "https://moviedeskv1.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/MovieDesk",
    image: "",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Prasad V. Potluri Siddhartha Institute of Technology",
    period: "2024 to Present",
    score: "CGPA 7.98",
    description:
      "Undergraduate curriculum covering Data Structures, Algorithms, Database Management, Operating Systems, and Object-Oriented Software Engineering.",
  },
];

export const certifications = [
  {
    title: "Python Foundation",
    issuer: "Infosys Springboard",
  },
  {
    title: "Problem Solving - Intermediate",
    issuer: "HackerRank",
  },
  {
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
  },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    url: "https://leetcode.com/u/sarthak-pandaa/",
    handle: "sarthak-pandaa",
  },
  {
    platform: "CodeChef",
    url: "https://www.codechef.com/users/sarthakpanda17",
    handle: "sarthakpanda17",
  },
];

export const contact = {
  heading: "Let's build something thoughtful together.",
  paragraph:
    "Whether you have an internship opportunity, a software engineering role, or an interesting engineering problem to discuss, I'd love to connect.",
  availability: "Open to internships and software engineer roles",
  email: "sarthakpanda.outlook@gmail.com",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} Sarthak Panda. Handcrafted with warm earth aesthetics.`,
};
