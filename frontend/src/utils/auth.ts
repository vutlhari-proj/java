import { userStorage } from "@/config";

export const authUtils = {
  // Logout function that clears all user data
  logout: (): void => {
    userStorage.clearSession();
    // Redirect to login page
    window.location.href = '/login';
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return userStorage.isLoggedIn();
  },

  // Get current user
  getCurrentUser: () => {
    return userStorage.getUser();
  },

  // Get user role for authorization checks
  getUserRole: () => {
    return userStorage.getUserRole();
  }
};