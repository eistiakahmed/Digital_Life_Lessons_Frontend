import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaUsers, 
  FaBookOpen, 
  FaGlobe, 
  FaHeart,
  FaStar,
  FaCrown,
  FaChartLine,
  FaRocket
} from 'react-icons/fa';

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      number: 5000,
      suffix: '+',
      label: 'Active Learners',
      description: 'Growing community of wisdom seekers',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: <FaBookOpen className="w-8 h-8" />,
      number: 12000,
      suffix: '+',
      label: 'Life Lessons',
      description: 'Shared experiences and insights',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      number: 85,
      suffix: '+',
      label: 'Countries',
      description: 'Global reach and diverse perspectives',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      number: 50000,
      suffix: '+',
      label: 'Favorites',
      description: 'Lessons saved and cherished',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      number: 98,
      suffix: '%',
      label: 'Satisfaction',
      description: 'User happiness and engagement',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: <FaCrown className="w-8 h-8" />,
      number: 1200,
      suffix: '+',
      label: 'Premium Users',
      description: 'Committed to growth and learning',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  const AnimatedNumber = ({ number, suffix, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [number, isVisible]);

    return (
      <span>
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section className="py-20 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5" id="statistics">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaChartLine className="w-4 h-4" />
            Our Impact
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            Numbers That Tell
            <span className="text-primary"> Our Story</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Join thousands of learners who are transforming their lives through shared wisdom 
            and meaningful connections in our growing community.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-base-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300/50"
            >
              <div className="text-center">
                <div className={`
                  w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6
                  transform hover:scale-110 transition-transform duration-300
                `}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>

                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  <AnimatedNumber 
                    number={stat.number} 
                    suffix={stat.suffix} 
                    isVisible={isInView} 
                  />
                </div>

                <h3 className="text-xl font-bold text-base-content mb-2">
                  {stat.label}
                </h3>

                <p className="text-base-content/70 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-base-100 rounded-3xl p-8 lg:p-12 shadow-xl border border-base-300/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <FaRocket className="w-4 h-4" />
                  Milestones Achieved
                </div>
                <h3 className="text-3xl font-bold text-base-content mb-6">
                  Building the Future of Learning Together
                </h3>
                <p className="text-base-content/70 leading-relaxed mb-6">
                  Every number represents real people sharing real experiences, creating a 
                  ripple effect of positive change across the globe. We're not just building 
                  a platform; we're nurturing a movement of conscious growth and shared wisdom.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-success">
                    <FaRocket className="w-4 h-4" />
                    <span className="font-semibold">Growing Daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <FaStar className="w-4 h-4" />
                    <span className="font-semibold">Highly Rated</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <FaHeart className="w-4 h-4" />
                    <span className="font-semibold">Community Loved</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-primary/5 rounded-2xl">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-base-content/70">Platform Availability</div>
                </div>
                <div className="text-center p-6 bg-secondary/5 rounded-2xl">
                  <div className="text-2xl font-bold text-secondary mb-1"> 1s</div>
                  <div className="text-sm text-base-content/70">Average Load Time</div>
                </div>
                <div className="text-center p-6 bg-accent/5 rounded-2xl">
                  <div className="text-2xl font-bold text-accent mb-1">99.9%</div>
                  <div className="text-sm text-base-content/70">Uptime Guarantee</div>
                </div>
                <div className="text-center p-6 bg-success/5 rounded-2xl">
                  <div className="text-2xl font-bold text-success mb-1">4.9★</div>
                  <div className="text-sm text-base-content/70">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;