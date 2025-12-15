import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { AiFillEye, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyLessons = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/lessons?email=${user?.email}`);
      return res.data;
    },
  });

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
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteLesson(id);
      }
    });
  };

  /* ================= UI States ================= */
  if (isLoading) {
    return <p className="text-center text-xl pt-10">Loading lessons...</p>;
  }

  

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Lessons ({lessons.length})</h2>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Serial No</th>
              <th>Lesson</th>
              <th>Category</th>
              <th>Privacy</th>
              <th>Access</th>
              <th className="text-center">Stats</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{lesson.title}</td>
                <td>{lesson.category}</td>

                {/* Privacy Button */}
                <td>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleTogglePrivacy(lesson)}
                    className={`btn btn-xs ${
                      lesson.privacy === 'Public'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {lesson.privacy}
                  </button>
                </td>

                {/* Access Button */}
                <td>
                  {currentUser?.isPremium ? (
                    <button
                      disabled={isUpdating}
                      onClick={() => handleToggleAccess(lesson)}
                      className={`btn btn-xs ${
                        lesson.accessLevel === 'Free'
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-500 text-white'
                      }`}
                    >
                      {lesson.accessLevel}
                    </button>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        lesson.accessLevel === 'Free'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  )}
                </td>

                <td className="flex flex-col lg:flex-row justify-center items-center gap-4">
                  <span className="flex items-center gap-1">
                    <AiFillEye color="blue" /> {lesson.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart color="red" /> {lesson.likesCount || 0}
                  </span>
                </td>

                {/* Created */}
                <td>
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : '—'}
                </td>

                {/* Actions */}
                <td className="flex flex-col lg:flex-row items-center gap-3">
                  <Link
                    to={`/lesson/${lesson._id}`}
                    title="View"
                    className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <AiFillEye size={16} />
                  </Link>
                  <Link
                    to={`/dashboard/update_lesson/${lesson._id}`}
                    title="Edit"
                    className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-black rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <AiOutlineEdit size={16} />
                  </Link>
                  <button
                    onClick={() => confirmDelete(lesson._id)}
                    title="Delete"
                    className="btn btn-xs bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
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
