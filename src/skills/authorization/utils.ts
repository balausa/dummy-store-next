/**
 * Authorization Skill - Utilities
 *
 * Utility functions for authorization checks and role management
 */

import { User } from '@/types/user';
import { UserRole, rolePermissions, AuthorizationAction } from './types';

/**
 * Check if a user has a specific role
 */
export const userHasRole = (user: User | null, role: UserRole): boolean => {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

/**
 * Check if a user has any of the specified roles
 */
export const userHasAnyRole = (
  user: User | null,
  roles: UserRole[]
): boolean => {
  if (!user || !user.roles) return false;
  return roles.some((role) => user.roles?.includes(role));
};

/**
 * Check if a user has all of the specified roles
 */
export const userHasAllRoles = (
  user: User | null,
  roles: UserRole[]
): boolean => {
  if (!user || !user.roles) return false;
  return roles.every((role) => user.roles?.includes(role));
};

/**
 * Check if a user can perform a specific action based on their role
 */
export const userCanPerformAction = (
  user: User | null,
  action: AuthorizationAction
): boolean => {
  if (!user || !user.roles) return false;

  return user.roles.some((role) => {
    const permissions = rolePermissions[role];
    return permissions && permissions.includes(action);
  });
};

/**
 * Get all permissions for a user based on their roles
 */
export const getUserPermissions = (user: User | null): AuthorizationAction[] => {
  if (!user || !user.roles) return [];

  const permissions = new Set<AuthorizationAction>();

  user.roles.forEach((role) => {
    const rolePerms = rolePermissions[role];
    if (rolePerms) {
      rolePerms.forEach((perm) => permissions.add(perm as AuthorizationAction));
    }
  });

  return Array.from(permissions);
};

/**
 * Get the highest privilege role from a user's roles
 * Order: ADMIN > USER > CUSTOMER > GUEST
 */
export const getHighestPrivilegeRole = (
  user: User | null
): UserRole | null => {
  if (!user || !user.roles || user.roles.length === 0) return null;

  const roleHierarchy = [
    UserRole.ADMIN,
    UserRole.USER,
    UserRole.CUSTOMER,
    UserRole.GUEST,
  ];

  for (const role of roleHierarchy) {
    if (user.roles.includes(role)) {
      return role;
    }
  }

  return null;
};

/**
 * Check if a user is an admin
 */
export const isAdmin = (user: User | null): boolean => {
  return userHasRole(user, UserRole.ADMIN);
};

/**
 * Check if a user is a regular user
 */
export const isUser = (user: User | null): boolean => {
  return userHasRole(user, UserRole.USER);
};

/**
 * Check if a user is a customer
 */
export const isCustomer = (user: User | null): boolean => {
  return userHasRole(user, UserRole.CUSTOMER);
};

/**
 * Check if a user is a guest
 */
export const isGuest = (user: User | null): boolean => {
  return userHasRole(user, UserRole.GUEST);
};
