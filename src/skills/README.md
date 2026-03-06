# Skills

A collection of reusable, self-contained modules that provide specific functionality to the DummyStore application.

## Overview

Skills are organized as feature-complete packages that can be imported and used throughout the application. Each skill is self-contained with its own types, utilities, and documentation.

## Available Skills

### Authorization Skill
**Path:** `src/skills/authorization/`

A Role-Based Access Control (RBAC) system for managing user roles and permissions.

**Features:**
- 4 predefined roles: ADMIN, USER, CUSTOMER, GUEST
- Permission mapping for each role
- Type-safe utilities and store functions
- Dynamic role management

**Quick Import:**
```typescript
import { UserRole, userHasRole, isAdmin } from '@/skills/authorization';
```

**Full Documentation:** See `src/skills/authorization/README.md`

## Using Multiple Skills

Import from the main skills index:
```typescript
import * as AuthorizationSkill from '@/skills';

// Or import specific skill
import { UserRole, isAdmin } from '@/skills/authorization';
```

## Creating New Skills

When adding a new skill, follow this structure:

```
src/skills/newSkill/
├── index.ts           # Exports all types and utilities
├── types.ts           # Type definitions and enums
├── utils.ts           # Utility functions
├── store.ts           # State management helpers (optional)
└── README.md          # Skill documentation
```

### Skill Checklist

- [ ] Create skill folder in `src/skills/`
- [ ] Create `types.ts` with all type definitions
- [ ] Create `utils.ts` with utility functions
- [ ] Create `index.ts` that exports everything
- [ ] Create `README.md` with usage documentation
- [ ] Add export to `src/skills/index.ts`
- [ ] Test imports and types

## File Organization

```
src/skills/
├── authorization/     # First skill - RBAC system
│   ├── types.ts
│   ├── utils.ts
│   ├── store.ts
│   ├── index.ts
│   └── README.md
├── index.ts          # Master index for all skills
└── README.md         # This file
```

## Best Practices

1. **Self-Contained**: Each skill should be independent and not depend on other skills
2. **Typed**: Export all types and use TypeScript for type safety
3. **Utility-First**: Provide utility functions alongside store methods
4. **Documented**: Include a README with usage examples
5. **Exportable**: Always have an `index.ts` that exports the skill's public API
6. **Scalable**: Use consistent naming and organization across skills

## Future Skills Ideas

- **notifications**: Toast notifications, alerts, and messaging system
- **analytics**: Event tracking and analytics
- **payments**: Payment processing integration
- **themes**: Dark mode and theme management
- **cache**: Client-side caching utilities
- **validation**: Form validation utilities
- **localization**: Multi-language support
