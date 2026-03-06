/**
 * Authorization Skill - Types
 *
 * Defines roles, permissions, and related types for the authorization skill
 */

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

export interface RolePermissions {
  [UserRole.ADMIN]: string[];
  [UserRole.USER]: string[];
  [UserRole.CUSTOMER]: string[];
  [UserRole.GUEST]: string[];
}

/**
 * Define what actions each role can perform
 */
export const rolePermissions: RolePermissions = {
  [UserRole.ADMIN]: [
    'manage-users',
    'manage-products',
    'view-analytics',
    'access-admin-dashboard',
    'view-products',
    'purchase-products',
  ],
  [UserRole.USER]: [
    'view-products',
    'purchase-products',
    'manage-cart',
    'view-orders',
  ],
  [UserRole.CUSTOMER]: [
    'view-products',
    'purchase-products',
    'manage-cart',
    'view-orders',
  ],
  [UserRole.GUEST]: ['view-products'],
};

export type AuthorizationAction =
  | 'manage-users'
  | 'manage-products'
  | 'view-analytics'
  | 'access-admin-dashboard'
  | 'view-products'
  | 'purchase-products'
  | 'manage-cart'
  | 'view-orders';
