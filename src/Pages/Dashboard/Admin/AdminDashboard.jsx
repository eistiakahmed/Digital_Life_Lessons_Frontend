import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaChartLine,
  FaFire,
} from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';

const AdminDashboard = () => {
  const axios = useAxios();

  const { data: users = [] } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => (await axios.get('/users')).data,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ['admin-lessons'],
    queryFn: async () => (await axios.get('/admin/lessons')).data,
  });

  const { data: reports = [] } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: async () => (await axios.get('/admin/reported-lessons')).data,
  });

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: <FaUsers />,
      gradient: 'from-indigo-500 to-indigo-700',
    },
    {
      title: 'Public Lessons',
      value: lessons.filter((l) => l.privacy === 'Public').length,
      icon: <FaBookOpen />,
      gradient: 'from-emerald-500 to-emerald-700',
    },
    {
      title: 'Reported Lessons',
      value: reports.length,
      icon: <FaFlag />,
      gradient: 'from-rose-500 to-rose-700',
    },
    {
      title: "Today's Lessons",
      value: lessons.filter(
        (l) =>
          new Date(l.createdAt).toDateString() === new Date().toDateString()
      ).length,
      icon: <FaFire />,
      gradient: 'from-amber-500 to-amber-700',
    },
  ];

  const weeklyGrowth = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const next = new Date(date);
    next.setDate(next.getDate() + 1);

    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      users: users.filter(
        (u) => new Date(u.createdAt) >= date && new Date(u.createdAt) < next
      ).length,
      lessons: lessons.filter(
        (l) => new Date(l.createdAt) >= date && new Date(l.createdAt) < next
      ).length,
    };
  });

  const contributors = Object.values(
    lessons.reduce((acc, lesson) => {
      acc[lesson.authorEmail] ||= {
        name: lesson.authorName,
        lessons: 0,
      };
      acc[lesson.authorEmail].lessons++;
      return acc;
    }, {})
  )
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, 5);

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-linear-to-r from-primary to-secondary p-8 text-primary-content shadow-lg"
      >
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="opacity-80">System overview & analytics</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl bg-linear-to-r ${s.gradient} p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{s.title}</p>
                <p className="text-3xl font-bold">{s.value}</p>
              </div>
              <div className="text-4xl opacity-80">{s.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-base-100 p-6 shadow">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <FaChartLine /> Weekly Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="users" stroke="#22c55e" strokeWidth={3} />
              <Line dataKey="lessons" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border bg-base-100 p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Top Contributors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contributors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lessons" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
