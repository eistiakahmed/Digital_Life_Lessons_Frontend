import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaGift, 
  FaStar,
  FaCheckCircle,
  FaBell,
  FaUsers,
  FaBookOpen,
  FaHeart
} from 'react-icons/fa';

const Newsletter = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const benefits = [
    {
      icon: <FaBookOpen className="w-5 h-5" />,
      text: "Weekly curated life lessons"
    },
    {
      icon: <FaStar className="w-5 h-5" />,
      text: "Exclusive premium content"
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      text: "Community highlights & stories"
    },
    {
      icon: <FaGift className="w-5 h-5" />,
      text: "Early access to new features"
    }
  ];

  const onSubmit = async (data) => {
    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubscribed(true);
      toast.success('Welcome to our community! Check your email for confirmation.');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" id="newsletter">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 rounded-3xl p-12 shadow-2xl border border-success/20"
          >
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Welcome to the Community! 🎉
            </h2>
            <p className="text-lg text-base-content/70 mb-6">
              Thank you for subscribing! You'll receive your first newsletter within the next few days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubscribed(false)}
                className="btn btn-outline"
              >
                Subscribe Another Email
              </button>
              <button className="btn btn-primary">
                <FaBookOpen className="w-4 h-4 mr-2" />
                Start Reading Lessons
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" id="newsletter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaBell className="w-4 h-4" />
              Stay Connected
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
              Never Miss a
              <span className="text-primary"> Life-Changing</span> Lesson
            </h2>
            
            <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
              Join over 10,000 wisdom seekers who receive our weekly newsletter packed with 
              inspiring stories, practical insights, and exclusive content to accelerate your growth.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <span className="text-base-content font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 text-sm text-base-content/60">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary border-2 border-base-100"
                  />
                ))}
              </div>
              <span>Join 10,000+ subscribers</span>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-base-100 rounded-3xl p-8 lg:p-10 shadow-2xl border border-base-300/50">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-2">
                  Get Your Weekly Dose of Wisdom
                </h3>
                <p className="text-base-content/70">
                  Free insights delivered to your inbox every Tuesday
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className={`
                      input input-bordered w-full transition-all duration-200
                      ${errors.firstName ? 'border-error' : 'focus:border-primary'}
                    `}
                    {...register('firstName', { 
                      required: 'First name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`
                      input input-bordered w-full transition-all duration-200
                      ${errors.email ? 'border-error' : 'focus:border-primary'}
                    `}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    What interests you most?
                  </label>
                  <select
                    className="select select-bordered w-full focus:border-primary"
                    {...register('interest')}
                  >
                    <option value="">Select your main interest</option>
                    <option value="personal-growth">Personal Growth</option>
                    <option value="career">Career Development</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset & Mental Health</option>
                    <option value="all">All Categories</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubscribing}
                  whileHover={{ scale: isSubscribing ? 1 : 1.02 }}
                  whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                  className={`
                    btn btn-primary w-full btn-lg gap-2
                    ${isSubscribing ? 'loading' : ''}
                  `}
                >
                  {isSubscribing ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      Subscribe for Free
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-base-content/60 text-center">
                  By subscribing, you agree to receive our weekly newsletter. 
                  You can unsubscribe at any time. No spam, ever.
                </p>
              </form>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-base-300">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <FaHeart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <div className="text-xs text-base-content/60">No Spam</div>
                  </div>
                  <div>
                    <FaCheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <div className="text-xs text-base-content/60">Easy Unsubscribe</div>
                  </div>
                  <div>
                    <FaStar className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <div className="text-xs text-base-content/60">Premium Content</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;