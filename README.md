# Personal Website Portfolio

> **High-Performance Next.js Portfolio powered by Payload CMS 3.0**

A modern, responsive, and robust personal portfolio website. Built to handle essays, insights, and interactive native comments safely without third-party dependencies.

## Features

- **Next.js 15 App Router**: Server-Side Rendering (SSR) and dynamic optimizations.
- **Payload CMS 3.0**: Fully integrated headless CMS that lives natively in standard `/admin` route.
- **SQLite Database**: Lightweight, serverless-ready local data storage (`payload.db`).
- **Native Comments System**: Self-hosted custom Payload Collection with Native Server Actions integration.
- **Obsidian-Ready Workflow**: Lexical RichText editor structurally configured to flawlessly parse block Markdown copy-pasted directly from your Obsidian Reading View.

## Prerequisites

- [Bun](https://bun.sh/) (Runtime & Package Manager)
- Node.js >= 20.x

## Installation

1. Clone or download the repository.
2. Install dependencies exclusively via Bun:
   ```bash
   bun install
   ```
3. Set your environment variables:
   Create a `.env` file mechanically (Optional for local dev, Required for production).
   ```env
   # Payload Secret
   PAYLOAD_SECRET=your-secure-random-string
   
   # Database URI (Defaults to local SQLite)
   DATABASE_URI=file:./payload.db
   ```

## Development & Usage

Start the local development server:
```bash
bun run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

### Setting up the CMS
1. Upon first run, navigate to the Admin Dashboard.
2. Follow the prompt to create your First User (Admin).
3. Start publishing `Insights` and moderating `Comments`.

### Writing Workflow
To write Insights directly from your personal knowledge base (e.g., Obsidian):
1. Open your markdown file in Obsidian.
2. Switch to **Reading View**.
3. Select All (`Ctrl+A`) and Copy (`Ctrl+C`).
4. Paste into the Payload CMS `Content` box. The Payload Lexical editor will perfectly translate all bolding, lists, quotes, and structural hierarchy natively.

## Deployment Notes

If deploying to Vercel or similar ephemeral serverless hosting, you **must migrate your database adapter** from SQLite to Postgres. Ephemeral environments will reset your `payload.db` on every sleep/wakeup cycle.

Change the adapter in `src/payload.config.ts`:
```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'
// ...
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI }
  }),
```

---
*Developed securely with [Next.js](https://nextjs.org) and [Payload CMS](https://payloadcms.com).*
