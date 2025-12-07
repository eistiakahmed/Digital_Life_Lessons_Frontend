import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'motion/react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaStar,
  FaGraduationCap,
  FaChartLine,
} from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Slide1 from '../../../assets/slide1.png';
import Slide2 from '../../../assets/slide2.png';
import Slide3 from '../../../assets/slide3.png';

const Banner = () => {
  const slides = [
    {
      badge: 'LIFE LESSONS',
      title: 'Capture Your Wisdom',
      subtitle: 'Preserve and Share What You Learn',
      description:
        'Save meaningful life lessons, reflect on personal growth, and share insights with the community to inspire others.',
      image: Slide1,
      buttonText: 'Add Your Lesson',
      features: [
        { icon: FaClock, text: 'Track Your Progress' },
        { icon: FaCheckCircle, text: 'Organize Lessons' },
        { icon: FaGraduationCap, text: 'Learn from Others' },
      ],
      stats: { value: '100+', label: 'Lessons Shared' },
      gradient: 'from-purple-500/20 via-pink-500/20 to-red-500/20',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      accentColor: 'text-purple-600',
    },
    {
      badge: 'PREMIUM INSIGHTS',
      title: 'Unlock Exclusive',
      subtitle: 'Grow with Curated Lessons',
      description:
        'Access premium life lessons from experts and mentors, and deepen your understanding of personal growth and mindset.',
      image: Slide2,
      buttonText: 'Explore Premium',
      features: [
        { icon: FaChartLine, text: 'Exclusive Lessons' },
        { icon: FaCheckCircle, text: 'Curated Insights' },
        { icon: FaStar, text: 'Expert Advice' },
      ],
      stats: { value: '50+', label: 'Premium Lessons' },
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      accentColor: 'text-blue-600',
    },
    {
      badge: 'COMMUNITY LEARNING',
      title: 'Share & Connect',
      subtitle: 'Join Our Growth Circle',
      description:
        'Engage with a community of learners, share lessons, provide feedback, and celebrate progress together.',
      image: Slide3,
      buttonText: 'Join Community',
      features: [
        { icon: FaUsers, text: 'Active Community' },
        { icon: FaCheckCircle, text: 'Collaborative Learning' },
        { icon: FaStar, text: 'Mentor Guidance' },
      ],
      stats: { value: '95%', label: 'User Satisfaction' },
      gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      accentColor: 'text-green-600',
    },
  ];

  return (
    <div className="banner-container w-full rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative py-8 sm:py-12 md:py-16 lg:py-20 min-h-[600px] sm:min-h-[650px] md:min-h-[700px] lg:min-h-0 bg-linear-to-br ${slide.gradient} transition-all duration-500`}
            >
              {/* Animated Background Shapes */}
              <div className="absolute inset-0 overflow-hidden opacity-20 md:opacity-30">
                <motion.div
                  className="absolute top-5 left-5 sm:top-10 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              </div>

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
                  {/* Text Content */}
                  <motion.div
                    className="space-y-4 sm:space-y-5 lg:space-y-6 order-2 lg:order-1"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {/* Badge */}
                    <motion.span
                      className={`inline-flex items-center gap-2 ${slide.badgeColor} text-white px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 rounded-full text-xs sm:text-sm font-bold shadow-lg`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {slide.badge}
                    </motion.span>

                    {/* Title Section */}
                    <motion.div
                      className="space-y-2 sm:space-y-3"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-linear-to-r from-base-content to-base-content/70 bg-clip-text text-transparent leading-tight">
                        {slide.title}
                      </h1>
                      <p
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${slide.accentColor} dark:text-primary`}
                      >
                        {slide.subtitle}
                      </p>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      className="text-sm sm:text-base lg:text-lg text-base-content/80 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {slide.description}
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3 lg:py-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {slide.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 bg-base-100/50 backdrop-blur-sm px-2 py-2 sm:px-3 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-base-content">
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      className="flex items-center gap-4 sm:gap-6 py-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div
                        className={`bg-linear-to-br ${slide.gradient} backdrop-blur-md border border-base-content/10 shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6`}
                      >
                        <motion.div
                          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${slide.accentColor} dark:text-primary`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            delay: 0.6,
                          }}
                        >
                          {slide.stats.value}
                        </motion.div>
                        <div className="text-xs sm:text-sm font-medium text-base-content/70 mt-1">
                          {slide.stats.label}
                        </div>
                      </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                      className="flex flex-wrap gap-3 sm:gap-4 pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <motion.button
                        className={`btn btn-sm sm:btn-md lg:btn-lg gap-2 ${slide.badgeColor} text-white border-none`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {slide.buttonText}
                        <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>
                      <motion.button
                        className="btn btn-sm sm:btn-md lg:btn-lg btn-outline gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Image Section */}
                  <motion.div
                    className="order-1 lg:order-2 flex justify-center items-center"
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <motion.div
                      className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 ${slide.badgeColor} p-0.5 sm:p-1 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-full`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto object-cover rounded-lg sm:rounded-xl"
                      />
                      {/* Trending Badge */}
                      <motion.div
                        className={`absolute top-2 right-2 sm:top-4 sm:right-4 ${slide.badgeColor} text-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 rounded-full font-bold shadow-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2`}
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <FaStar className="text-yellow-300 w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Trending</span>
                        <span className="sm:hidden">Hot</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
