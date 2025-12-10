import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { AiFillEye, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';

const MyLessons = () => {
  const { user, isPremiumUser } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);

  // Fetch user's lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/lessons?email=${user?.email}`);
      return res.data;
    },
  });

  // Toggle privacy mutation
  const togglePrivacyMutation = useMutation({
    mutationFn: async (lesson) => {
      return axios.patch(`/lessons/privacy/${lesson._id}`, {
        privacy: lesson.privacy === 'Public' ? 'Private' : 'Public',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myLessons']);
      toast.success('Privacy updated!');
    },
  });

  // Toggle access level mutation
  const toggleAccessMutation = useMutation({
    mutationFn: async (lesson) => {
      return axios.patch(`/lessons/access/${lesson._id}`, {
        accessLevel: lesson.accessLevel === 'Free' ? 'Premium' : 'Free',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myLessons']);
      toast.success('Access level updated!');
    },
  });

  // Delete lesson mutation
  const deleteLessonMutation = useMutation({
    mutationFn: async () => {
      return axios.delete(`/lessons/${deleteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myLessons']);
      toast.success('Lesson deleted!');
      setDeleteId(null);
    },
  });

  if (isLoading)
    return <p className="text-center text-xl pt-10">Loading lessons...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Lessons ({lessons.length})</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-base-300">
        <table className="table text-center">
          <thead className="bg-base-200 font-semibold">
            <tr>
              <th>#</th>
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

                {/* Privacy Toggle */}
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
                  {isPremiumUser ? (
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
                      {lesson.accessLevel}
                    </span>
                  )}
                </td>

                {/* Stats */}
                <td>
                  <div className="text-xs">
                    ❤️ {lesson.reactions || 0} <br />⭐ {lesson.favorites || 0}
                  </div>
                </td>

                {/* Created date */}
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>

                {/* Actions */}
                <td className="flex justify-center gap-2">
                  {/* Details */}
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-xs btn-info"
                  >
                    <AiFillEye size={16} />
                  </Link>

                  {/* Edit */}
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    <AiOutlineEdit size={16} />
                  </Link>

                  {/* Delete */}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => setDeleteId(lesson._id)}
                  >
                    <AiFillDelete size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-base-100 p-6 rounded-xl w-80 shadow-xl">
            <h3 className="text-lg font-bold mb-3">Delete Lesson?</h3>
            <p className="text-sm mb-5">
              Are you sure you want to delete this lesson permanently?
            </p>

            <div className="flex justify-end gap-2">
              <button className="btn btn-sm" onClick={() => setDeleteId(null)}>
                Cancel
              </button>

              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteLessonMutation.mutate()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;
