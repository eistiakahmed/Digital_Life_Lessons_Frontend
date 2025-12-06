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
              className={`relative h-[70vh] bg-linear-to-br ${slide.gradient} transition-all duration-500`}
            >
        
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <motion.div
                  className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              </div>

              <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                  
                  <motion.div
                    className="space-y-6 order-2 lg:order-1"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <motion.span
                      className={`inline-flex items-center gap-2 ${slide.badgeColor} text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <FaStar className="w-4 h-4" />
                      {slide.badge}
                    </motion.span>

                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h1
                        className={`text-3xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-base-content to-base-content/70 bg-clip-text text-transparent leading-tight`}
                      >
                        {slide.title}
                      </h1>
                      <p
                        className={`text-xl md:text-2xl font-bold ${slide.accentColor} dark:text-primary`}
                      >
                        {slide.subtitle}
                      </p>
                    </motion.div>

                    <motion.p
                      className="text-base md:text-lg text-base-content/80 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {slide.description}
                    </motion.p>

                    
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {slide.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 bg-base-100/50 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <feature.icon className="w-5 h-5 text-success shrink-0" />
                          <span className="text-sm font-semibold text-base-content">
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    
                    <motion.div
                      className="flex items-center gap-6 py-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div
                        className={`bg-linear-to-br ${slide.gradient} backdrop-blur-md border border-base-content/10 shadow-xl rounded-2xl p-6`}
                      >
                        <motion.div
                          className={`text-4xl font-extrabold ${slide.accentColor} dark:text-primary`}
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
                        <div className="text-sm font-medium text-base-content/70 mt-1">
                          {slide.stats.label}
                        </div>
                      </div>
                    </motion.div>

                    
                    <motion.div
                      className="flex flex-wrap gap-4 pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <motion.button
                        className={`btn btn-lg gap-2 ${slide.badgeColor} text-white border-none`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {slide.buttonText} <FaArrowRight className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="btn btn-lg btn-outline gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  
                  <motion.div
                    className="order-1 lg:order-2 flex justify-center"
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <motion.div
                      className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 ${slide.badgeColor} p-1 max-h-[60vh]`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <motion.div
                        className={`absolute top-4 right-4 ${slide.badgeColor} text-white px-4 py-2 rounded-full font-bold shadow-lg text-sm flex items-center gap-2`}
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <FaStar className="text-yellow-300" />
                        Trending
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
