import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaFlag,
  FaEye,
  FaClock,
  FaCalendarAlt,
  FaUserCircle,
  FaTimes,
  FaCrown,
  FaRegSmile,
  FaBookOpen,
} from 'react-icons/fa';
import { MdMood, MdOutlineUpdate } from 'react-icons/md';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { TbWorld } from 'react-icons/tb';

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [comment, setComment] = useState('');

  const randomViews = Math.floor(Math.random() * 10000);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => (await axios.get(`/lessons/${id}`)).data,
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => (await axios.get(`/user/${user.email}`)).data,
    enabled: !!user?.email,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => (await axios.get(`/lessons/${id}/comments`)).data,
  });

  const { data: similarLessons = [], isLoading: similarLoading } = useQuery({
    queryKey: ['similar-lessons', lesson?.category, lesson?.emotion, id],
    queryFn: async () => {
      if (!lesson?.category || !lesson?.emotion) return [];

      const res = await axios.get(
        `/lessons/similar?category=${lesson.category}&emotion=${lesson.emotion}&exclude=${id}`
      );

      return res.data;
    },
    enabled: !!lesson && !!lesson.category && !!lesson.emotion,
    retry: 1,
  });

  const { data: userFavorites = [] } = useQuery({
    queryKey: ['favorites', user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axios.get(`/favorites/user/${user.email}`)).data,
  });

  // Fetch author's total lessons count
  const { data: authorLessons = [] } = useQuery({
    queryKey: ['authorLessons', lesson?.authorEmail],
    queryFn: async () => {
      const res = await axios.get(`/lessons/user/${lesson.authorEmail}`);
      return res.data;
    },
    enabled: !!lesson?.authorEmail,
  });

  useEffect(() => {
    if (lesson && user) {
      setLiked(Array.isArray(lesson.likes) && lesson.likes.includes(user.uid));
    }
  }, [lesson, user]);

  useEffect(() => {
    if (userFavorites.length && lesson) {
      const isSaved = userFavorites.some((fav) => fav.lessonId === lesson._id);
      setSaved(isSaved);
    }
  }, [userFavorites, lesson]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in to like');
        navigate('/login');
        return;
      }
      return axios.post(`/lessons/${id}/like`, { userId: user.uid });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lesson', id]);
      setLiked(!liked);
      if (data?.data?.isLiked) {
        toast.success('Lesson liked!');
      } else {
        toast.success('Like removed');
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in to save');
        navigate('/login');
        return;
      }
      return axios.post(`/lessons/${id}/favorite`, {
        userId: user.uid,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites', user.email]);
      queryClient.invalidateQueries(['lesson', id]);
      setSaved(true);
      toast.success('Lesson saved to favorites');
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in');
        return;
      }
      return axios.delete(`/favorites/${id}`, {
        data: { userEmail: user.email },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites', user.email]);
      queryClient.invalidateQueries(['lesson', id]);
      setSaved(false);
      toast.success('Lesson removed from favorites');
    },
  });

  const reportMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in to report');
        navigate('/login');
        return;
      }
      if (!reportReason) {
        toast.error('Please select a reason');
        return;
      }
      return axios.post('/lessons/report', {
        lessonId: lesson._id,
        reporterUserId: user?.uid,
        reporterEmail: user?.email,
        reason: reportReason,
      });
    },
    onSuccess: () => {
      setShowReport(false);
      setReportReason('');
      toast.success('Report submitted successfully');
    },
    onError: (error) => {
      toast.error('Failed to submit report');
      console.error('Report error:', error);
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please log in to comment');
        navigate('/login');
        return;
      }
      if (!comment.trim()) {
        toast.error('Please write a comment');
        return;
      }
      return axios.post(`/lessons/${id}/comments`, {
        text: comment.trim(),
        authorName: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoURL,
      });
    },
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries(['comments', id]);
      toast.success('Comment posted successfully');
    },
    onError: (error) => {
      toast.error('Failed to post comment');
      console.error('Comment error:', error);
    },
  });

  const readingTime = (text = '') => Math.ceil(text.split(' ').length / 200);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!lesson) return null;

  const isPremium = lesson.accessLevel === 'Premium';
  const canView = currentUser?.isPremium || lesson.authorEmail === user?.email;

  return (
    <div className="min-h-screen bg-base-200/40">
      <div className="mx-auto px-4 py-10">
        {isPremium && !canView ? (
          <div className="bg-base-100 p-10 rounded-xl text-center border">
            <FaCrown className="w-14 h-14 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Premium Lesson</h2>
            <p className="text-base-content/60 mb-6">
              Upgrade to Premium to unlock full content.
            </p>
            <Link to="/pricing" className="btn btn-warning">
              Upgrade Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex gap-15">
              <div className="flex-1">
                <div className="mb-8">
                  {lesson.image ? (
                    <img
                      src={lesson.image}
                      alt=""
                      className="rounded-xl w-full"
                    />
                  ) : (
                    <div className="h-[450px] rounded-xl bg-linear-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 flex items-center justify-center">
                      <FaBookOpen className="w-16 h-16 text-base-content/30" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap justify-evenly items-center gap-4 text-sm bg-white mb-6 py-5 rounded-xl">
                  <span className="flex flex-col justify-center items-center gap-1">
                    <FaCalendarAlt size={25} className="text-blue-500" />
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </span>

                  <span className="flex flex-col justify-center items-center gap-1">
                    <MdOutlineUpdate size={28} className="text-green-500" />
                    {lesson?.updatedAt
                      ? new Date(lesson.updatedAt).toLocaleDateString()
                      : 'Not updated'}
                  </span>

                  <span className="flex flex-col justify-center items-center gap-1">
                    <TbWorld size={25} className="text-purple-500" />
                    {lesson.privacy}
                  </span>

                  <span className="flex flex-col justify-center items-center gap-1">
                    <FaClock size={25} className="text-orange-500" />
                    {readingTime(lesson.description)} min read
                  </span>
                </div>

                {/* Interaction Buttons */}
                <div className="flex flex-wrap justify-evenly gap-4 mb-10 bg-white py-6 rounded-xl shadow-sm">
                  {/* LIKE */}
                  <button
                    onClick={() => likeMutation.mutate()}
                    disabled={likeMutation.isPending}
                    className={`btn btn-sm flex items-center gap-2 transition-all duration-300 ${
                      liked ? 'btn-error text-white' : 'btn-ghost text-gray-600'
                    } hover:scale-105 ${
                      likeMutation.isPending ? 'loading' : ''
                    }`}
                  >
                    {likeMutation.isPending ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        {liked ? (
                          <FaHeart className="text-lg animate-pulse" />
                        ) : (
                          <FaRegHeart className="text-lg" />
                        )}
                        <span>{lesson.likesCount || 0}</span>
                      </>
                    )}
                  </button>

                  {/* SAVE */}
                  <button
                    onClick={() =>
                      saved
                        ? removeFavoriteMutation.mutate()
                        : saveMutation.mutate()
                    }
                    disabled={
                      saveMutation.isPending || removeFavoriteMutation.isPending
                    }
                    className={`btn btn-sm flex items-center gap-2 transition-all duration-300 ${
                      saved ? 'btn-info text-white' : 'btn-ghost text-gray-600'
                    } hover:scale-105 ${
                      saveMutation.isPending || removeFavoriteMutation.isPending
                        ? 'loading'
                        : ''
                    }`}
                  >
                    {saveMutation.isPending ||
                    removeFavoriteMutation.isPending ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        {saved ? (
                          <FaBookmark className="text-lg" />
                        ) : (
                          <FaRegBookmark className="text-lg" />
                        )}
                        <span>Save</span>
                      </>
                    )}
                  </button>

                  {/* SHARE */}
                  <button
                    onClick={() => setShowShare(true)}
                    className=" btn btn-sm btn-ghost flex items-center gap-2 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    <FaShare className="text-lg" />
                    Share
                  </button>

                  {/* REPORT */}
                  <button
                    onClick={() => setShowReport(true)}
                    className="btn btn-sm btn-ghost flex items-center gap-2 text-warning hover:bg-warning/10 transition-all duration-300 hover:scale-105"
                  >
                    <FaFlag className="text-lg" />
                    Report
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                  {lesson.title}
                </h1>
                <article className="prose prose-lg max-w-none mb-10">
                  {lesson.description}
                </article>

                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full text-white text-sm font-medium">
                    <HiOutlineViewGrid className="w-4 h-4" />
                    {lesson.category}
                  </span>

                  <span className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full text-white text-sm font-medium">
                    <MdMood className="w-4 h-4" />
                    {lesson.emotion}
                  </span>
                </div>

                <div className="bg-base-100 border border-gray-200 rounded-xl p-6 mb-12 my-5">
                  <div className="flex items-center gap-4">
                    <div className="">
                      <Link
                        to={`/profile/${lesson.authorEmail}`}
                        className="shrink-0"
                      >
                        <img
                          src={
                            lesson.authorImage ||
                            'https://ui-avatars.com/api/?name=' +
                              encodeURIComponent(lesson.authorName || 'User') +
                              '&background=6366f1&color=fff'
                          }
                          alt={lesson.authorName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 hover:border-primary/40 transition-colors"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 flex justify-between items-center">
                      <div className="">
                        <Link
                          to={`/profile/${lesson.authorEmail}`}
                          className="text-lg font-semibold text-base-content hover:text-primary transition-colors block"
                        >
                          {lesson.authorName}
                        </Link>
                        <p className="text-sm text-base-content/60">
                          {lesson.authorEmail}
                        </p>
                        <Link
                          to={`/profile/${lesson.authorEmail}`}
                          className="text-primary text-sm font-semibold hover:border-b"
                        >
                          View all lessons
                        </Link>
                      </div>

                      <div className=" text-sm">
                        <div className="flex items-center gap-2 text-base-content/70">
                          <FaBookOpen className="w-4 h-4 text-green-500" />
                          <span>
                            {authorLessons.length} Total Lessons Created
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    💬 Comments
                  </h3>

                  {/* COMMENT INPUT */}
                  {user && (
                    <div className="mb-6 bg-white p-4 rounded-xl shadow-md">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="
          textarea textarea-bordered w-full
          focus:outline-none focus:border-primary
          min-h-[90px]
        "
                        placeholder="Write your thoughts..."
                      />

                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => commentMutation.mutate()}
                          disabled={
                            commentMutation.isPending || !comment.trim()
                          }
                          className="
            btn btn-primary btn-sm
            flex items-center gap-2
            disabled:opacity-50
          "
                        >
                          {commentMutation.isPending ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              Posting...
                            </>
                          ) : (
                            'Post Comment'
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* COMMENTS LIST */}
                  <div className="space-y-2">
                    {comments.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center">
                        No comments yet. Be the first one!!
                      </p>
                    ) : (
                      comments.map((c) => (
                        <div
                          key={c._id}
                          className="bg-white p-4 rounded-xl transition shadow-md"
                        >
                          <div className="flex items-center gap-3 mb-1">
                            {/* Avatar */}
                            <div className="avatar">
                              <div className="  w-[50px]">
                                <img
                                  src={c.authorImage}
                                  alt=""
                                  className="border-2 rounded-full border-gray-200"
                                />
                              </div>
                            </div>

                            <p className="font-medium text-sm">
                              {c.authorName}
                            </p>
                          </div>

                          <p className="text-sm text-base-content/70  pl-12">
                            {c.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Lessons Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">
                Recommended Lessons
              </h3>

              {similarLoading && (
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Loading recommendations...</span>
                </div>
              )}

              {!similarLoading &&
                similarLessons.length === 0 &&
                lesson?.category &&
                lesson?.emotion && (
                  <div className="text-center py-8 bg-base-200 rounded-lg">
                    <p className="text-base-content/60">
                      No similar lessons found for{' '}
                      <strong>{lesson.category}</strong> category or{' '}
                      <strong>{lesson.emotion}</strong> emotion.
                    </p>
                    <Link
                      to="/public_lessons"
                      className="btn btn-primary btn-sm mt-3"
                    >
                      Browse All Lessons
                    </Link>
                  </div>
                )}

              {!similarLoading && (!lesson?.category || !lesson?.emotion) && (
                <div className="text-center py-8 bg-base-200 rounded-lg">
                  <p className="text-base-content/60">
                    Cannot load recommendations - lesson category or emotion
                    missing.
                  </p>
                </div>
              )}

              {similarLessons.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarLessons.map((l) => (
                    <Link
                      key={l._id}
                      to={`/lesson/${l._id}`}
                      className="bg-base-100 p-6 rounded-xl border border-base-300 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="mb-4">
                        <h4 className="font-semibold text-base-content group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {l.title}
                        </h4>
                        <p className="text-sm text-base-content/60 line-clamp-3">
                          {l.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-base-content/50">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <FaEye className="w-3 h-3" />
                            {l.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaHeart className="w-3 h-3" />
                            {l.likesCount || 0}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="badge badge-primary badge-xs">
                            {l.category}
                          </span>
                          <span className="badge badge-secondary badge-xs">
                            {l.emotion}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <AnimatePresence>
          {showShare && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center"
              onClick={() => setShowShare(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-xl w-80"
              >
                <div className="flex justify-between mb-4">
                  <h4 className="font-semibold">Share</h4>
                  <button onClick={() => setShowShare(false)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon round size={32} />
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon round size={32} />
                  </TwitterShareButton>
                  <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon round size={32} />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon round size={32} />
                  </WhatsappShareButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReport && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center"
              onClick={() => setShowReport(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-xl w-96"
              >
                <h4 className="font-semibold mb-4">Report Lesson</h4>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="select select-bordered w-full mb-4"
                >
                  <option value="">Select reason</option>
                  <option>Inappropriate Content</option>
                  <option>Hate Speech or Harassment</option>
                  <option>Misleading or False Information</option>
                  <option>Spam or Promotional Content</option>
                  <option>Sensitive or Disturbing Content</option>
                  <option>Other</option>
                </select>
                <button
                  onClick={() => reportMutation.mutate()}
                  disabled={reportMutation.isPending || !reportReason}
                  className="btn btn-error w-full"
                >
                  {reportMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonDetails;
