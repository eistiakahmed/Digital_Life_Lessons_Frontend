import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaStar,
  FaQuoteLeft,
  FaUser,
  FaHeart,
  FaThumbsUp,
  FaComment,
  FaPaperPlane,
  FaCheckCircle,
  FaUsers,
  FaAward,
  FaChartLine,
  FaSmile,
  FaHandHeart,
  FaLightbulb
} from 'react-icons/fa';
import { FormInput, FormTextarea, LoadingButton } from '../../../Components/FormComponents';

const FeedbackSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Life Coach",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff&size=100",
      rating: 5,
      text: "Digital Life Lessons has transformed how I document and share my experiences. The community is incredibly supportive and the insights are life-changing.",
      date: "2 weeks ago",
      verified: true,
      category: "Personal Growth"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Entrepreneur",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=10B981&color=fff&size=100",
      rating: 5,
      text: "The premium lessons have given me perspectives I never considered. This platform is a goldmine for anyone serious about personal development.",
      date: "1 month ago",
      verified: true,
      category: "Career"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Student",
      avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=F59E0B&color=fff&size=100",
      rating: 5,
      text: "I love how easy it is to capture my thoughts and lessons learned. The community feedback has helped me grow so much as a person.",
      date: "3 weeks ago",
      verified: true,
      category: "Learning"
    },
    {
      id: 4,
      name: "David Park",
      role: "Therapist",
      avatar: "https://ui-avatars.com/api/?name=David+Park&background=EF4444&color=fff&size=100",
      rating: 5,
      text: "As a professional, I recommend this platform to my clients. The structured approach to reflection and growth is remarkable.",
      date: "1 week ago",
      verified: true,
      category: "Professional"
    }
  ];

  const stats = [
    { icon: FaUsers, value: "2,500+", label: "Happy Users", color: "text-blue-500" },
    { icon: FaStar, value: "4.9/5", label: "Average Rating", color: "text-yellow-500" },
    { icon: FaHeart, value: "98%", label: "Satisfaction Rate", color: "text-red-500" },
    { icon: FaAward, value: "1,000+", label: "Success Stories", color: "text-green-500" }
  ];

  const feedbackCategories = [
    { value: 'general', label: 'General Feedback', icon: FaComment },
    { value: 'feature', label: 'Feature Request', icon: FaLightbulb },
    { value: 'bug', label: 'Bug Report', icon: FaCheckCircle },
    { value: 'testimonial', label: 'Success Story', icon: FaHeart },
    { value: 'suggestion', label: 'Improvement Idea', icon: FaChartLine }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const feedbackData = {
        ...data,
        rating: selectedRating,
        timestamp: new Date().toISOString()
      };
      
      console.log('Feedback submitted:', feedbackData);
      toast.success('Thank you for your feedback! We appreciate your input.');
      reset();
      setSelectedRating(0);
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all`}
            whileHover={interactive ? { scale: 1.1 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            disabled={!interactive}
          >
            <FaStar
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <FaHeart className="w-6 h-6 text-primary" />
            </div>
            <h2