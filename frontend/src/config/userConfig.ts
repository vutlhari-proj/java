import type { Role } from "@/services";

interface User {
  username: string;
  name: string;
  surname: string;
  role: Role;
}

interface UserConfig {
  sessionKey: string;
  defaultUser: User | null;
}

export const userConfig: UserConfig = {
  sessionKey: "current_user",
  defaultUser: null,
};

// User management functions
export const userStorage = {
  // Set user in session storage
  setUser: (user: User): void => {
    sessionStorage.setItem(userConfig.sessionKey, JSON.stringify(user));
  },

  // Get user from session storage
  getUser: (): User | null => {
    const userData = sessionStorage.getItem(userConfig.sessionKey);
    if (!userData) return userConfig.defaultUser;

    try {
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error("Error parsing user data from session storage:", error);
      return userConfig.defaultUser;
    }
  },

  // Remove user from session storage
  removeUser: (): void => {
    sessionStorage.removeItem(userConfig.sessionKey);
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return userStorage.getUser() !== null;
  },

  // Get user role
  getUserRole: (): Role | null => {
    const user = userStorage.getUser();
    return user ? user.role : null;
  },

  // Update user data (merge with existing)
  updateUser: (updates: Partial<User>): void => {
    const currentUser = userStorage.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      userStorage.setUser(updatedUser);
    }
  },

  // Clear all user session data
  clearSession: (): void => {
    userStorage.removeUser();
  },
};

// Export types for use in other files
export type { User };
