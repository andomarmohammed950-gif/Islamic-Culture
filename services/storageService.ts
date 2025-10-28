import { UserProfile } from '../types';

const USER_KEY = 'islamicCultureUser';

export const saveUser = (user: UserProfile): void => {
  try {
    const userString = JSON.stringify(user);
    localStorage.setItem(USER_KEY, userString);
  } catch (error) {
    console.error("Failed to save user data to localStorage", error);
  }
};

export const getUser = (): UserProfile | null => {
  try {
    const userString = localStorage.getItem(USER_KEY);
    if (userString) {
      const user = JSON.parse(userString) as UserProfile;
      // For backward compatibility, ensure finalExamResults exists
      if (!user.finalExamResults) {
        user.finalExamResults = {};
      }
      return user;
    }
    return null;
  } catch (error) {
    console.error("Failed to retrieve user data from localStorage", error);
    return null;
  }
};

export const clearUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Failed to clear user data from localStorage", error);
  }
};
