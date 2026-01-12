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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const slides = [
    {
      id: 1,
      badge: 'LIFE LESSONS',
      title: 'Capture Your Wisdom',
      subtitle: 'Preserve and Share What You Learn',
      description:
        'Transform your experiences into valuable lessons. Document your journey, reflect on growth, and inspire others with your unique insights.',
      image: Slide1,
      primaryAction: { text: 'Start Your Journey', link: '/register', icon: FaRocket },
      secondaryAction: { text: 'Explore Lessons', link: '/public_lessons', icon: FaBookOpen },
      features: [
        { icon: FaClock, text: 'Track Progress', color: 'text-blue-500' },
        { icon: FaCheckCircle, text: 'Organize Wisdom', color: 'text-green-500' },
        { icon: FaGraduationCap, text: 'Learn Together', color: 'text-purple-500' },
      ],
      stats: [
        { value: '1,000+', label: 'Lessons Shared', icon: FaBookOpen },
        { value: '500+', label: 'Active Learners', icon: FaUsers },
      ],
      gradient: 'from-purple-500/10 via-pink-500/10 to-red-500/10',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      accentColor: 'text-purple-600 dark:text-purple-400',
      theme: 'purple'
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
      theme: 'blue'
    },
    {
      id: 3,
      badge: 'COMMUNITY LEARNING',
      title: 'Join Our Growth Circle',
      subtitle: 'Connect, Share & Inspire',
      description:
        'Be part of a thriving community of learners. Share experiences, get feedback, and celebrate growth milestones together.',
      image: Slide3,
      primaryAction: { text: 'Join Community', link: '/register', icon: FaUsers },
      secondaryAction: { text: 'Meet Members', link: '/public_lessons', icon: FaHeart },
      features: [
        { icon: FaUsers, text: 'Active Community', color: 'text-green-500' },
        { icon: FaHeart, text: 'Supportive Network', color: 'text-red-500' },
        { icon: FaGraduationCap, text: 'Peer Learning', color: 'text-blue-500' },
      ],
      stats: [
        { value: '2,000+', label: 'Community Members', icon: FaUsers },
        { value: '98%', label: 'Satisfaction', icon: FaHeart },
      ],
      gradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      accentColor: 'text-green-600 dark:text-green-400',
      theme: 'green'
    },
  ];

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#featured-lessons');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[60vh] sm:h-[65vh] lg:h-[70vh] overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-200"
      />

      {/* Hero Content */}
      <div className="relative z-10 h-full">
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
            pauseOnMouseEnter: true 
          }}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="h-full hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className={`relative h-full bg-gradient-to-br ${slide.gradient} flex items-center`}>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden opacity-30">
                  <motion.div
                    className={`absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-r ${slide.badgeColor} rounded-full blur-3xl`}
                    animate={{ 
                      scale: [1, 1.2, 1], 
                      x: [0, 30, 0],
                      opacity: [0.3, 0.6, 0.3] 
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className={`absolute bottom-10 right-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-l ${slide.badgeColor} rounded-full blur-3xl`}
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      x: [0, -40, 0],
                      opacity: [0.2, 0.5, 0.2] 
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2,
                    }}
                  />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-8">
                    
                    {/* Content Side */}
                    <motion.div
                      className="space-y-6 order-2 lg:order-1"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <span className={`inline-flex items-center gap-2 ${slide.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                          <FaStar className="w-4 h-4" />
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
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-base-content leading-tight">
                          {slide.title}
                        </h1>
                        <p className={`text-lg sm:text-xl lg:text-2xl font-semibold ${slide.accentColor}`}>
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        className="text-base sm:text-lg text-base-content/80 leading-relaxed max-w-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {slide.description}
                      </motion.p>

                      {/* Features */}
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        {slide.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2 bg-base-100/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <feature.icon className={`w-4 h-4 ${feature.color}`} />
                            <span className="text-sm font-medium text-base-content">
                              {feature.text}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Stats */}
                      <motion.div
                        className="flex gap-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        {slide.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className={`text-2xl sm:text-3xl font-bold ${slide.accentColor} flex items-center gap-2`}>
                              <stat.icon className="w-6 h-6" />
                              {stat.value}
                            </div>
                            <div className="text-sm text-base-content/70 font-medium">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        <Link to={slide.primaryAction.link}>
                          <motion.button
                            className={`btn btn-lg ${slide.badgeColor} text-white border-none shadow-lg gap-2 w-full sm:w-auto`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <slide.primaryAction.icon className="w-5 h-5" />
                            {slide.primaryAction.text}
                          </motion.button>
                        </Link>
                        
                        <Link to={slide.secondaryAction.link}>
                          <motion.button
                            className="btn btn-lg btn-outline gap-2 w-full sm:w-auto"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <slide.secondaryAction.icon className="w-5 h-5" />
                            {slide.secondaryAction.text}
                          </motion.button>
                        </Link>
                      </motion.div>
                    </motion.div>

                    {/* Image Side */}
                    <motion.div
                      className="order-1 lg:order-2 flex justify-center items-center"
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <motion.div
                        className="relative max-w-md lg:max-w-lg xl:max-w-xl"
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 ${slide.badgeColor} p-1`}>
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-auto object-cover rounded-xl"
                          />
                          
                          {/* Floating Badge */}
                          <motion.div
                            className={`absolute top-4 right-4 ${slide.badgeColor} text-white px-3 py-2 rounded-full font-bold shadow-lg text-sm flex items-center gap-2`}
                            animate={{ 
                              y: [0, -10, 0],
                              rotate: [0, 5, -5, 0] 
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            <FaStar className="text-yellow-300 w-4 h-4" />
                            Featured
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="hero-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-primary shadow-lg">
          <FaChevronDown className="w-4 h-4 rotate-90" />
        </div>
        <div className="hero-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-primary shadow-lg">
          <FaChevronDown className="w-4 h-4 -rotate-90" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm font-medium text-base-content/70">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-base-content/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
