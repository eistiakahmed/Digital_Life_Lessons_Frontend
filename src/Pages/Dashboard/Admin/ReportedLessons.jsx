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
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import Spinner from '../../../Components/Spinner/Spinner';

/* ---------- Stat Card ---------- */
const StatCard = ({ icon, label, value }) => (
  <div className="p-4 shadow-md rounded-xl flex items-center gap-4">
    <div className="text-xl">{icon}</div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-base-content/60">{label}</p>
    </div>
  </div>
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
      }</strong>"?<br><br><span style="color: red;">This action cannot be undone!</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
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
      <h1 className="text-4xl font-bold text-center text-primary">
        Reported Lessons
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FaFlag color="blue" />}
          label="Total Reports"
          value={totalReports}
        />
        <StatCard
          icon={<FaExclamationTriangle color="orange" />}
          label="Pending"
          value={pendingReports}
        />
        <StatCard
          icon={<FaCheck color="green" />}
          label="Resolved"
          value={resolvedReports}
        />
        <StatCard
          icon={<FaBookOpen color="purple" />}
          label="Unique Lessons"
          value={uniqueLessons}
        />
      </div>

      {/* Filters Section */}
      <div className="bg-base-100 rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaSearch /> Search
              </span>
            </label>
            <input
              type="text"
              placeholder="Search by lesson title, reason, or reporter..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Reason */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaFilter /> Filter by Reason
              </span>
            </label>
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
          </div>

          {/* Filter by Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaFilter /> Filter by Status
              </span>
            </label>
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
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-base-content/60">
          Showing {filteredReports.length} of {totalReports} reports
        </p>
        {(searchTerm || filterReason !== 'All' || filterStatus !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterReason('All');
              setFilterStatus('All');
            }}
            className="btn btn-sm btn-ghost"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md">
        <table className="table">
          <thead>
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
              <tr key={report._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="font-medium">
                    {report.reportLessonTitle || 'Unknown Lesson'}
                  </div>
                </td>
                <td>
                  <div className="text-sm text-base-content/70">
                    {report.reporterEmail || 'Anonymous'}
                  </div>
                </td>
                <td>
                  <span className="badge badge-outline">{report.reason}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      report.resolved ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {report.resolved ? 'Resolved' : 'Pending'}
                  </span>
                </td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    {report.lessonId && (
                      <Link
                        to={`/lesson/${report.lessonId}`}
                        className="btn btn-xs btn-info"
                        title="View Lesson"
                      >
                        <FaEye />
                      </Link>
                    )}

                    {!report.resolved && (
                      <>
                        <button
                          disabled={isProcessing}
                          onClick={() =>
                            resolveReport(report.lessonId, 'dismiss')
                          }
                          className="btn btn-xs btn-success"
                          title="Dismiss All Reports for This Lesson"
                        >
                          <FaCheck />
                        </button>

                        <button
                          disabled={isProcessing || !report.lessonId}
                          onClick={() =>
                            deleteLesson(report.lessonId, report.lessonTitle)
                          }
                          className="btn btn-xs btn-error"
                          title={
                            !report.lessonId
                              ? 'Lesson already deleted'
                              : 'Delete Lesson'
                          }
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReports.length === 0 && (
          <div className="text-center py-10">
            <FaFlag className="w-16 h-16 mx-auto text-base-content/20 mb-4" />
            <p className="text-base-content/60">
              {totalReports === 0
                ? 'No reports found'
                : 'No reports match your filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedLessons;
