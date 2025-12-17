import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { refreshUserFromBackend } from '../utils/userSync';
import axios from 'axios';

const UserProfileSync = ({ children }) => {
  const { user, userDB, refreshUserData } = useAuth();

  useEffect(() => {
    const syncProfile = async () => {
      if (user?.email && (!userDB || !userDB.displayName || !userDB.photoURL)) {
        try {
          // Try to refresh user data from backend
          await refreshUserData();
          
          // If still no data, sync the current Firebase user
          const backendUser = await refreshUserFromBackend(user.email);
          if (!backendUser && user.displayName) {
            // User exists in Firebase but not in backend, sync them
            const userInfo = {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              isPremium: false,
              role: 'user',
            };
            
            await axios.post(`${import.meta.env.VITE_API_URL}/user`, userInfo);
            await refreshUserData();
          }
        } catch (error) {
          console.error('Error syncing user profile:', error);
        }
      }
    };

    syncProfile();
  }, [user, userDB, refreshUserData]);

  return children;
};

export default UserProfileSync;