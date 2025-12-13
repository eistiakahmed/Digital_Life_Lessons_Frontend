/**
 * Utility functions for managing React Query cache invalidation
 */

/**
 * Invalidates all user-related queries when user profile is updated
 * @param {QueryClient} queryClient - React Query client instance
 */
export const invalidateUserQueries = (queryClient) => {
  const userRelatedQueries = [
    ['currentUser'],
    ['topContributors'],
    ['mostSavedLessons'],
    ['userLessons'],
    ['user'],
    ['allUsers'], // For admin user management
    ['publicProfile'], // For public profile pages
    ['publicUserLessons'], // For public profile lessons
  ];

  userRelatedQueries.forEach(queryKey => {
    queryClient.invalidateQueries(queryKey);
  });
};

/**
 * Invalidates lesson-related queries when lessons are updated
 * @param {QueryClient} queryClient - React Query client instance
 */
export const invalidateLessonQueries = (queryClient) => {
  const lessonRelatedQueries = [
    ['publicLessons'],
    ['mostSavedLessons'],
    ['userLessons'],
    ['publicUserLessons'], // For public profile lessons
    ['topContributors'], // Contributors might change based on lesson updates
  ];

  lessonRelatedQueries.forEach(queryKey => {
    queryClient.invalidateQueries(queryKey);
  });
};