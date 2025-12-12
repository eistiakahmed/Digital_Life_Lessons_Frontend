import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaFlag,
  FaTrash,
  FaEye,
  FaCheck,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaUser,
  FaBookOpen,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const ReportedLessons = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReason, setFilterReason] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Fetch reported lessons
  const { data: reportedLessons = [], isLoading } = useQuery({
    queryKey: ['reportedLessons'],
    queryFn: async () => {
      const res = await axios.get('/admin/reported-lessons');
      return res.data;
    },
  });

  // Resolve report mutation
  const resolveReportMutation = useMutation({
    mutationFn: async ({ reportId, action }) => {
      return axios.patch(`/admin/reports/${reportId}/resolve`, { action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reportedLessons']);
      toast.success('Report resolved successfully!');
    },
    onError: (error) => {
      toast.error('Failed to resolve report');
      console.error(error);
    },
  });

  // Delete lesson mutation
  const deleteLessonMutation = useMutation({
    mutationFn: async (lessonId) => {
      return axios.delete(`/lessons/${lessonId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reportedLessons']);
      queryClient.invalidateQueries(['allLessons']);
      toast.success('Lesson deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete lesson');
      console.error(error);
    },
  });

  // Filter reports - handle both grouped and individual report formats
  const allReports = reportedLessons.flatMap(item => {
    // If it's grouped format (from current backend)
    if (item.reports && Array.isArray(item.reports)) {
      return item.reports.map(report => ({
        ...report,
        lessonTitle: item.lesson?.title || 'Unknown Lesson',
        lessonAuthor: item.lesson?.authorName || 'Unknown Author',
        lessonImage: item.lesson?.image,
      }));
    }
    // If it's individual report format (from updated backend)
    return [item];
  });

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.lessonTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = filterReason === 'All' || report.reason === filterReason;
    const matchesStatus = filterStatus === 'All' || 
                         (filterStatus === 'Pending' && !report.resolved) ||
                         (filterStatus === 'Resolved' && report.resolved);
    
    return matchesSearch && matchesReason && matchesStatus;
  });

  const handleResolveReport = (report, action) => {
    const actionText = action === 'dismiss' ? 'dismiss this report' : 'take action on this report';
    
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, resolve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        resolveReportMutation.mutate({ reportId: report._id, action });
      }
    });
  };

  const handleDeleteLesson = (report) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete "${report.lessonTitle}" and resolve all reports for it!`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete lesson!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(report.lessonId);
      }
    });
  };

  // Calculate stats
  const totalReports = allReports.length;
  const pendingReports = allReports.filter(r => !r.resolved).length;
  const resolvedReports = allReports.filter(r => r.resolved).length;
  const uniqueLessons = [...new Set(allReports.map(r => r.lessonId))].length;

  const reportReasons = ['All', 'Inappropriate Content', 'Spam', 'Harassment', 'Copyright', 'Other'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading loading-spinner loading-lg"></div>
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Reported Content
        </h1>
        <p className="text-base-content/70 text-lg">
          Review and moderate reported lessons on the platform
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-red-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white">
              <FaFlag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{totalReports}</p>
              <p className="text-base-content/60">Total Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white">
              <FaExclamationTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{pendingReports}</p>
              <p className="text-base-content/60">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white">
              <FaCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{resolvedReports}</p>
              <p className="text-base-content/60">Resolved</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white">
              <FaBookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{uniqueLessons}</p>
              <p className="text-base-content/60">Unique Lessons</p>
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
          <h2 className="text-xl font-bold">Filter Reports</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          {/* Reason Filter */}
          <select
            value={filterReason}
            onChange={(e) => setFilterReason(e.target.value)}
            className="select select-bordered w-full"
          >
            {reportReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="mt-4 text-sm text-base-content/60">
          Showing {filteredReports.length} of {totalReports} reports
        </div>
      </motion.div>

      {/* Reports Table */}
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
                <th>Reported Lesson</th>
                <th>Reporter</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <motion.tr
                  key={report._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover"
                >
                  <td>
                    <div className="flex items-start gap-3">
                      {report.lessonImage && (
                        <img
                          src={report.lessonImage}
                          alt={report.lessonTitle}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-base-content line-clamp-2">
                          {report.lessonTitle}
                        </p>
                        <p className="text-sm text-base-content/60">
                          by {report.lessonAuthor}
                        </p>
                        {report.description && (
                          <p className="text-xs text-base-content/50 mt-1 line-clamp-2">
                            {report.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <FaUser className="w-3 h-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-base-content">
                          {report.reporterName}
                        </p>
                        <p className="text-xs text-base-content/60">
                          {report.reporterEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span className="badge badge-error badge-sm mb-1">
                        {report.reason}
                      </span>
                      {report.details && (
                        <p className="text-xs text-base-content/60 line-clamp-2">
                          {report.details}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${report.resolved ? 'badge-success' : 'badge-warning'}`}>
                      {report.resolved ? (
                        <>
                          <FaCheck className="w-2 h-2 mr-1" />
                          Resolved
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="w-2 h-2 mr-1" />
                          Pending
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm text-base-content/60">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/lesson/${report.lessonId}`}
                        className="btn btn-xs btn-info"
                        title="View Lesson"
                      >
                        <FaEye className="w-3 h-3" />
                      </Link>
                      
                      {!report.resolved && (
                        <>
                          <button
                            onClick={() => handleResolveReport(report, 'dismiss')}
                            disabled={resolveReportMutation.isPending}
                            className="btn btn-xs btn-success"
                            title="Dismiss Report"
                          >
                            <FaCheck className="w-3 h-3" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteLesson(report)}
                            disabled={deleteLessonMutation.isPending}
                            className="btn btn-xs btn-error"
                            title="Delete Lesson"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FaFlag className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-base-content/60 mb-2">
              No Reports Found
            </h3>
            <p className="text-base-content/50">
              {totalReports === 0 
                ? "No lessons have been reported yet." 
                : "No reports match your current filters."
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReportedLessons;