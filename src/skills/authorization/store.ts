/**
 * Authorization Skill - Store
 *
 * Zustand store for managing user roles and authorization
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user';
import { UserRole } from './types';

export interface AuthorizationStore {
  // Check methods
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasAllRoles: (roles: UserRole[]) => boolean;

  // Update methods
  updateUserRole: (roles: UserRole[]) => void;
  addRole: (role: UserRole) => void;
  removeRole: (role: UserRole) => void;
}

/**
 * Create authorization store to be integrated with auth store
 */
export const createAuthorizationStore = (user: User | null | undefined) => {
  return {
    hasRole: (role: UserRole) => {
      if (!user || !user.roles) return false;
      return user.roles.includes(role);
    },

    hasAnyRole: (roles: UserRole[]) => {
      if (!user || !user.roles) return false;
      return roles.some((role) => user.roles?.includes(role));
    },

    hasAllRoles: (roles: UserRole[]) => {
      if (!user || !user.roles) return false;
      return roles.every((role) => user.roles?.includes(role));
    },

    updateUserRole: (roles: UserRole[]) => {
      // This is implemented in the main auth store
      // since user state is managed there
    },

    addRole: (role: UserRole) => {
      // This is implemented in the main auth store
    },

    removeRole: (role: UserRole) => {
      // This is implemented in the main auth store
    },
  };
};
