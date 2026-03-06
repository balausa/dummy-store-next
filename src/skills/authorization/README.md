# Authorization Skill

A Role-Based Access Control (RBAC) system for managing user permissions and access control in the DummyStore application.

## Features

- ✅ Role-based access control with 4 predefined roles (ADMIN, USER, CUSTOMER, GUEST)
- ✅ Permission mapping for each role
- ✅ Check user roles and permissions
- ✅ Dynamically update user roles
- ✅ Action-based authorization checks
- ✅ Type-safe utilities and store functions

## Roles

| Role | Permissions |
|------|------------|
| **ADMIN** | All permissions including user management, product management, analytics |
| **USER** | View products, purchase products, manage cart, view orders |
| **CUSTOMER** | View products, purchase products, manage cart, view orders |
| **GUEST** | View products only |

## Usage

### Check User Roles

```typescript
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/skills/authorization';

const MyComponent = () => {
  const { hasRole, hasAnyRole, hasAllRoles } = useAuthStore();

  // Check single role
  if (hasRole(UserRole.ADMIN)) {
    return <AdminPanel />;
  }

  // Check if user has any of the roles
  if (hasAnyRole([UserRole.ADMIN, UserRole.USER])) {
    return <Dashboard />;
  }

  // Check if user has all roles
  if (hasAllRoles([UserRole.USER, UserRole.CUSTOMER])) {
    return <Premium />;
  }

  return <GuestView />;
};
```

### Change User Roles

```typescript
import { UserRole } from '@/skills/authorization';
import { useAuthStore } from '@/store/useAuthStore';

const { updateUserRole, addRole, removeRole } = useAuthStore();

// Replace all roles
updateUserRole([UserRole.ADMIN, UserRole.USER]);

// Add a single role
addRole(UserRole.ADMIN);

// Remove a single role
removeRole(UserRole.GUEST);
```

### Use Utility Functions

```typescript
import {
  userHasRole,
  userCanPerformAction,
  isAdmin,
  getUserPermissions,
  getHighestPrivilegeRole,
} from '@/skills/authorization';

// Check if a user has a role
if (userHasRole(user, UserRole.ADMIN)) {
  // Grant admin access
}

// Check if user can perform an action
if (userCanPerformAction(user, 'manage-products')) {
  return <ProductManagement />;
}

// Check role-specific functions
if (isAdmin(user)) {
  return <AdminArea />;
}

// Get all permissions for a user
const permissions = getUserPermissions(user);

// Get the highest privilege role
const role = getHighestPrivilegeRole(user);
```

## File Structure

```
src/skills/authorization/
├── index.ts       - Exports all types and utilities
├── types.ts       - Role enums and permission definitions
├── store.ts       - Zustand store integration helpers
├── utils.ts       - Utility functions for auth checks
└── README.md      - This file
```

## Integration with Auth Store

The authorization system is integrated with the main auth store (`src/store/useAuthStore.ts`):

- The `User` type includes a `roles?: UserRole[]` property
- The auth store includes methods: `hasRole()`, `hasAnyRole()`, `hasAllRoles()`, `updateUserRole()`, `addRole()`, `removeRole()`

## Adding New Roles

To add a new role:

1. Add the role to the `UserRole` enum in `types.ts`
2. Define permissions for the role in `rolePermissions` in `types.ts`
3. Add new action types to `AuthorizationAction` if needed

## Adding New Skills

To create new skills in the future, follow this structure:

```
src/skills/
├── authorization/      (existing)
├── newSkill/
│   ├── index.ts       (exports)
│   ├── types.ts       (type definitions)
│   ├── utils.ts       (utility functions)
│   ├── store.ts       (state management helpers)
│   └── README.md      (documentation)
└── index.ts           (master index)
```

Each skill is self-contained and can be imported independently.
