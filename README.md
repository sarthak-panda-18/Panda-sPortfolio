# 🌿 Sarthak Panda — Modern 3D Developer Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-panda--s--portfolio.vercel.app-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://panda-s-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<p align="center">
  <strong>A modern, responsive, and performance-focused 3D developer portfolio handcrafted with warm earth aesthetics, interactive physics, and smooth momentum scrolling.</strong>
</p>

[View Live Portfolio](https://panda-s-portfolio.vercel.app/) • [Report Bug](https://github.com/sarthak-panda-18/Panda-sPortfolio/issues) • [Request Feature](https://github.com/sarthak-panda-18/Panda-sPortfolio/issues)

</div>

---

## ✨ Overview

This portfolio is an interactive showcase of full-stack projects, technical competencies, and algorithmic achievements. Built with **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, and **Framer Motion**, it delivers an engaging visual experience while maintaining high performance, clean architecture, and full mobile responsiveness.

---

## 🌟 Key Features

- 🌐 **Interactive 3D Elements**: Fluid 3D geometric clusters and section accents powered by `@react-three/fiber` and `@react-three/drei` that react dynamically to cursor movement.
- 🎨 **Warm Earth Aesthetics & Theming**: Custom curated color palette with seamless Dark / Light mode switching and persistent theme state.
- 🌊 **Smooth Momentum Scrolling**: Integrated with [Lenis](https://lenis.darkroom.engineering/) for a fluid, continuous scrolling experience.
- ⚡ **Optimized Performance**: Lazy-loaded 3D canvas via `requestIdleCallback`, deferred non-critical assets, and zero layout shift.
- 📱 **Fully Responsive & Accessible**: Semantic HTML5 markup, ARIA labels, responsive typography, and mobile-friendly touch interactions.
- 📝 **Centralized Content Architecture**: Single source of truth (`src/data/content.js`) making updates to projects, skills, education, and links effortless.
- 📬 **Serverless Contact Form**: Interactive contact section with Web3Forms integration for direct email notifications.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/), [Vite](https://vitejs.dev/) |
| **3D & Graphics** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/), PostCSS, Autoprefixer |
| **Animations & Transitions** | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/) |
| **Smooth Scrolling** | [Lenis](https://github.com/darkroomengineering/lenis) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Google Fonts (*DM Serif Display*, *DM Sans*) |
| **Deployment & Hosting** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
├── public/                 # Static assets (favicons, OG images)
├── src/
│   ├── assets/             # Images, graphics, and static media
│   ├── components/         # Reusable UI components
│   │   ├── Button.jsx      # Design-system buttons
│   │   ├── Navbar.jsx      # Dynamic navigation bar with mobile drawer
│   │   ├── Preloader.jsx   # Interactive curtain preloader
│   │   ├── ThemeToggle.jsx # Light / Dark mode switcher
│   │   ├── TiltCard.jsx    # 3D hover tilt card component
│   │   └── Footer.jsx      # Portfolio footer
│   ├── data/
│   │   └── content.js      # 🎯 Single source of truth for all content
│   ├── hooks/              # Custom React hooks (useLenis, useTheme)
│   ├── lib/                # Utility functions & helpers
│   ├── sections/           # Page sections
│   │   ├── Hero.jsx        # Landing hero section
│   │   ├── About.jsx       # Biography and key metrics
│   │   ├── Skills.jsx      # Categorized technical competencies
│   │   ├── Projects.jsx    # Featured work with interactive cards
│   │   ├── Education.jsx   # Academics & Certifications
│   │   ├── CodingProfiles.jsx # Competitive programming handles
│   │   └── Contact.jsx     # Contact form with Web3Forms
│   ├── styles/             # Global CSS and custom utility classes
│   ├── three/              # Three.js 3D canvas, clusters, and shaders
│   │   ├── Scene.jsx       # Root 3D scene & viewport manager
│   │   ├── HeroCluster.jsx # Interactive 3D geometry cluster
│   │   ├── materials.js    # Shaders and Three.js materials
│   │   └── geometries.js   # 3D mesh definitions
│   ├── App.jsx             # Main application orchestrator
│   └── main.jsx            # React root entry point
├── index.html              # HTML shell & SEO metadata
├── tailwind.config.js      # Custom theme, tokens, and font configuration
├── vite.config.js          # Vite build and plugin setup
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm** or **pnpm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/sarthak-panda-18/Panda-sPortfolio.git
cd Panda-sPortfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your [Web3Forms](https://web3forms.com/) Access Key (free) to enable the contact form:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ⚙️ Customization Guide

All personal info, projects, skills, and links can be modified in one place without touching JSX or UI code:

📂 **Edit [`src/data/content.js`](src/data/content.js)**:

- **Profile Info**: Name, roles, summary, location, email.
- **Projects**: Add/remove projects, live URLs, GitHub repos, tags, and highlights.
- **Skills Matrix**: Add languages, frameworks, backend tools, or databases.
- **Education & Certifications**: Update degrees, scores, and accredited certificates.
- **Socials & Profiles**: Update handles for GitHub, LinkedIn, LeetCode, and CodeChef.

---

## 🏆 Featured Projects

| Project | Description | Live Demo | Repository |
| :--- | :--- | :---: | :---: |
| **SkillTrack AI** | Skilling outcome intelligence platform with real-time analytics & Gemini AI | [Live Demo](https://skill-track-inky.vercel.app/) | [GitHub](https://github.com/sarthak-panda-18/SkillTrack) |
| **GetYourTasksDone** | Secure full-stack task manager with PostgreSQL, Prisma, & JWT | [Live Demo](https://get-your-tasks-done.vercel.app/) | [GitHub](https://github.com/sarthak-panda-18/GetYourTasksDone) |
| **Land Use Land Cover** | Geospatial AI classification pipeline on Sentinel-2 satellite imagery | [Live Demo](https://land-use-land-cover.vercel.app/) | [GitHub](https://github.com/sarthak-panda-18/LandUseLandCover) |
| **MovieDesk** | Fast movie discovery app powered by TMDB API with dynamic filtering | [Live Demo](https://movie-desk-indol.vercel.app/) | [GitHub](https://github.com/sarthak-panda-18/MovieDesk) |

---

## 📬 Contact & Connect

- **Portfolio**: [panda-s-portfolio.vercel.app](https://panda-s-portfolio.vercel.app/)
- **GitHub**: [@sarthak-panda-18](https://github.com/sarthak-panda-18)
- **LeetCode**: [@sarthak-pandaa](https://leetcode.com/u/sarthak-pandaa/)
- **CodeChef**: [@sarthakpanda17](https://www.codechef.com/users/sarthakpanda17)
- **Email**: [sarthakpanda.outlook@gmail.com](mailto:sarthakpanda.outlook@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Designed & Developed by <strong>Sarthak Panda</strong></sub>
</div>
