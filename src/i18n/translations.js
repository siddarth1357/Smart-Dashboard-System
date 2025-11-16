// src/i18n/translations.js
export const translations = {
  en: {
    dashboard: 'Dashboard',
    users: 'Users',
    products: 'Products',
    settings: 'Settings',
    welcome: 'Welcome to Admin Dashboard',
    totalUsers: 'Total Users',
    revenue: 'Revenue',
    sales: 'Sales',
    export: 'Export',
    login: 'Login',
    logout: 'Logout',
    search: 'Search...',
    addUser: 'Add New User',
    delete: 'Delete',
    edit: 'Edit'
  },
  es: {
    dashboard: 'Panel',
    users: 'Usuarios',
    products: 'Productos',
    settings: 'Configuración',
    welcome: 'Bienvenido al Panel de Administración',
    totalUsers: 'Usuarios Totales',
    revenue: 'Ingresos',
    sales: 'Ventas',
    export: 'Exportar',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    search: 'Buscar...',
    addUser: 'Agregar Usuario',
    delete: 'Eliminar',
    edit: 'Editar'
  },
  fr: {
    dashboard: 'Tableau de bord',
    users: 'Utilisateurs',
    products: 'Produits',
    settings: 'Paramètres',
    welcome: 'Bienvenue au Tableau de Bord Admin',
    totalUsers: 'Utilisateurs Totaux',
    revenue: 'Revenu',
    sales: 'Ventes',
    export: 'Exporter',
    login: 'Connexion',
    logout: 'Déconnexion',
    search: 'Rechercher...',
    addUser: 'Ajouter un Utilisateur',
    delete: 'Supprimer',
    edit: 'Modifier'
  }
};

export const getLanguage = () => localStorage.getItem('language') || 'en';
export const setLanguage = (lang) => localStorage.setItem('language', lang);