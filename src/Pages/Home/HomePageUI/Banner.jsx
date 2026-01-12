import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaStar,
  FaGraduationCap,
  FaChartLine,
  FaPlay,
  FaChevronDown,
  FaRocket,
  FaHeart,
  FaBookOpen,
} from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Slide1 from '../../../assets/slide1.png';
import Slide2 from '../../../assets/slide2.png';
import Slide3 from '../../../assets/slide3.png';

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    {
      id: 1,
      badge: 'LIFE LESSONS',
      title: 'Capture Your Wisdom',
      subtitle: 'Preserve and Share What You Learn',
      description:
        'Transform your experiences into valuable lessons. Document your journey, reflect on growth, and inspire others with your unique insights.',
      image: Slide1,
      primaryAction: {
        text: 'Start Your Journey',
        link: '/register',
        icon: FaRocket,
      },
      secondaryAction: {
        text: 'Explore Lessons',
        link: '/public_lessons',
        icon: FaBookOpen,
      },
      features: [
        { icon: FaClock, text: 'Track Progress', color: 'text-blue-500' },
        {
          icon: FaCheckCircle,
          text: 'Organize Wisdom',
          color: 'text-green-500',
        },
        {
          icon: FaGraduationCap,
          text: 'Learn Together',
          color: 'text-purple-500',
        },
      ],
      stats: [
        { value: '1,000+', label: 'Lessons Shared', icon: FaBookOpen },
        { value: '500+', label: 'Active Learners', icon: FaUsers },
      ],
      gradient: 'from-purple-500/10 via-pink-500/10 to-red-500/10',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      accentColor: 'text-purple-600 dark:text-purple-400',
      theme: 'purple',
    },
    {
      id: 2,
      badge: 'PREMIUM INSIGHTS',
      title: 'Unlock Exclusive Content',
      subtitle: 'Grow with Curated Wisdom',
      description:
        'Access premium life lessons from mentors and experts. Dive deeper into personal development with exclusive content and advanced insights.',
      image: Slide2,
      primaryAction: { text: 'Go Premium', link: '/pricing', icon: FaStar },
      secondaryAction: { text: 'View Features', link: '/about', icon: FaPlay },
      features: [
        { icon: FaChartLine, text: 'Expert Content', color: 'text-blue-500' },
        { icon: FaStar, text: 'Premium Access', color: 'text-yellow-500' },
        { icon: FaRocket, text: 'Fast Growth', color: 'text-green-500' },
      ],
      stats: [
        { value: '50+', label: 'Premium Lessons', icon: FaStar },
        { value: '95%', label: 'Success Rate', icon: FaChartLine },
      ],
      gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      accentColor: 'text-blue-600 dark:text-blue-400',
      theme: 'blue',
    },
    {
      id: 3,
      badge: 'COMMUNITY LEARNING',
      title: 'Join Our Growth Circle',
      subtitle: 'Connect, Share & Inspire',
      description:
        'Be part of a thriving community of learners. Share experiences, get feedback, and celebrate growth milestones together.',
      image: Slide3,
      primaryAction: {
        text: 'Join Community',
        link: '/register',
        icon: FaUsers,
      },
      secondaryAction: {
        text: 'Meet Members',
        link: '/public_lessons',
        icon: FaHeart,
      },
      features: [
        { icon: FaUsers, text: 'Active Community', color: 'text-green-500' },
        { icon: FaHeart, text: 'Supportive Network', color: 'text-red-500' },
        {
          icon: FaGraduationCap,
          text: 'Peer Learning',
          color: 'text-blue-500',
        },
      ],
      stats: [
        { value: '2,000+', label: 'Community Members', icon: FaUsers },
        { value: '98%', label: 'Satisfaction', icon: FaHeart },
      ],
      gradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      accentColor: 'text-green-600 dark:text-green-400',
      theme: 'green',
    },
  ];


  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen sm:min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh] xl:min-h-[75vh] overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-linear-to-br from-base-200 via-base-100 to-base-200"
      />

      {/* Hero Content */}
      <div className="relative z-10 h-full min-h-inherit">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.hero-button-next',
            prevEl: '.hero-button-prev',
          }}
          pagination={{
            clickable: true,
            bulletClass: 'hero-pagination-bullet',
            bulletActiveClass: 'hero-pagination-bullet-active',
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="h-full min-h-inherit hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`relative h-full min-h-inherit bg-linear-to-br ${slide.gradient} flex items-center overflow-hidden`}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20 md:opacity-30">
                  <motion.div
                    className={`absolute top-4 left-4 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 bg-linear-to-r ${slide.badgeColor} rounded-full blur-2xl sm:blur-3xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, 20, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className={`absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-linear-to-l ${slide.badgeColor} rounded-full blur-2xl sm:blur-3xl`}
                    animate={{
                      scale: [1, 1.3, 1],
                      x: [0, -30, 0],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2,
                    }}
                  />
                </div>

                {/* Main Content Container */}
                <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(90vh-6rem)] md:min-h-[calc(85vh-4rem)] lg:min-h-[calc(80vh-2rem)] xl:min-h-[calc(75vh-2rem)] py-8 sm:py-12 lg:py-16">
                      {/* Content Side */}
                      <motion.div
                        className="space-y-4 sm:space-y-6 order-2 lg:order-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <span
                            className={`inline-flex items-center gap-2 ${slide.badgeColor} text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg`}
                          >
                            <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {slide.badge}
                          </span>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-base-content leading-tight">
                            {slide.title}
                          </h1>
                          <p
                            className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ${slide.accentColor}`}
                          >
                            {slide.subtitle}
                          </p>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                          className="text-sm sm:text-base lg:text-lg text-base-content/80 leading-relaxed max-w-xl mx-auto lg:mx-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          {slide.description}
                        </motion.p>

                        {/* Features */}
                        <motion.div
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto lg:mx-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                        >
                          {slide.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center justify-center lg:justify-start gap-2 bg-base-100/80 backdrop-blur-sm px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-md"
                              whileHover={{ scale: 1.05, y: -2 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <feature.icon
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${feature.color}`}
                              />
                              <span className="text-xs sm:text-sm font-medium text-base-content">
                                {feature.text}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                          className="flex justify-center lg:justify-start gap-4 sm:gap-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        >
                          {slide.stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                              <div
                                className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${slide.accentColor} flex items-center justify-center gap-1 sm:gap-2`}
                              >
                                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                {stat.value}
                              </div>
                              <div className="text-xs sm:text-sm text-base-content/70 font-medium">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 max-w-md mx-auto lg:mx-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                        >
                          <Link
                            to={slide.primaryAction.link}
                            className="flex-1"
                          >
                            <motion.button
                              className={`btn btn-sm sm:btn-md lg:btn-lg ${slide.badgeColor} text-white border-none shadow-lg gap-1 sm:gap-2 w-full`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <slide.primaryAction.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                              <span className="text-xs sm:text-sm lg:text-base">
                                {slide.primaryAction.text}
                              </span>
                            </motion.button>
                          </Link>

                          <Link
                            to={slide.secondaryAction.link}
                            className="flex-1"
                          >
                            <motion.button
                              className="btn btn-sm sm:btn-md lg:btn-lg btn-outline gap-1 sm:gap-2 w-full"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <slide.secondaryAction.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                              <span className="text-xs sm:text-sm lg:text-base">
                                {slide.secondaryAction.text}
                              </span>
                            </motion.button>
                          </Link>
                        </motion.div>
                      </motion.div>

                      {/* Image Side */}
                      <motion.div
                        className="order-1 lg:order-2 flex justify-center items-center px-4 sm:px-0"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <motion.div
                          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                          whileHover={{ scale: 1.02, rotateY: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div
                            className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 ${slide.badgeColor} p-0.5 sm:p-1`}
                          >
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-auto object-cover rounded-lg sm:rounded-xl"
                              loading="eager"
                            />

                            {/* Floating Badge */}
                            <motion.div
                              className={`absolute top-2 right-2 sm:top-4 sm:right-4 ${slide.badgeColor} text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2`}
                              animate={{
                                y: [0, -8, 0],
                                rotate: [0, 3, -3, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            >
                              <FaStar className="text-yellow-300 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                              <span className="hidden sm:inline">Featured</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation - Hidden on mobile */}
        {!isMobile && (
          <>
            <div className="hero-button-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm sm:btn-md btn-primary shadow-lg opacity-80 hover:opacity-100">
              <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
            </div>
            <div className="hero-button-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm sm:btn-md btn-primary shadow-lg opacity-80 hover:opacity-100">
              <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4 -rotate-90" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Banner;
