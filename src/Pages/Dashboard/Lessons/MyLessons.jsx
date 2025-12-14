import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { AiFillEye, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { FaBookOpen, FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyLessons = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch my lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/lessons/user/${user.email}`);
      return res.data;
    },
  });

  // Fetch current user
  const { data: currentUser = {} } = useQuery({
    queryKey: ['currentUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/user/${user.email}`);
      return res.data || {};
    },
  });

  const handleTogglePrivacy = async (lesson) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/lessons/privacy/${lesson._id}`, {
        privacy: lesson.privacy === 'Public' ? 'Private' : 'Public',
      });
      toast.success('Privacy updated');
      queryClient.invalidateQueries(['myLessons', user?.email]);
      queryClient.invalidateQueries(['publicLessons']);
    } catch {
      toast.error('Failed to update privacy');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleAccess = async (lesson) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/lessons/access/${lesson._id}`, {
        accessLevel: lesson.accessLevel === 'Free' ? 'Premium' : 'Free',
      });
      toast.success('Access updated');
      queryClient.invalidateQueries(['myLessons', user?.email]);
      queryClient.invalidateQueries(['publicLessons']);
    } catch {
      toast.error('Failed to update access');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    try {
      await axios.delete(`/lessons/${id}`);
      toast.success('Lesson deleted');
      queryClient.invalidateQueries(['myLessons', user?.email]);
      queryClient.invalidateQueries(['publicLessons']);
    } catch {
      toast.error('Delete failed');
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This lesson will be deleted permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.isConfirmed) handleDeleteLesson(id);
    });
  };

  if (isLoading) {
    return <p className="text-center text-xl pt-10">Loading lessons...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Lessons ({lessons.length})</h2>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Lesson</th>
              <th>Category</th>
              <th>Privacy</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td className="flex gap-3">
                  <span>{lesson.title}</span>
                </td>

                <td>{lesson.category}</td>

                <td>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleTogglePrivacy(lesson)}
                    className="btn btn-xs"
                  >
                    {lesson.privacy}
                  </button>
                </td>

                <td>
                  {currentUser?.isPremium ? (
                    <button
                      disabled={isUpdating}
                      onClick={() => handleToggleAccess(lesson)}
                      className="btn btn-xs"
                    >
                      {lesson.accessLevel}
                    </button>
                  ) : (
                    <span>{lesson.accessLevel}</span>
                  )}
                </td>

                <td className="flex gap-3 justify-center">
                  <span>
                    <AiFillEye /> {lesson.views || 0}
                  </span>
                  <span>
                    <FaHeart /> {lesson.likesCount || 0}
                  </span>
                </td>

                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-2 justify-center">
                  <Link to={`/lesson/${lesson._id}`}>
                    <AiFillEye />
                  </Link>
                  <Link to={`/dashboard/update-lesson/${lesson._id}`}>
                    <AiOutlineEdit />
                  </Link>
                  <button onClick={() => confirmDelete(lesson._id)}>
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="border p-4 rounded-xl">
            <h3 className="font-semibold">{lesson.title}</h3>
            <p className="text-sm text-gray-500">{lesson.category}</p>

            <div className="flex gap-2 my-2">
              <button
                onClick={() => handleTogglePrivacy(lesson)}
                className="btn btn-xs"
              >
                {lesson.privacy}
              </button>

              {currentUser?.isPremium && (
                <button
                  onClick={() => handleToggleAccess(lesson)}
                  className="btn btn-xs"
                >
                  {lesson.accessLevel}
                </button>
              )}
            </div>

            <div className="flex gap-3 text-sm">
              <span>
                <AiFillEye /> {lesson.views || 0}
              </span>
              <span>
                <FaHeart /> {lesson.likesCount || 0}
              </span>
            </div>

            <div className="flex gap-2 mt-3">
              <Link to={`/lesson/${lesson._id}`} className="btn btn-sm">
                View
              </Link>
              <Link
                to={`/dashboard/update-lesson/${lesson._id}`}
                className="btn btn-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => confirmDelete(lesson._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLessons;
