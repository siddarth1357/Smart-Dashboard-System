// src/utils/rbac.js

export const roles = {
  SUPER_ADMIN: ['*'], // Full access to everything
  ADMIN: ['*'], // Full access to everything
  MANAGER: [
    'dashboard', 
    'users:read', 
    'users:write', 
    'products:read', 
    'products:write', 
    'settings'
  ],
  USER: [
    'dashboard', 
    'products:read'
  ],
  GUEST: [
    'dashboard'
  ]
};

export const hasPermission = (userRole, permission) => {
  // If no user role, deny access
  if (!userRole) return false;
  
  // If role doesn't exist in our roles object, deny access
  if (!roles[userRole]) return false;
  
  // If role has wildcard (*), grant all permissions
  if (roles[userRole].includes('*')) return true;
  
  // Check if role has the specific permission
  return roles[userRole].includes(permission);
};

export const canAccessPage = (userRole, page) => {
  // Page to permission mapping
  const pagePermissions = {
    dashboard: 'dashboard',
    users: 'users:read',
    products: 'products:read', 
    settings: 'settings'
  };
  
  // Always allow dashboard for any authenticated user
  if (page === 'dashboard') return true;
  
  // Get the required permission for this page
  const requiredPermission = pagePermissions[page];
  
  // If page doesn't require specific permission, allow access
  if (!requiredPermission) return true;
  
  // Check if user has the required permission
  return hasPermission(userRole, requiredPermission);
};

// Additional utility functions
export const getUserPermissions = (userRole) => {
  if (!userRole || !roles[userRole]) return [];
  
  if (roles[userRole].includes('*')) {
    return ['all_permissions'];
  }
  
  return roles[userRole];
};

export const canPerformAction = (userRole, resource, action) => {
  const permission = `${resource}:${action}`;
  return hasPermission(userRole, permission);
};

// Default role for new users
export const getDefaultRole = () => 'ADMIN';

// Role hierarchy for privilege escalation checks
export const roleHierarchy = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  MANAGER: 2,
  USER: 1,
  GUEST: 0
};

export const canManageRole = (currentUserRole, targetRole) => {
  const currentLevel = roleHierarchy[currentUserRole] || 0;
  const targetLevel = roleHierarchy[targetRole] || 0;
  
  return currentLevel > targetLevel;
};