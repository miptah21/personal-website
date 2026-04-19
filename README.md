# Miftahudin Akbar | Computational Finance Professional

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-v3-black)](https://payloadcms.com/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-black?logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)

> A highly optimized, CMS-driven digital portfolio bridging the gap between complex financial systems and data-driven intelligence.

This repository contains the source code for my personal website. It serves as a professional showcase of my technical toolkit, academic research, professional experience, and computational finance projects. 

---

## 🏛️ Design Philosophy: "Editorial Luxury"

The aesthetic of this project is meticulously crafted to reflect the precision and authority of the financial sector. The design language is heavily inspired by prestigious academic journals and institutional financial terminals (e.g., Bloomberg, Monocle).

- **Typography-Driven Hierarchy**: The interface pairs `Newsreader` (a classic serif) for authoritative headings with `Inter` (a modern sans-serif) for dense, data-heavy precision text.
- **Zero-Radius Geometry**: All components utilize sharp, 0px border-radiuses. The absence of playful rounded corners enforces a strict, professional tone.
- **Color Palette**: Built on deep, institutional greens (Surface: `#0e1210`) with stark typography (`#c2c8c2`) and subtle metallic gold/bronze accents (`#775a19`).
- **Dynamic Micro-Interactions**: Features such as the 3D-tilting ID badge, magnetic scroll progress indicators, and precise hover states provide a premium, modern user experience without compromising readability.

---

## ⚙️ Technical Architecture

The platform is engineered for maximum performance, type safety, and content maintainability.

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) — Utilizing Server Components by default for optimal page load speeds and SEO.
- **Content Management**: [Payload CMS v3](https://payloadcms.com/) — Integrated directly into the Next.js runtime. Content is fetched server-side via the Payload Local API, eliminating network overhead.
- **Runtime**: [Bun](https://bun.sh/) — Chosen for its incredibly fast startup times, built-in package management, and strict lockfile adherence (`bun.lock`).
- **Styling**: Vanilla CSS Modules (`*.module.css`) — Chosen over utility classes (like Tailwind) to maintain strict, granular control over the complex grid layouts and custom CSS animations required by the Editorial Luxury design system.

---

## 📊 CMS Collections & Data Flow

Every section of the website is entirely dynamic and manageable via the Payload Admin Dashboard (`/admin`).

| Collection | Purpose | Features |
|------------|---------|----------|
| **Projects** | *The Laboratory* | Showcases GitHub repositories (e.g., `stockScreener`, `zen-writer`). Supports featured toggles and rich descriptions. |
| **Education** | *Academic Credentials* | Displays high-level university details, GPA, thesis summaries, and grouped relevant coursework. |
| **Tools** | *Technical Toolkit* | Renders the interactive 3D-flip grid. Categorized into AI Engineering, Data Engineering, Financial Modeling, etc. |
| **Awards** | *Certifications* | Professional licenses and hackathon wins, displayed in a unified grid with a custom high-res Lightbox implementation. |
| **Experiences**| *CV Timeline* | Chronological work history and internships. |
| **Insights** | *Publications* | A blog/archive for deep-dive research and financial analyses. |

---

## 🚀 Local Development Setup

To run this project locally, ensure you have [Bun](https://bun.sh/) installed.

### 1. Clone & Install
```bash
git clone https://github.com/miptah21/personal-website.git
cd personal-website
bun install
```

### 2. Environment Variables
Create a `.env` file in the root directory. You can copy `.env.example` if it exists, or manually set:
```env
PAYLOAD_SECRET=your_secret_key_here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Database Initialization & Seeding
The project uses a local database (e.g., SQLite/Postgres via Payload). You can instantly populate the site with real data using the built-in seed scripts:
```bash
# Seed the Technical Toolkit
bun run src/lib/seed-tools.ts

# Seed the Education Section
bun run src/lib/seed-education.ts

# Seed the Projects (from GitHub pinned repos)
bun run src/lib/seed-projects.ts

# Seed the Awards/Certifications
bun run src/lib/seed-awards.ts
```

### 4. Run the Development Server
```bash
bun run dev
```
- **Live Site**: [http://localhost:3000](http://localhost:3000)
- **CMS Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Key Project Structure

```text
src/
├── app/                  # Next.js App Router (Frontend & Admin routes)
│   ├── (frontend)/       # Public facing pages & CSS modules
│   └── (payload)/        # Payload CMS admin interface routes
├── collections/          # Payload CMS Data Schemas (Projects, Tools, etc.)
├── components/           # Reusable UI Components (Navbar, NameTagHero, etc.)
├── lib/                  # Utilities, queries, and Seed Scripts
└── payload.config.ts     # Master Payload configuration
```

---

## 📝 License

&copy; 2026 Miftahudin Akbar. All Rights Reserved.
Designed for the Financial Professional.
