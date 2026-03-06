/**
 * Authorization Skill
 *
 * A skill for implementing role-based access control (RBAC) in your application.
 *
 * Exports:
 * - Types: UserRole, AuthorizationAction, RolePermissions, rolePermissions
 * - Utilities: userHasRole, userCanPerformAction, isAdmin, isUser, etc.
 *
 * Usage:
 * import { UserRole, userHasRole, isAdmin } from '@/skills/authorization';
 */

// Types
export { UserRole, rolePermissions } from './types';
export type {
  RolePermissions,
  AuthorizationAction,
} from './types';

// Store
export { createAuthorizationStore } from './store';
export type { AuthorizationStore } from './store';

// Utils
export {
  userHasRole,
  userHasAnyRole,
  userHasAllRoles,
  userCanPerformAction,
  getUserPermissions,
  getHighestPrivilegeRole,
  isAdmin,
  isUser,
  isCustomer,
  isGuest,
} from './utils';
