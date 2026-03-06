import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user';
import { UserRole } from '@/skills/authorization';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasAllRoles: (roles: UserRole[]) => boolean;
  updateUserRole: (roles: UserRole[]) => void;
  addRole: (role: UserRole) => void;
  removeRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      /**
       * Check if the current user has a specific role
       */
      hasRole: (role: UserRole) => {
        const { user } = get();
        if (!user || !user.roles) return false;
        return user.roles.includes(role);
      },

      /**
       * Check if the current user has any of the specified roles
       */
      hasAnyRole: (roles: UserRole[]) => {
        const { user } = get();
        if (!user || !user.roles) return false;
        return roles.some((role) => user.roles?.includes(role));
      },

      /**
       * Check if the current user has all of the specified roles
       */
      hasAllRoles: (roles: UserRole[]) => {
        const { user } = get();
        if (!user || !user.roles) return false;
        return roles.every((role) => user.roles?.includes(role));
      },

      /**
       * Update user's roles (replace all roles)
       */
      updateUserRole: (roles: UserRole[]) => {
        set((state) => ({
          user: state.user ? { ...state.user, roles } : null,
        }));
      },

      /**
       * Add a single role to the user
       */
      addRole: (role: UserRole) => {
        set((state) => {
          if (!state.user) return state;
          const currentRoles = state.user.roles || [];
          if (currentRoles.includes(role)) return state;
          return {
            user: { ...state.user, roles: [...currentRoles, role] },
          };
        });
      },

      /**
       * Remove a single role from the user
       */
      removeRole: (role: UserRole) => {
        set((state) => {
          if (!state.user) return state;
          const currentRoles = state.user.roles || [];
          return {
            user: {
              ...state.user,
              roles: currentRoles.filter((r) => r !== role),
            },
          };
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
