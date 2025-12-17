import axios from 'axios';

// Utility function to sync user data with backend
export const syncUserWithBackend = async (user, additionalData = {}) => {
  if (!user?.email) {
    console.log('No user email provided for sync');
    return null;
  }

  try {
    const userInfo = {
      displayName: user.displayName || user.name || 'User',
      email: user.email,
      photoURL: user.photoURL || user.image || '',
      isPremium: false,
      role: 'user',
      ...additionalData,
    };

    console.log('Syncing user with backend:', userInfo);

    // Create axios instance with proper base URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await axios.post(`${apiUrl}/user`, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('User sync response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error syncing user with backend:', error.response?.data || error.message);
    // Don't throw error to prevent login failure
    return null;
  }
};

// Utility function to refresh user data from backend
export const refreshUserFromBackend = async (email) => {
  if (!email) return null;

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user from backend:', error);
    return null;
  }
};