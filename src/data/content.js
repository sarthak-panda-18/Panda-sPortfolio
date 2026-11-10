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
  linkedin: "https://www.linkedin.com/in/sarthak-panda-20267b378/",
  leetcode: "https://leetcode.com/u/sarthak-pandaa/",
  codechef: "https://www.codechef.com/users/sarthakpanda17",
  hackerrank: "",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Internships", href: "#internships" },
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
    value: "8+",
    label: "Production deployments",
  },
  {
    value: "500+",
    label: "Students supported",
  },
];

export const skills = {
  Languages: ["JavaScript", "Python", "Java", "C", "SQL", "TypeScript", "Dart"],
  Frontend: ["React", "Tailwind CSS", "HTML5", "CSS3", "Next.js", "Flutter"],
  Backend: ["Node.js", "Express.js", "REST APIs", "FastAPI"],
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
    id: "credit-lens",
    title: "CreditLens",
    tag: "Loan Affordability & Repayment Intelligence Platform",
    summary:
      "Full-stack FinTech web platform helping borrowers analyze true loan affordability, calculate reducing-balance EMIs, and evaluate monthly cashflow solvency. Features prepayment and borrowing-ceiling simulators, verified rates across 19+ Indian banks, and Google Gemini AI financial insights backed by Express APIs and MongoDB Atlas.",
    highlights: [
      "Built deterministic reducing-balance EMI, zero-balance amortization, and DTI solvency calculation engines",
      "Implemented prepayment, emergency runway, maximum loan capacity, and multi-loan comparison simulators",
      "Integrated Google Gemini AI financial assistant for personalized budget analysis and contextual Q&A",
      "Secured multi-tenant MongoDB Atlas persistence with JWT authentication, bcrypt hashing, and Vercel deployment",
    ],
    stack: [
      "JavaScript",
      "React",
      "Vite",
      "Recharts",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "JWT",
      "Bcryptjs",
      "Google Gemini",
      "Vercel",
    ],
    liveUrl: "https://credit-lens-orcin.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/CreditLens",
    image: "",
  },
  {
    id: "farmflow",
    title: "FarmFlow",
    tag: "Farm-to-Market Decision & Buyer Recommendation Mobile App",
    summary:
      "Cross-platform Flutter mobile application helping farmers maximize net crop returns through market price forecasting, direct buyer matching, and transport-cost-aware recommendations. Connects role-based Farmer and Buyer portals to a Node.js/Express backend, MongoDB, and a Python FastAPI CatBoost ML microservice trained on AGMARKNET data.",
    highlights: [
      "Built Material 3 Flutter mobile app with Provider state management, GoRouter, Dio, and geolocation discovery",
      "Engineered Node.js/Express REST APIs and MongoDB schemas for crop listings, buyer matching, deals, and OTP verification",
      "Integrated Python FastAPI microservice serving a CatBoost Regressor trained on AGMARKNET commodity price data",
      "Implemented Haversine logistics distance and net-return calculations factoring in transport costs and pricing",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "CatBoost",
      "REST API",
      "JWT",
    ],
    liveUrl: "",
    liveActionText: "",
    githubUrl: "https://github.com/sarthak-panda-18/FarmFlow",
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
  {
    id: "aarohan-foundation-ngo",
    title: "Aarohan Foundation (NGO)",
    tag: "Accessible NGO Homepage & Donation Platform",
    summary:
      "Modern, accessible web platform for Aarohan Foundation supporting community education, healthcare, and sustainable development across India. Features an interactive one-time and monthly donation flow, live campaign progress trackers, volunteer onboarding, testimonial carousel, and FAQ accordion built with React 19, TypeScript, and Tailwind CSS v4.",
    highlights: [
      "Built interactive donation workflow with frequency toggles, preset/custom tiers, and UPI/card payment selection",
      "Implemented active fundraiser campaign cards with progress bars, impact metrics, and testimonial carousel",
      "Created low-friction volunteer registration form, accordion FAQs, and 80G tax-exemption trust cues",
      "Styled responsive design system with React 19, TypeScript, Tailwind CSS v4, and custom inline SVGs",
    ],
    stack: [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Vite",
      "HTML5",
      "Vercel",
    ],
    liveUrl: "https://ngo-website-brown-three.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/NGOWebsite",
    image: "",
  },
  {
    id: "green-earth-foundation",
    title: "Green Earth Foundation",
    tag: "Environmental Non-Profit Web Application",
    summary:
      "Responsive environmental non-profit web application highlighting native reforestation, coastal cleanup drives, and eco-literacy workshops. Built with semantic HTML5, modern CSS3, and vanilla JavaScript featuring IntersectionObserver impact counters, event gallery, interactive donation tiers, toast feedback, and dedicated legal pages.",
    highlights: [
      "Implemented scroll-triggered IntersectionObserver counters tracking trees planted, volunteers, and restored sites",
      "Built one-time and monthly donation tier selectors, contact validation, and floating toast notifications",
      "Designed responsive glassmorphism navbar, mobile drawer, past-events photo gallery, and back-to-top controls",
      "Structured semantic multi-page experience with dedicated Privacy Policy and Terms of Service pages",
    ],
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "IntersectionObserver",
      "Vercel",
    ],
    liveUrl: "https://greenearthfoundation.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/GreenEarthFoundation",
    image: "",
  },
  {
    id: "sakthi-dental-clinic",
    title: "Sakthi Dental Clinic",
    tag: "Accessible Healthcare & Clinic Web Platform",
    summary:
      "High-performance, accessible multi-page website for Sakthi Dental Clinic in Hosur, Tamil Nadu, built with zero external build dependencies. Features semantic HTML5, custom design tokens, 15 treatment showcases, a 14-question accessible FAQ accordion, testimonial carousel, appointment focus flow, and SEO sitemap.",
    highlights: [
      "Built zero-dependency multi-page architecture across Home, About, Treatments, FAQs, Contact, and Privacy Policy",
      "Implemented WCAG AA-compliant Rose Smile color system, keyboard-trapped mobile drawer, and smooth CSS transitions",
      "Created interactive appointment routing, emergency call modal, testimonial autoplay carousel, and form validation",
      "Configured SEO metadata, OpenGraph preview tags, robots.txt, and canonical XML sitemap",
    ],
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Accessibility",
      "SEO",
      "Vercel",
    ],
    liveUrl: "https://sakthidentalclinicv2.vercel.app/",
    liveActionText: "Visit Live Website",
    githubUrl: "https://github.com/sarthak-panda-18/SakthiDentalClinic",
    image: "",
  },
];

