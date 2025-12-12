import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaHeart,
  FaBookmark,
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaCrown,
  FaFlag,
  FaShare,
  FaClock,
  FaArrowLeft,
  FaComment,
} from 'react-icons/fa';

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  
  const [comment, setComment] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  // Fetch lesson details
  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => {
      const res = await axios.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const res = await axios.get(`/lessons/${id}/comments`);
      return res.data;
    },
  });

  // Fetch similar lessons
  const { data: similarLessons = [] } = useQuery({
    queryKey: ['similarLessons', lesson?.category, lesson?.emotion],
    queryFn: async () => {
      if (!lesson) return [];
      const res = await axios.get(`/lessons/similar?category=${lesson.category}&emotion=${lesson.emotion}&exclude=${id}`);
      return res.data.slice(0, 6);
    },
    enabled: !!lesson,
  });

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in to like');
        navigate('/login');
        return;
      }
      return axios.post(`/lessons/${id}/like`, { userId: user.uid });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lesson', id]);
      toast.success('Liked!');
    },
  });

  // Favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in to save');
        navigate('/login');
        return;
      }
      return axios.post(`/lessons/${id}/favorite`, { 
        userId: user.uid,
        userEmail: user.email 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lesson', id]);
      toast.success('Saved to favorites!');
    },
  });

  // Comment mutation
  const commentMutation = useMutation({
    mutationFn: async (commentText) => {
      if (!user) {
        toast.error('Please log in to comment');
        navigate('/login');
        return;
      }
      return axios.post(`/lessons/${id}/comments`, {
        text: commentText,
        authorName: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoURL,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
      setComment('');
      toast.success('Comment added!');
    },
  });

  // Report mutation
  const reportMutation = useMutation({
    mutationFn: async (reason) => {
      if (!user) {
        toast.error('Please log in to report');
        navigate('/login');
        return;
      }
      return axios.post('/lessons/report', {
        lessonId: id,
        reporterUserId: user.uid,
        reportedUserEmail: lesson.authorEmail,
        reason,
      });
    },
    onSuccess: () => {
      setShowReportModal(false);
      setReportReason('');
      toast.success('Report submitted');
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    commentMutation.mutate(comment);
  };

  const handleReport = () => {
    if (!reportReason) {
      toast.error('Please select a reason');
      return;
    }
    reportMutation.mutate(reportReason);
  };

  const estimateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
        <Link to="/public_lessons" className="btn btn-primary">
          Browse Lessons
        </Link>
      </div>
    );
  }

  // Check if user can view premium content
  const isPremiumLesson = lesson.accessLevel === 'Premium';
  const canViewPremium = currentUser?.isPremium || lesson.authorEmail === user?.email;
  
  if (isPremiumLesson && !canViewPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 p-12 rounded-3xl shadow-2xl text-center max-w-md"
        >
          <FaCrown className="w-20 h-20 mx-auto mb-6 text-yellow-500" />
          <h1 className="text-3xl font-bold mb-4">Premium Content</h1>
          <p className="text-base-content/70 mb-6">
            This lesson is exclusive to Premium members. Upgrade to access this and all premium content.
          </p>
          <Link to="/pricing" className="btn btn-warning btn-lg">
            <FaCrown className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back
        </motion.button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-3xl shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          {lesson.image && (
            <div className="h-64 md:h-80 overflow-hidden">
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-primary">{lesson.category}</span>
                <span className="badge badge-secondary">{lesson.emotion}</span>
                {isPremiumLesson && (
                  <span className="badge badge-warning gap-1">
                    <FaCrown className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-base-content mb-4">
                {lesson.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-base-content/60 mb-6">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  {estimateReadingTime(lesson.description)} min read
                </span>
                <span className="flex items-center gap-2">
                  <FaEye className="w-4 h-4" />
                  {Math.floor(Math.random() * 10000)} views
                </span>
              </div>
            </div>

            {/* Author Section */}
            <div className="bg-base-200 p-6 rounded-2xl mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={lesson.authorImage || '/default-avatar.png'}
                  alt={lesson.authorName}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-base-content">
                    {lesson.authorName}
                  </h3>
                  <p className="text-base-content/60">
                    Sharing wisdom and life experiences
                  </p>
                </div>
                <Link
                  to={`/profile/${lesson.authorEmail}`}
                  className="btn btn-outline btn-sm"
                >
                  <FaUser className="w-4 h-4 mr-2" />
                  View Profile
                </Link>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-base-content leading-relaxed whitespace-pre-wrap">
                {lesson.description}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between mb-8 p-6 bg-base-200 rounded-2xl">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 text-base-content/60">
                  <FaHeart className="w-5 h-5 text-red-500" />
                  {lesson.likesCount || 0} Likes
                </span>
                <span className="flex items-center gap-2 text-base-content/60">
                  <FaBookmark className="w-5 h-5 text-blue-500" />
                  {lesson.favoritesCount || 0} Saved
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => likeMutation.mutate()}
                disabled={likeMutation.isPending}
                className="btn btn-outline btn-error"
              >
                <FaHeart className="w-4 h-4 mr-2" />
                Like
              </button>
              
              <button
                onClick={() => favoriteMutation.mutate()}
                disabled={favoriteMutation.isPending}
                className="btn btn-outline btn-info"
              >
                <FaBookmark className="w-4 h-4 mr-2" />
                Save to Favorites
              </button>
              
              <button
                onClick={() => setShowReportModal(true)}
                className="btn btn-outline btn-warning"
              >
                <FaFlag className="w-4 h-4 mr-2" />
                Report
              </button>
              
              <button className="btn btn-outline btn-success">
                <FaShare className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>

            {/* Comments Section */}
            <div className="border-t border-base-300 pt-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaComment className="w-6 h-6 text-primary" />
                Comments ({comments.length})
              </h3>

              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={handleComment} className="mb-8">
                  <div className="flex gap-4">
                    <img
                      src={user.photoURL || '/default-avatar.png'}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="textarea textarea-bordered w-full"
                        rows="3"
                      />
                      <button
                        type="submit"
                        disabled={!comment.trim() || commentMutation.isPending}
                        className="btn btn-primary btn-sm mt-2"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 bg-base-200 rounded-2xl mb-8">
                  <p className="text-base-content/60 mb-4">
                    Please log in to leave a comment
                  </p>
                  <Link to="/login" className="btn btn-primary">
                    Log In
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex gap-4">
                    <img
                      src={comment.authorImage || '/default-avatar.png'}
                      alt={comment.authorName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="bg-base-200 p-4 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-base-content">
                            {comment.authorName}
                          </span>
                          <span className="text-xs text-base-content/60">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-base-content">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Similar Lessons */}
        {similarLessons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Similar Lessons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarLessons.map((similarLesson) => (
                <Link
                  key={similarLesson._id}
                  to={`/lesson/${similarLesson._id}`}
                  className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <h3 className="font-bold text-base-content mb-2 line-clamp-2">
                    {similarLesson.title}
                  </h3>
                  <p className="text-base-content/60 text-sm line-clamp-3 mb-4">
                    {similarLesson.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-primary badge-sm">
                      {similarLesson.category}
                    </span>
                    <span className="badge badge-secondary badge-sm">
                      {similarLesson.emotion}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Report Modal */}
        {showReportModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Report Lesson</h3>
              <div className="space-y-3">
                {[
                  'Inappropriate Content',
                  'Hate Speech or Harassment',
                  'Misleading or False Information',
                  'Spam or Promotional Content',
                  'Sensitive or Disturbing Content',
                  'Other',
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="radio radio-primary"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
              <div className="modal-action">
                <button
                  onClick={handleReport}
                  disabled={!reportReason || reportMutation.isPending}
                  className="btn btn-error"
                >
                  Submit Report
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;