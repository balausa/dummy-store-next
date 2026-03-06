# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

- **Framework**: Next.js 16 with React 19.2
- **Language**: TypeScript 5
- **State Management**: Zustand 5.0 with persistence middleware
- **HTTP Client**: Axios with request/response interceptors
- **Styling**: SASS/SCSS with CSS Modules
- **Linting**: ESLint 9 (with Next.js presets)
- **Code Formatting**: Prettier 3.8
- **CSS Linting**: Stylelint 17.1

## Common Development Commands

```bash
# Development server (hot reload on port 3000)
npm run dev

# Production build
npm run build

# Run production build locally
npm start

# Linting
npm run lint

# Format code with Prettier (add --write to apply changes)
npm run dev  # Note: Custom format script with prettier should use:
npx prettier --write "src/**/*.{ts,tsx,scss}"

# Lint SCSS files
npx stylelint "src/**/*.scss"

# TypeScript type checking
npx tsc --noEmit
```

## Architecture Overview

### Project Structure

```
src/
├── api/                  # HTTP API layer with axios instance
│   ├── axiosInstance.ts # Configured axios with auth interceptors
│   ├── auth.ts         # Authentication API calls
│   └── products.ts     # Product API calls
├── app/                 # Next.js App Router (pages and layouts)
│   ├── layout.tsx      # Root layout wrapper
│   ├── page.tsx        # Home page
│   └── login/          # Login page and styles
├── components/         # React components (UI and layout)
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # UI components (ProductCard, etc.)
├── skills/             # Reusable feature modules (Skills architecture)
│   ├── authorization/  # RBAC system with roles and permissions
│   └── index.ts        # Master export for all skills
├── store/              # Zustand state stores
│   └── useAuthStore.ts # Auth state with role management
├── styles/             # Global styles and variables
│   ├── globals.scss    # Global styles
│   └── _variables.scss # SASS variables
└── types/              # TypeScript type definitions
    ├── auth.ts         # Auth-related types
    ├── user.ts         # User type with roles
    ├── product.ts      # Product types
    └── authorization.ts # Authorization types
```

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` → maps to `src/*`

Example usage:
```typescript
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/skills/authorization';
```

## Key Architectural Patterns

### 1. Skills System

Skills are self-contained, reusable feature modules. Each skill follows this structure:

```
src/skills/skillName/
├── index.ts       # Public API exports
├── types.ts       # Type definitions and enums
├── utils.ts       # Utility functions
├── store.ts       # State management helpers (optional)
└── README.md      # Documentation
```

**Current Skills:**
- **Authorization**: Role-Based Access Control (RBAC) with 4 predefined roles (ADMIN, USER, CUSTOMER, GUEST)

To use a skill:
```typescript
// Import from skill index
import { UserRole, userHasRole } from '@/skills/authorization';

// Or use store methods integrated with useAuthStore
import { useAuthStore } from '@/store/useAuthStore';
const { hasRole, updateUserRole, addRole } = useAuthStore();
```

### 2. State Management with Zustand

The application uses Zustand for state management with localStorage persistence.

**Main Store: `useAuthStore`**
- Manages user authentication state
- Integrates role-based access control from the authorization skill
- Persists to localStorage with key `auth-storage`
- Methods: `setUser()`, `logout()`, `hasRole()`, `hasAnyRole()`, `hasAllRoles()`, `updateUserRole()`, `addRole()`, `removeRole()`

Example:
```typescript
const { user, isAuthenticated, setUser, logout, hasRole } = useAuthStore();

if (hasRole(UserRole.ADMIN)) {
  // Show admin features
}
```

### 3. API Layer with Authentication

The API layer is centralized in `src/api/axiosInstance.ts` with:

**Request Interceptor:**
- Automatically attaches Bearer token from auth store to all requests

**Response Interceptor:**
- Handles 401 responses by attempting to refresh the access token
- Uses `refreshToken` to get new `accessToken` from the API
- Updates localStorage with new tokens
- Retries the original request
- On refresh failure, clears auth storage and redirects to `/login`

**Base URL:** `https://dummyjson.com`

Usage:
```typescript
import axiosInstance from '@/api/axiosInstance';

const response = await axiosInstance.get('/products');
```

### 4. Component Organization

- **Layout Components** (`src/components/layout/`): Header, Footer - shared across pages
- **UI Components** (`src/components/ui/`): Reusable UI elements like ProductCard
- **Page Components** (`src/app/`): Page-specific components managed by Next.js App Router

Components use **CSS Modules** for scoped styling:
```typescript
import styles from './Component.module.scss';

export default function Component() {
  return <div className={styles.container}>...</div>;
}
```

### 5. Type Safety

All major entities have TypeScript definitions in `src/types/`:
- **User**: Main user type with optional roles array
- **UserRole**: Enum from authorization skill defining available roles
- **Product**: Product data structure
- **Auth**: Authentication-related types

## Development Workflow

### Making Changes

1. **New Features**: Follow the Skills pattern for new feature modules
2. **Components**: Place in `src/components/` with associated `.module.scss` files
3. **API Calls**: Add new methods in `src/api/` and use the configured axios instance
4. **Types**: Always define types in `src/types/` and import throughout the codebase
5. **State**: Use Zustand stores in `src/store/` for client-side state

### Running Tests

No test runner is currently configured. Testing would typically be set up with Jest or Vitest.

### Authentication Flow

1. User logs in via `/login` page
2. Backend returns `accessToken` and `refreshToken`
3. `setUser()` stores user data in Zustand with tokens
4. Axios interceptor injects `accessToken` in all requests
5. On token expiry (401), refresh token is used to get new access token
6. If refresh fails, user is redirected to login

### Adding New Roles or Permissions

To extend the authorization system:
1. Add role to `UserRole` enum in `src/skills/authorization/types.ts`
2. Define permissions in `rolePermissions` object
3. Use store methods to manage user roles: `updateUserRole()`, `addRole()`, `removeRole()`

## TypeScript Configuration

- **Target**: ES2017
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **Isolated Modules**: Enabled (for Next.js compatibility)
- **JSX Runtime**: react-jsx (modern JSX transform)

## Next.js Notes

- Uses **App Router** (not Pages Router) for routing in `src/app/`
- Layout files cascade down the component tree
- The root layout is in `src/app/layout.tsx`
- Each directory can have its own `layout.tsx` for nested layouts

## ESLint and Code Quality

The project uses ESLint with Next.js and TypeScript plugins:
- Extends Next.js web vitals rules
- Extends Next.js TypeScript rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

Run linting:
```bash
npm run lint
```

Path alias `@/*` is correctly configured for both runtime and tooling.
