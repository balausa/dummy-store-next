/**
 * Skills - Master Index
 *
 * Central export point for all application skills.
 * Skills are reusable, self-contained modules that provide specific functionality.
 *
 * Available Skills:
 * - authorization: Role-based access control (RBAC) system
 *
 * Usage:
 * import { UserRole, userHasRole, isAdmin } from '@/skills';
 * import * as AuthorizationSkill from '@/skills/authorization';
 */

export * as authorization from './authorization';

// Future skills can be added here:
// export * as notifications from './notifications';
// export * as analytics from './analytics';
// export * as payments from './payments';
