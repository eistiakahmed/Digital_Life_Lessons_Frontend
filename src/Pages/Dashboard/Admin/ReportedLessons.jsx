import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
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

/* ---------- Stat Card ---------- */
const StatCard = ({ icon, label, value, color }) => (
  <div className="p-4 border rounded-xl flex items-center gap-4 shadow hover:shadow-lg transition ">
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
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

  const resolveReport = async (reportId, action) => {
    const result = await Swal.fire({
      title: 'Resolve Report?',
      text: `Are you sure you want to ${
        action === 'dismiss' ? 'dismiss' : 'resolve'
      } this report?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, resolve it!',
    });

    if (!result.isConfirmed) return;

    try {
      setIsProcessing(true);
      await axios.patch(`/admin/reports/${reportId}/resolve`, { action });
      toast.success('Report resolved successfully');
      fetchReportedLessons();
    } catch (error) {
      console.error(error);
      toast.error('Failed to resolve report');
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteLesson = async (lessonId, lessonTitle) => {
    const result = await Swal.fire({
      title: 'Delete Lesson?',
      html: `Are you sure you want to delete "<strong>${lessonTitle}</strong>"?<br><br><span style="color: red;">This action cannot be undone!</span>`,
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
      await axios.delete(`/lessons/${lessonId}`);
      toast.success('Lesson deleted successfully');
      fetchReportedLessons();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete lesson');
    } finally {
      setIsProcessing(false);
    }
  };

  const allReports = reportedLessons.flatMap((item) =>
    Array.isArray(item.reports)
      ? item.reports.map((report) => ({
          ...report,
          lessonId: item.lesson?._id,
          lessonTitle: item.lesson?.title,
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

  const uniqueReasons = [...new Set(allReports.map((r) => r.reason))].filter(
    Boolean
  );

  const totalReports = allReports.length;
  const pendingReports = allReports.filter((r) => !r.resolved).length;
  const resolvedReports = allReports.filter((r) => r.resolved).length;
  const uniqueLessons = [...new Set(allReports.map((r) => r.lessonId))].length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Reported Lessons</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<FaFlag />}
          label="Total Reports"
          value={totalReports}
          color="text-blue-500"
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          label="Pending"
          value={pendingReports}
          color="text-orange-400"
        />
        <StatCard
          icon={<FaCheck color="text-green-500" />}
          label="Resolved"
          value={resolvedReports}
        />
        <StatCard
          icon={<FaBookOpen color="text-purple-500" />}
          label="Unique Lessons"
          value={uniqueLessons}
        />
      </div>

      {/* Filters */}
      <div className=" rounded-xl shadow-md p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label className="label flex items-center gap-2 mb-1">
              <FaSearch /> <span>Search</span>
            </label>
            <input
              type="text"
              placeholder="Search by lesson, reason, or reporter..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Reason */}
          <div className="flex-1">
            <label className="label flex items-center gap-2 mb-1">
              <FaFilter /> <span>Filter by Reason</span>
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
          <div className="flex-1">
            <label className="label flex items-center gap-2 mb-1">
              <FaFilter /> <span>Filter by Status</span>
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

      {/* Reports Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table w-full min-w-[700px]">
          <thead className=" bg-gray-200">
            <tr>
              <th>SN</th>
              <th>Lesson Title</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={report._id} className="">
                <td>{index + 1}</td>
                <td>{report.lessonTitle}</td>
                <td>{report.reason}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      report.resolved ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  >
                    {report.resolved ? 'Resolved' : 'Pending'}
                  </span>
                </td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  {report.lessonId && (
                    <Link
                      to={`/lesson/${report.lessonId}`}
                      className="btn btn-xs btn-info hover:bg-blue-600"
                    >
                      <FaEye />
                    </Link>
                  )}

                  {!report.resolved && (
                    <>
                      <button
                        disabled={isProcessing}
                        onClick={() => resolveReport(report._id, 'dismiss')}
                        className="btn btn-xs btn-success hover:bg-green-600"
                      >
                        <FaCheck />
                      </button>

                      <button
                        disabled={isProcessing}
                        onClick={() =>
                          deleteLesson(report.lessonId, report.lessonTitle)
                        }
                        className="btn btn-xs btn-error hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReports.length === 0 && (
          <p className="text-center py-10 text-gray-500">No reports found</p>
        )}
      </div>
    </div>
  );
};

export default ReportedLessons;
