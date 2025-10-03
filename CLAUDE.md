# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**InvestEd** is a financial literacy platform designed to empower everyone with actionable financial knowledge through interactive, bite-sized learning. The platform features:
- Personalized financial health check-ins
- 2-minute mini-lessons on high-impact topics
- Interactive decision simulators with branching outcomes
- Progress tracking dashboard
- Equity-focused resource hub for underserved communities

## Tech Stack

- **Framework:** Next.js 15.5.4 with React 19.1.0
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v4 with PostCSS
- **Build Tool:** Turbopack (Next.js integrated)
- **Package Manager:** pnpm
- **Database:** SQLite with Prisma ORM
- **Authentication:** bcryptjs with token-based sessions
- **Validation:** Zod v4
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

# Database
npx prisma migrate dev       # Create and apply migrations
npx prisma generate          # Generate Prisma Client
npx prisma studio            # Open Prisma Studio (database GUI)
npx prisma db push           # Push schema changes without migrations
```

## Architecture

This is a Next.js App Router application with a layered backend architecture.

### Backend Architecture (src/backend/)

The backend follows a **Repository Pattern** with **Dependency Injection**:

1. **Database Layer** (`database/`)
   - `prisma.ts` - Singleton PrismaClient instance with dev mode caching

2. **Repositories** (`repositories/`)
   - Handle all database operations through Prisma
   - Interface-based design for testability
   - Examples: `UserRepository`, `SessionRepository`

3. **Services** (`services/`)
   - Contain business logic
   - Orchestrate repositories
   - Handle complex operations like authentication
   - Examples: `AuthService`, `UserService`

4. **DTOs** (`dto/`)
   - Data Transfer Objects for type-safe data passing between layers
   - Separate from Prisma models to decouple layers

5. **Schemas** (`schemas/`)
   - Zod schemas for runtime validation
   - Used with `validateSchema` helper in API routes

6. **Dependency Injection** (`lib/dependency-injection.ts`)
   - Singleton factory functions for services
   - Example: `getAuthService()`, `getUserService()`
   - Centralizes dependency wiring

7. **Validation Utilities** (`lib/validation.ts`)
   - `validateSchema()` - Wrapper for Zod validation with error formatting
   - `createValidationErrorResponse()` - Standardized error responses

### API Routes (src/app/api/)

- **Authentication:** `POST /api/auth/tokens` (login), `DELETE /api/auth/tokens` (logout)
- **Users:** `POST /api/users` (register)
- Token-based authentication with Bearer token in Authorization header
- All routes use dependency injection to get services

### Authentication Flow

1. User registers via `POST /api/users` → password hashed with bcryptjs
2. User logs in via `POST /api/auth/tokens` → returns session token
3. Token stored in Session table with 24-hour expiry
4. Protected routes validate token via `AuthService.validateToken()`
5. Logout via `DELETE /api/auth/tokens` → deletes session

### Database Schema

- **User:** id, email (unique), password (hashed), name, timestamps
- **Session:** id, userId, token (unique), expiresAt, createdAt
- SQLite database (configurable via DATABASE_URL env var)

### Frontend Architecture (src/app/)

- Next.js 15 App Router
- Geist and Geist Mono fonts from next/font
- TypeScript with strict mode
- Tailwind CSS v4 for styling
