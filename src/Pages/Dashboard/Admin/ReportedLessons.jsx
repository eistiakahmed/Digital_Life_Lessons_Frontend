import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaFlag,
  FaTrash,
  FaEye,
  FaCheck,
  FaExclamationTriangle,
  FaBookOpen,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUserShield,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import Spinner from '../../../Components/Spinner/Spinner';

/* ---------- Stat Card ---------- */
const StatCard = ({ icon, label, value, gradient, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`bg-linear-to-r ${gradient} p-6 rounded-2xl text-white shadow-lg`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-4xl opacity-80">{icon}</div>
    </div>
  </motion.div>
);

/* ---------- Main Component ---------- */
const ReportedLessons = () => {
  const axios = useAxios();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterReason, setFilterReason] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [reportedLessons, setReportedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchReportedLessons = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/admin/reported-lessons');
      setReportedLessons(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load reports');
      setReportedLessons([]);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchReportedLessons();
  }, [fetchReportedLessons]);

  // Resolve report - using lessonId to resolve all reports for that lesson
  const resolveReport = async (lessonId, action) => {
    if (!lessonId) {
      toast.error('Lesson ID not found');
      return;
    }

    const result = await Swal.fire({
      title: 'Resolve All Reports?',
      text: `This will ${
        action === 'dismiss' ? 'dismiss' : 'resolve'
      } ALL reports for this lesson. Continue?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, resolve them!',
    });

    if (!result.isConfirmed) return;

    try {
      setIsProcessing(true);
      // Using existing backend endpoint that resolves all reports for a lesson
      await axios.patch(`/admin/reported-lessons/${lessonId}/ignore`, {
        action,
      });
      toast.success('All reports for this lesson resolved successfully');
      fetchReportedLessons();
    } catch (error) {
      console.error(error);
      toast.error('Failed to resolve reports');
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete lesson and all its reports
  const deleteLesson = async (lessonId, lessonTitle) => {
    // Enhanced validation with debugging
    if (!lessonId) {
      console.error('Delete failed: lessonId is', lessonId);
      toast.error(
        'Lesson ID not found. The lesson may have been deleted already.'
      );
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Lesson?',
      html: `Are you sure you want to delete "<strong>${
        lessonTitle || 'this lesson'
      }</strong>"?<br><br><span style="color: #EF4444;">This action cannot be undone!</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#4F46E5',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      setIsProcessing(true);
      // Using existing backend endpoint
      await axios.delete(`/admin/reported-lessons/${lessonId}`);
      toast.success('Lesson and all reports deleted successfully');
      fetchReportedLessons();
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 404) {
        toast.error('Lesson not found. It may have been deleted already.');
      } else {
        toast.error('Failed to delete lesson');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Process data
  const allReports = reportedLessons.flatMap((item) =>
    Array.isArray(item.reports)
      ? item.reports.map((report) => ({
          ...report,
          // Use report.lessonId first, fallback to item.lesson?._id, then item._id
          lessonId: report.lessonId || item.lesson?._id || item._id,
          lessonTitle: item.lesson?.title || 'Deleted Lesson',
        }))
      : []
  );

  const filteredReports = allReports.filter((report) => {
    const matchesSearch =
      report.lessonTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporterEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesReason =
      filterReason === 'All' || report.reason === filterReason;

    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Pending' && !report.resolved) ||
      (filterStatus === 'Resolved' && report.resolved);

    return matchesSearch && matchesReason && matchesStatus;
  });

  // Get unique reasons for filter dropdown
  const uniqueReasons = [...new Set(allReports.map((r) => r.reason))].filter(
    Boolean
  );

  // Calculate stats
  const totalReports = allReports.length;
  const pendingReports = allReports.filter((r) => !r.resolved).length;
  const resolvedReports = allReports.filter((r) => r.resolved).length;
  const uniqueLessons = [...new Set(allReports.map((r) => r.lessonId))].length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="">
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
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Reported Lessons
        </h1>
        <p className="text-base-content/70 text-lg">
          Review and manage reported content on the platform
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<FaFlag />}
          label="Total Reports"
          value={totalReports}
          gradient="from-blue-500 to-blue-700"
          delay={0.1}
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          label="Pending"
          value={pendingReports}
          gradient="from-orange-500 to-orange-700"
          delay={0.2}
        />
        <StatCard
          icon={<FaCheck />}
          label="Resolved"
          value={resolvedReports}
          gradient="from-green-500 to-green-700"
          delay={0.3}
        />
        <StatCard
          icon={<FaBookOpen />}
          label="Unique Lessons"
          value={uniqueLessons}
          gradient="from-purple-500 to-purple-700"
          delay={0.4}
        />
      </div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
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
              placeholder="Search by lesson title, reason, or reporter..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Reason */}
          <select
            className="select select-bordered w-full"
            value={filterReason}
            onChange={(e) => setFilterReason(e.target.value)}
          >
            <option value="All">All Reasons</option>
            {uniqueReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          {/* Filter by Status */}
          <select
            className="select select-bordered w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="mt-4 text-sm text-base-content/60">
          Showing {filteredReports.length} of {totalReports} reports
          {(searchTerm || filterReason !== 'All' || filterStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterReason('All');
                setFilterStatus('All');
              }}
              className="btn btn-sm btn-ghost ml-4"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Serial No</th>
                <th>Lesson Title</th>
                <th>Reporter</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
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
                    <span className="font-medium text-base-content">
                      {index + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FaBookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          {report.reportLessonTitle || 'Unknown Lesson'}
                        </p>
                        <p className="text-sm text-base-content/60">
                          ID: {report.lessonId?.slice(-8) || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaUserShield className="w-4 h-4 text-base-content/50" />
                      <span className="text-sm text-base-content/70">
                        {report.reporterEmail || 'Anonymous'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline badge-lg">
                      {report.reason}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-lg ${
                        report.resolved 
                          ? 'badge-success' 
                          : 'badge-warning'
                      }`}
                    >
                      {report.resolved ? (
                        <>
                          <FaCheck className="w-3 h-3 mr-1" />
                          Resolved
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="w-3 h-3 mr-1" />
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
                    <div className="flex gap-2">
                      {report.lessonId && (
                        <Link
                          to={`/lesson/${report.lessonId}`}
                          className="btn btn-sm btn-info"
                          title="View Lesson"
                        >
                          <FaEye className="w-3 h-3" />
                        </Link>
                      )}

                      {!report.resolved && (
                        <>
                          <button
                            disabled={isProcessing}
                            onClick={() =>
                              resolveReport(report.lessonId, 'dismiss')
                            }
                            className="btn btn-sm btn-success"
                            title="Dismiss All Reports for This Lesson"
                          >
                            <FaCheck className="w-3 h-3" />
                          </button>

                          <button
                            disabled={isProcessing || !report.lessonId}
                            onClick={() =>
                              deleteLesson(report.lessonId, report.lessonTitle)
                            }
                            className="btn btn-sm btn-error"
                            title={
                              !report.lessonId
                                ? 'Lesson already deleted'
                                : 'Delete Lesson'
                            }
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="p-4 bg-base-200 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <FaFlag className="w-8 h-8 text-base-content/30" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              {totalReports === 0 ? 'No Reports Found' : 'No Matching Reports'}
            </h3>
            <p className="text-base-content/60">
              {totalReports === 0
                ? 'There are currently no reported lessons on the platform.'
                : 'Try adjusting your filters to see more results.'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ReportedLessons;
