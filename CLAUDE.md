# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**InvestEd** is a financial literacy platform designed to empower everyone with actionable financial knowledge through interactive, bite-sized learning. The platform features:
- Personalized financial health check-ins
- 2-minute mini-lessons on high-impact topics
- Interactive decision simulators with branching outcomes
- Progress tracking dashboard
- Equity-focused resource hub for underserved communities

The platform uses localStorage for client-side data persistence (user progress, quiz results) and manages content through static JSON files.

## Tech Stack

- **Framework:** Next.js 15.5.4 with React 19.1.0
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v4 with PostCSS
- **Build Tool:** Turbopack (Next.js integrated)
- **Package Manager:** pnpm
- **Data Storage:** Client-side localStorage (no backend)
- **Path Aliases:** `@/*` maps to `./src/*`

## Common Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack

# Build & Deploy
pnpm build            # Production build with Turbopack
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
```

## Architecture

This is a Next.js App Router application with the following structure:

- **App Router:** Uses Next.js 15 App Router (`src/app/`)
- **TypeScript Configuration:** Strict mode with ES2017 target
- **Styling:** Tailwind CSS v4 with custom CSS variables, Geist and Geist Mono fonts from next/font
- **Data Layer:** No backend server; all user data persisted in browser localStorage
- **Content Management:** Financial lessons and scenarios stored as static JSON files for easy updates

### Key Design Patterns

- **Client-Side State:** User progress, quiz answers, and financial health scores stored in localStorage
- **Serverless Architecture:** No API routes or backend services in the current implementation
- **Mobile-First:** UI built with responsive Tailwind classes prioritizing mobile experience
- **Modular Content:** JSON-based content structure allows easy addition of new lessons, scenarios, and localized resources