export const internships = [
  {
    id: "shadowfox",
    organization: "ShadowFox",
    role: "Full-Stack Developer Intern",
    type: "Unpaid • Virtual Internship",
    period: "Oct 1 – Oct 31, 2026",
    duration: "1 Month",
    mentor: "Mr. Aakash",
    credential: "Certificate of Completion • MSME & ISO 9001 Certified",
    verifier: "Surendharan TG (Program Coordinator)",
    summary:
      "Completed a one-month virtual Full-Stack Developer internship delivering two deployed web applications focused on responsive architecture, WCAG 2.1 AA accessibility, technical SEO, 3D WebGL performance, and Vercel deployment.",
    deliverables: [
      {
        title: "Sakthi Dental Clinic Website",
        liveUrl: "https://sakthidentalclinicv2.vercel.app/",
        description:
          "Built a 6-page responsive website (Home, About, Treatments, FAQs, Contact, Privacy Policy) for a dental clinic in Hosur, Tamil Nadu using pure semantic HTML5, CSS3, and vanilla JavaScript with zero frameworks.",
        highlights: [
          "Applied the WCAG 2.1 AA compliant 'Rose Smile' palette with Quicksand/Inter typography and responsive CSS Grid layouts",
          "Built a pure CSS Grid FAQ accordion (no JavaScript height math), testimonial carousel, emergency call dialog, and validated contact form",
          "Configured technical SEO and accessibility (XML sitemap, JSON-LD, ARIA attributes, keyboard navigation) plus project documentation",
        ],
      },
      {
        title: "Personal 3D Portfolio",
        liveUrl: "https://panda-s-portfolio.vercel.app/",
        description:
          "Built a modern portfolio showcasing projects, skills, education, and coding profiles using a modular React 18, Vite, Tailwind CSS, and Three.js toolchain deployed on Vercel.",
        highlights: [
          "Engineered reusable React section components (Hero, Skills, Projects, Contact) powered by a centralized data file and Lenis smooth scrolling",
          "Implemented dark/light theme persistence, reduced-motion support, and a Web3Forms serverless contact form via environment variables",
          "Solved initial 3D WebGL rendering overhead by lazy-loading the Three.js canvas without blocking core content",
        ],
      },
    ],
    outcomes: [
      {
        label: "3D Performance",
        detail: "Eliminated initial render bottleneck by lazy-loading the Three.js canvas",
      },
      {
        label: "Zero-JS Accordion",
        detail: "Built smooth FAQ expand/collapse transitions purely with CSS Grid",
      },
      {
        label: "WCAG 2.1 AA Contrast",
        detail: "Tuned the Rose Smile color palette to meet accessible text contrast ratios",
      },
    ],
    stack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Three.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "WCAG 2.1 AA",
      "Technical SEO",
      "Vercel",
    ],
  },
  {
    id: "inamigos-foundation",
    organization: "InAmigos Foundation",
    subtitle: "IAF — Uniting Minds For Change",
    role: "Web Development Intern",
    type: "Unpaid • Virtual Internship",
    period: "Oct 10 – Oct 26, 2026",
    duration: "Oct 2026",
    credential: "Certificate of Internship • CSR-1 & 80G Registered NGO",
    verifier: "Shiwani (HR Head • Issued Oct 28, 2026)",
    summary:
      "Completed a virtual Web Development internship across four progressive assignments for InAmigos Foundation—covering a portfolio build, a comprehensive live foundation website audit, an environmental NGO web app, and an accessible NGO donation homepage.",
    deliverables: [
      {
        title: "Aarohan Foundation — NGO Homepage",
        liveUrl: "https://ngo-website-brown-three.vercel.app/",
        description:
          "Designed and built an accessible NGO homepage in React 19, TypeScript, and Tailwind CSS v4 focused on donor trust, impact storytelling, and conversion.",
        highlights: [
          "Implemented an interactive one-time and monthly donation workflow with preset/custom tiers, UPI/card selection, and 80G tax-exemption trust cues",
          "Built active fundraiser campaign cards with progress bars, volunteer onboarding form, testimonial carousel, and FAQ accordion",
        ],
      },
      {
        title: "Green Earth Foundation (Task 3)",
        liveUrl: "https://greenearthfoundation.vercel.app/",
        description:
          "Built a responsive multi-page environmental NGO website with semantic HTML5, CSS3, and vanilla JavaScript highlighting reforestation and coastal cleanups.",
        highlights: [
          "Added IntersectionObserver impact counters, interactive donation tier selectors, event gallery, and toast notifications",
          "Created dedicated Privacy Policy and Terms of Service pages alongside a responsive glassmorphism navbar and mobile drawer",
        ],
      },
      {
        title: "InAmigos Website Audit (Task 2)",
        description:
          "Conducted a full design, security, trust, and UX audit of inamigosfoundation.org.in across header, hero, donations, volunteers, causes, SEO, and mobile flows.",
        highlights: [
          "Documented 18 prioritized findings (3 critical, 8 high, 6 medium, 1 low) covering injected spam links, 80G/12A/CSR-1 trust badges, and legal/policy gaps",
          "Proposed a streamlined 9-section NGO homepage wireframe and phased remediation action plan for conversion and Lighthouse accessibility",
        ],
      },
      {
        title: "Developer Portfolio Foundation (Task 1)",
        liveUrl: "https://panda-s-portfolio.vercel.app/",
        description:
          "Built a beginner-to-production React, Vite, and Tailwind CSS developer portfolio showcasing personal background, projects, and contact workflows.",
        highlights: [
          "Set up structured Vite + Tailwind component architecture with environment-driven contact configuration and clean documentation",
          "Deployed live production builds with responsive desktop and mobile layouts",
        ],
      },
    ],
    outcomes: [
      {
        label: "18-Point Live Site Audit",
        detail: "Pinpointed critical source security issues, trust gaps, and donor UX improvements",
      },
      {
        label: "Donor & Volunteer Flows",
        detail: "Crafted clear 80G trust cues, preset/monthly donation flows, and campaign trackers",
      },
      {
        label: "Compliance & Multi-Page UX",
        detail: "Delivered semantic Privacy Policy and Terms pages alongside responsive drawers",
      },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vite",
      "UX & Security Audit",
      "Accessibility",
      "SEO",
    ],
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
