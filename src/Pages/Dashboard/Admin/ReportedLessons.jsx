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
} from 'react-icons/fa';
import Swal from 'sweetalert2';

/* ---------- Stat Card ---------- */
const StatCard = ({ icon, label, value }) => (
  <div className="p-4 border rounded-xl flex items-center gap-4">
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

  /* ---------- Fetch Reports ---------- */
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

  /* ---------- Actions ---------- */
  const resolveReport = async (reportId, action) => {
    try {
      setIsProcessing(true);
      await axios.patch(`/admin/reports/${reportId}/resolve`, { action });
      toast.success('Report resolved');
      fetchReportedLessons();
    } catch {
      toast.error('Failed to resolve report');
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      setIsProcessing(true);
      await axios.delete(`/lessons/${lessonId}`);
      toast.success('Lesson deleted');
      fetchReportedLessons();
    } catch {
      toast.error('Failed to delete lesson');
    } finally {
      setIsProcessing(false);
    }
  };

  /* ---------- Data Processing ---------- */
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
      report.reason?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesReason =
      filterReason === 'All' || report.reason === filterReason;

    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Pending' && !report.resolved) ||
      (filterStatus === 'Resolved' && report.resolved);

    return matchesSearch && matchesReason && matchesStatus;
  });

  
  const totalReports = allReports.length;
  const pendingReports = allReports.filter((r) => !r.resolved).length;
  const resolvedReports = allReports.filter((r) => r.resolved).length;
  const uniqueLessons = [...new Set(allReports.map((r) => r.lessonId))].length;

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Reported Lessons</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FaFlag />}
          label="Total Reports"
          value={totalReports}
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          label="Pending"
          value={pendingReports}
        />
        <StatCard icon={<FaCheck />} label="Resolved" value={resolvedReports} />
        <StatCard
          icon={<FaBookOpen />}
          label="Unique Lessons"
          value={uniqueLessons}
        />
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl border">
        <table className="table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Lesson</th>
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
                <td>{report.lessonTitle}</td>
                <td>{report.reason}</td>
                <td>{report.resolved ? 'Resolved' : 'Pending'}</td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  {report.lessonId && (
                    <Link
                      to={`/lesson/${report.lessonId}`}
                      className="btn btn-xs btn-info"
                    >
                      <FaEye />
                    </Link>
                  )}

                  {!report.resolved && (
                    <>
                      <button
                        disabled={isProcessing}
                        onClick={() => resolveReport(report._id, 'dismiss')}
                        className="btn btn-xs btn-success"
                      >
                        <FaCheck />
                      </button>

                      <button
                        disabled={isProcessing}
                        onClick={() => deleteLesson(report.lessonId)}
                        className="btn btn-xs btn-error"
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
          <p className="text-center py-10 text-base-content/60">
            No reports found
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportedLessons;
