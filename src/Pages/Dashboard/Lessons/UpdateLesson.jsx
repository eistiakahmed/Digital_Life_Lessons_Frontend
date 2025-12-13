import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { invalidateLessonQueries } from '../../../utils/cacheUtils';
import {
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaEdit,
  FaImage,
  FaLock,
  FaGlobe,
} from 'react-icons/fa';

const categories = [
  'Personal Growth',
  'Career',
  'Relationships',
  'Mindset',
  'Mistakes Learned',
];

const emotions = ['Motivational', 'Sad', 'Realization', 'Gratitude'];
const privacyOptions = ['Public', 'Private'];
const accessLevels = ['Free', 'Premium'];

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Fetch current user to check premium status
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`/user/${user.email}`);
        setIsPremiumUser(res.data?.isPremium || false);
      } catch (err) {
        console.error('Failed to fetch user status:', err);
      }
    };
    fetchUserStatus();
  }, [user?.email, axios]);

  // Fetch lesson details
  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => {
      const res = await axios.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // Populate form when lesson data is loaded
  useEffect(() => {
    if (lesson) {
      // Check if user owns this lesson
      if (lesson.authorEmail !== user?.email) {
        toast.error('You can only edit your own lessons');
        navigate('/dashboard/my_lessons');
        return;
      }

      // Populate form fields
      setValue('title', lesson.title);
      setValue('description', lesson.description);
      setValue('category', lesson.category);
      setValue('emotion', lesson.emotion);
      setValue('privacy', lesson.privacy);
      setValue('accessLevel', lesson.accessLevel);
      setValue('image', lesson.image || '');
    }
  }, [lesson, setValue, user?.email, navigate]);

  // Update lesson mutation
  const updateLessonMutation = useMutation({
    mutationFn: async (data) => {
      if (data.accessLevel === 'Premium' && !isPremiumUser) {
        throw new Error('You need Premium access to create Premium lessons!');
      }

      const updatedLesson = {
        title: data.title,
        description: data.description,
        category: data.category,
        emotion: data.emotion,
        privacy: data.privacy,
        accessLevel: data.accessLevel || 'Free',
        image: data.image || null,
        updatedAt: new Date(),
      };

      return axios.put(`/lessons/${id}`, updatedLesson);
    },
    onSuccess: () => {
      toast.success('Lesson updated successfully!');
      // Invalidate lesson-related queries to update UI everywhere
      invalidateLessonQueries(queryClient);
      queryClient.invalidateQueries(['lesson', id]);
      navigate('/dashboard/my_lessons');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update lesson');
    },
  });

  const onSubmit = (data) => {
    updateLessonMutation.mutate(data);
  };

  const handleCancel = () => {
    navigate('/dashboard/my_lessons');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              Edit Lesson
            </h1>
            <p className="text-base-content/60">
              Update your lesson content and settings
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaEdit className="w-5 h-5 text-primary" />
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-base-100 shadow-lg p-8 rounded-3xl border border-base-300"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Lesson Title *
              </span>
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter lesson title"
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Full Description *
              </span>
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 50,
                  message: 'Description must be at least 50 characters',
                },
              })}
              className="textarea textarea-bordered w-full h-40"
              placeholder="Share your lesson, insight, or wisdom..."
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category and Emotion Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Category *
                </span>
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-error text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Emotional Tone *
                </span>
              </label>
              <select
                {...register('emotion', { required: 'Emotion is required' })}
                className="select select-bordered w-full"
              >
                <option value="">Select Emotion</option>
                {emotions.map((emotion) => (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                ))}
              </select>
              {errors.emotion && (
                <p className="text-error text-sm mt-1">
                  {errors.emotion.message}
                </p>
              )}
            </div>
          </div>

          {/* Privacy and Access Level Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Privacy */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Privacy Setting *
                </span>
              </label>
              <select
                {...register('privacy', { required: 'Privacy is required' })}
                className="select select-bordered w-full"
              >
                {privacyOptions.map((privacy) => (
                  <option key={privacy} value={privacy}>
                    <div className="flex items-center gap-2">
                      {privacy === 'Public' ? (
                        <FaGlobe className="w-4 h-4" />
                      ) : (
                        <FaLock className="w-4 h-4" />
                      )}
                      {privacy}
                    </div>
                  </option>
                ))}
              </select>
              {errors.privacy && (
                <p className="text-error text-sm mt-1">
                  {errors.privacy.message}
                </p>
              )}
            </div>

            {/* Access Level */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Access Level
                </span>
              </label>
              <select
                {...register('accessLevel')}
                disabled={!isPremiumUser}
                className="select select-bordered w-full disabled:bg-base-300 disabled:cursor-not-allowed"
                title={
                  !isPremiumUser
                    ? 'Upgrade to Premium to create Premium lessons'
                    : ''
                }
              >
                {accessLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {!isPremiumUser && (
                <p className="text-warning text-sm mt-1">
                  Premium membership required to create Premium lessons
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-base-content flex items-center gap-2">
                <FaImage className="w-4 h-4" />
                Featured Image (Optional)
              </span>
            </label>
            <input
              {...register('image')}
              type="url"
              className="input input-bordered w-full"
              placeholder="https://your-image-url.com/image.jpg"
            />
            <div className="label">
              <span className="label-text-alt text-base-content/60">
                Add an image URL to make your lesson more engaging
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={updateLessonMutation.isPending}
              className="btn btn-primary flex-1 sm:flex-none"
            >
              <FaSave className="w-4 h-4 mr-2" />
              {updateLessonMutation.isPending ? 'Updating...' : 'Update Lesson'}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-outline flex-1 sm:flex-none"
            >
              <FaTimes className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-base-100 shadow-lg p-8 rounded-3xl border border-base-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-base-content">
          Current Lesson Preview
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-base-content mb-2">
              {lesson.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-primary">{lesson.category}</span>
              <span className="badge badge-secondary">{lesson.emotion}</span>
              <span className={`badge ${lesson.privacy === 'Public' ? 'badge-success' : 'badge-warning'}`}>
                {lesson.privacy}
              </span>
              <span className={`badge ${lesson.accessLevel === 'Free' ? 'badge-info' : 'badge-error'}`}>
                {lesson.accessLevel}
              </span>
            </div>
          </div>
          
          {lesson.image && (
            <div className="w-full h-48 rounded-xl overflow-hidden">
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="text-base-content/80 leading-relaxed">
              {lesson.description.substring(0, 300)}
              {lesson.description.length > 300 && '...'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-base-content/60">
            <span>Created: {new Date(lesson.createdAt).toLocaleDateString()}</span>
            {lesson.updatedAt && (
              <span>Updated: {new Date(lesson.updatedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateLesson;