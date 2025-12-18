import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaUsers,
  FaCrown,
  FaUserShield,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaBookOpen,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import Spinner from '../../../Components/Spinner/Spinner';

const ManageUsers = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterPremium, setFilterPremium] = useState('All');

  // Fetch all users
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axios.get('/users');
      return res.data;
    },
  });

  // Fetch lessons count for each user
  const { data: userLessonCounts = {} } = useQuery({
    queryKey: ['userLessonCounts'],
    queryFn: async () => {
      const res = await axios.get('/admin/lessons');
      const lessons = res.data;

      const counts = {};
      lessons.forEach((lesson) => {
        counts[lesson.authorEmail] = (counts[lesson.authorEmail] || 0) + 1;
      });

      return counts;
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, newRole }) => {
      console.log('Updating role for:', email, 'to:', newRole);
      return axios.patch(`/admin/users/${email}/role`, { role: newRole });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['allUsers']);
      toast.success('User role updated successfully!');
      console.log('Role update success:', data);
    },
    onError: (error) => {
      console.error('Role update error:', error);

      if (error.response?.status === 404) {
        toast.error(
          'Role update endpoint not found. Please check your backend.'
        );
      } else if (error.response?.status === 500) {
        toast.error('Server error while updating role. Please try again.');
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        toast.error(
          'Cannot connect to server. Please check if backend is running.'
        );
      } else {
        toast.error(
          error.response?.data?.message || 'Failed to update user role'
        );
      }
    },
  });

  // Delete user mutation (optional)
  const deleteUserMutation = useMutation({
    mutationFn: async (email) => {
      console.log('Deleting user:', email);
      return axios.delete(`/admin/users/${email}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['allUsers']);
      toast.success('User deleted successfully!');
      console.log('User delete success:', data);
    },
    onError: (error) => {
      console.error('User delete error:', error);

      if (error.response?.status === 404) {
        toast.error(
          'User delete endpoint not found. Please check your backend.'
        );
      } else if (error.response?.status === 500) {
        toast.error('Server error while deleting user. Please try again.');
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        toast.error(
          'Cannot connect to server. Please check if backend is running.'
        );
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    },
  });

  // Filter users
  const filteredUsers = allUsers.filter((userData) => {
    const matchesSearch =
      userData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === 'All' || userData.role === filterRole.toLowerCase();
    const matchesPremium =
      filterPremium === 'All' ||
      (filterPremium === 'Premium' && userData.isPremium) ||
      (filterPremium === 'Free' && !userData.isPremium);

    return matchesSearch && matchesRole && matchesPremium;
  });

  const handleRoleChange = (email, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const actionText =
      newRole === 'admin' ? 'promote to Admin' : 'demote to User';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update role!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ email, newRole });
      }
    });
  };

  const handleDeleteUser = (email, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete ${name}'s account and all their data!`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete user!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(email);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Manage Users
        </h1>
        <p className="text-base-content/70 text-lg">
          View and manage all registered users on the platform
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-blue-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full text-white">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {allUsers.length}
              </p>
              <p className="text-base-content/60">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full text-white">
              <FaCrown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {allUsers.filter((u) => u.isPremium).length}
              </p>
              <p className="text-base-content/60">Premium Users</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-r from-purple-500 to-indigo-500 rounded-full text-white">
              <FaUserShield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {allUsers.filter((u) => u.role === 'admin').length}
              </p>
              <p className="text-base-content/60">Admins</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-full text-white">
              <FaBookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {Object.values(userLessonCounts).reduce(
                  (sum, count) => sum + count,
                  0
                )}
              </p>
              <p className="text-base-content/60">Total Lessons</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaFilter className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Filter Users</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="All">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>

          {/* Premium Filter */}
          <select
            value={filterPremium}
            onChange={(e) => setFilterPremium(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="All">All Plans</option>
            <option value="Premium">Premium</option>
            <option value="Free">Free</option>
          </select>
        </div>

        <div className="mt-4 text-sm text-base-content/60">
          Showing {filteredUsers.length} of {allUsers.length} users
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Lessons</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userData, index) => (
                <motion.tr
                  key={userData._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          userData.image ||
                          'https://ui-avatars.com/api/?name=' +
                            encodeURIComponent(userData.name || 'User') +
                            '&background=6366f1&color=fff'
                        }
                        alt={userData.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-base-content">
                          {userData.name}
                        </p>
                        {userData.isPremium && (
                          <span className="badge badge-warning badge-xs gap-1">
                            <FaCrown className="w-2 h-2" />
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-base-content/70">
                      {userData.email}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        userData.role === 'admin' ? 'badge-error' : 'badge-info'
                      }`}
                    >
                      {userData.role === 'admin' ? (
                        <>
                          <FaUserShield className="w-3 h-3 mr-1" />
                          Admin
                        </>
                      ) : (
                        'User'
                      )}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        userData.isPremium ? 'badge-warning' : 'badge-neutral'
                      }`}
                    >
                      {userData.isPremium ? 'Premium' : 'Free'}
                    </span>
                  </td>
                  <td>
                    <span className="font-medium">
                      {userLessonCounts[userData.email] || 0}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm text-base-content/60">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(userData.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {/* Don't allow changing own role */}
                      {userData.email !== user?.email && (
                        <>
                          <button
                            onClick={() =>
                              handleRoleChange(userData.email, userData.role)
                            }
                            disabled={updateRoleMutation.isLoading}
                            className={`btn btn-xs ${
                              userData.role === 'admin'
                                ? 'btn-warning'
                                : 'btn-success'
                            }`}
                          >
                            <FaUserShield className="w-3 h-3" />
                            {userData.role === 'admin' ? 'Demote' : 'Promote'}
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteUser(userData.email, userData.name)
                            }
                            disabled={deleteUserMutation.isPending}
                            className="btn btn-xs btn-error"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </>
                      )}
                      {userData.email === user?.email && (
                        <span className="text-xs text-base-content/50">
                          (You)
                        </span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
