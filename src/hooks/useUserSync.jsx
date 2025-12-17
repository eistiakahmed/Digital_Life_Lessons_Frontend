import { useEffect } from 'react';
import useAuth from './useAuth';
import { syncUserWithBackend } from '../utils/userSync';

const useUserSync = () => {
  const { user, userDB, refreshUserData } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      // Only sync if user exists but not in database
      if (user && user.email && !userDB) {
        console.log('User exists in Firebase but not in database, syncing...');
        
        try {
          await syncUserWithBackend(user);
          // Refresh user data after sync
          setTimeout(() => {
            refreshUserData();
          }, 2000);
        } catch (error) {
          console.error('Failed to sync user:', error);
        }
      }
    };

    // Run sync after a delay to ensure Firebase auth is complete
    const timeoutId = setTimeout(syncUser, 2000);

    return () => clearTimeout(timeoutId);
  }, [user, userDB, refreshUserData]);

  return null;
};

export default useUserSync;