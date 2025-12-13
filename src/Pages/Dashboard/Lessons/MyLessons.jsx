import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { invalidateLessonQueries } from '../../../utils/cacheUtils';
import { Link } from 'react-router'; 
import { AiFillEye, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

const MyLessons = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();

  // Fetch user's lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/lessons/user/${user.email}`);
      return res.data;
    },
  });

  // Fetch current user details to check premium status
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axios.get(`/user/${user.email}`);
      return res.data || {};
    },
  });

  // Toggle privacy mutation
  const togglePrivacyMutation = useMutation({
    mutationFn: (lesson) =>
      axios.patch(`/lessons/privacy/${lesson._id}`, {
        privacy: lesson.privacy === 'Public' ? 'Private' : 'Public',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['myLessons', user?.email]);
      toast.success('Privacy updated!');
    },
  });

  // Toggle access level mutation (Premium users only)
  const toggleAccessMutation = useMutation({
    mutationFn: (lesson) =>
      axios.patch(`/lessons/access/${lesson._id}`, {
        accessLevel: lesson.accessLevel === 'Free' ? 'Premium' : 'Free',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['myLessons', user?.email]);
      toast.success('Access level updated!');
    },
  });

  // Delete lesson mutation
  const deleteLessonMutation = useMutation({
    mutationFn: (id) => axios.delete(`/lessons/${id}`),
    onSuccess: () => {
      // Invalidate lesson-related queries to update UI everywhere
      invalidateLessonQueries(queryClient);
      toast.success('Lesson deleted successfully!');
    },
  });

  const handleDeleteLessons = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this lesson permanently?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return <p className="text-center text-xl pt-10">Loading lessons...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Lessons ({lessons.length})</h2>

      <div className="overflow-x-auto rounded-xl shadow border border-base-300">
        <table className="table text-center">
          <thead className="bg-base-200 font-semibold">
            <tr>
              <th>Serial No</th>
              <th>Title</th>
              <th>Category</th>
              <th>Privacy</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id} className="hover">
                <td>{index + 1}</td>
                <td className="font-medium">{lesson.title}</td>
                <td>{lesson.category}</td>

                {/* Privacy */}
                <td>
                  <button
                    onClick={() => togglePrivacyMutation.mutate(lesson)}
                    className={`badge cursor-pointer ${
                      lesson.privacy === 'Public'
                        ? 'badge-success'
                        : 'badge-warning'
                    }`}
                  >
                    {lesson.privacy}
                  </button>
                </td>

                {/* Access Level */}
                <td>
                  {currentUser?.isPremium ? (
                    <button
                      onClick={() => toggleAccessMutation.mutate(lesson)}
                      className={`badge cursor-pointer ${
                        lesson.accessLevel === 'Free'
                          ? 'badge-info'
                          : 'badge-error'
                      }`}
                    >
                      {lesson.accessLevel}
                    </button>
                  ) : (
                    <span
                      className="badge badge-neutral"
                      title="Premium required"
                    >
                      {lesson.accessLevel === 'Premium'
                        ? 'Premium (Locked)'
                        : 'Free'}
                    </span>
                  )}
                </td>

                {/* Stats */}
                <td>
                  <div className="text-xs">
                    ❤️ {lesson.views || 0} <br />⭐ {lesson.favorites || 0}
                  </div>
                </td>

                {/* Created date */}
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>

                {/* Actions */}
                <td className="flex justify-center gap-2">
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-xs btn-info"
                  >
                    <AiFillEye size={16} />
                  </Link>
                  <Link
                    to={`/dashboard/update_lesson/${lesson._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    <AiOutlineEdit size={16} />
                  </Link>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDeleteLessons(lesson._id)}
                  >
                    <AiFillDelete size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
