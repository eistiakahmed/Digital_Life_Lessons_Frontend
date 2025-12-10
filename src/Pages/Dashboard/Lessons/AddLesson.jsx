import React from 'react';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const categories = [
  'Personal Growth',
  'Career',
  'Relationships',
  'Mindset',
  'Mistakes Learned',
];

const emotions = ['Motivational', 'Sad', 'Realization', 'Gratitude'];

const privacyOptions = ['Public', 'Private'];

const AddLesson = () => {
  const { user } = useAuth();
  console.log(user);
  const axios = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const isPremiumUser = user?.isPremium;  //TODO : Update isPremium from database(MongoDB)

  const onSubmit = async (data) => {
    const finalLesson = {
      title: data.title,
      description: data.description,
      category: data.category,
      emotion: data.emotion,
      privacy: data.privacy,
      accessLevel: data.accessLevel,
      image: data.image || null,
      createdAt: new Date(),
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: user?.photoURL,
      views: 0,
      favorites: 0,
    };

    // console.log(finalLesson);

    try {
      const res = await axios.post('/lessons', finalLesson);

      if (res.data.insertedId) {
        toast.success('Lesson Created Successfully!');
        reset();
      } else {
        toast.error('Failed to create lesson');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Create New Lesson
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-semibold">Lesson Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter lesson title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Full Description</label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            className="textarea textarea-bordered w-full h-40"
            placeholder="Describe your lesson..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            {...register('category', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Emotion */}
        <div>
          <label className="font-semibold">Emotional Tone</label>
          <select
            {...register('emotion', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Emotion</option>
            {emotions.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* Privacy */}
        <div>
          <label className="font-semibold">Privacy</label>
          <select
            {...register('privacy', { required: true })}
            className="select select-bordered w-full"
          >
            {privacyOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Access Level */}
        {/* <div>
          <label className="font-semibold">Access Level</label>
          <select
            {...register('accessLevel')}
            disabled={!isPremiumUser}
            className="select select-bordered w-full disabled:bg-base-300 disabled:cursor-not-allowed"
            title={
              !isPremiumUser ? 'Upgrade to Premium to create paid lessons' : ''
            }
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div> */}

        {/* Image URL optional */}
        <div>
          <label className="font-semibold">Image (Optional)</label>
          <input
            {...register('image')}
            type="text"
            placeholder="Image URL (optional)"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full font-bold">
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
