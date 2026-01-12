import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaHeart, 
  FaBriefcase, 
  FaUsers, 
  FaBrain, 
  FaExclamationTriangle,
  FaGraduationCap,
  FaHome,
  FaDumbbell,
  FaPalette,
  FaMoneyBillWave,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';

const Categories = () => {
  const categories = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Personal Growth",
      description: "Self-improvement, mindfulness, and personal development lessons",
      count: "1,200+ lessons",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      gradient: "from-red-500/20 to-pink-500/20"
    },
    {
      icon: <FaBriefcase className="w-8 h-8" />,
      title: "Career",
      description: "Professional development, leadership, and workplace wisdom",
      count: "850+ lessons",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Relationships",
      description: "Family, friendship, love, and social connection insights",
      count: "950+ lessons",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "Mindset",
      description: "Mental health, resilience, and psychological well-being",
      count: "720+ lessons",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      icon: <FaExclamationTriangle className="w-8 h-8" />,
      title: "Mistakes Learned",
      description: "Learning from failures, setbacks, and challenging experiences",
      count: "680+ lessons",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      gradient: "from-orange-500/20 to-yellow-500/20"
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Education",
      description: "Learning strategies, academic success, and knowledge sharing",
      count: "540+ lessons",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      icon: <FaHome className="w-8 h-8" />,
      title: "Family & Parenting",
      description: "Parenting wisdom, family dynamics, and home life balance",
      count: "420+ lessons",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20",
      gradient: "from-teal-500/20 to-cyan-500/20"
    },
    {
      icon: <FaDumbbell className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Physical health, fitness, nutrition, and lifestyle choices",
      count: "380+ lessons",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
      icon: <FaPalette className="w-8 h-8" />,
      title: "Creativity & Arts",
      description: "Creative expression, artistic journey, and innovative thinking",
      count: "290+ lessons",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8" />,
      title: "Finance & Money",
      description: "Financial literacy, investment wisdom, and money management",
      count: "350+ lessons",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      gradient: "from-yellow-500/20 to-amber-500/20"
    }
  ];

  const popularTags = [
    "Self-Discovery", "Leadership", "Communication", "Resilience", "Goal Setting",
    "Time Management", "Emotional Intelligence", "Productivity", "Motivation", "Success"
  ];

  return (
    <section className="py-20 bg-base-200" id="categories">
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
            <FaStar className="w-4 h-4" />
            Explore Categories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            Discover Wisdom in
            <span className="text-primary"> Every Area of Life</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Browse through carefully curated categories of life lessons, each filled with 
            real experiences and practical insights from our global community.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Link to={`/public_lessons?category=${encodeURIComponent(category.title)}`}>
                <div className={`
                  bg-gradient-to-br ${category.gradient} backdrop-blur-sm
                  rounded-3xl p-6 border-2 ${category.borderColor}
                  hover:shadow-2xl transition-all duration-300
                  relative overflow-hidden
                `}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 text-6xl">
                      {category.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`
                      w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <div className={category.color}>
                        {category.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-sm text-base-content/70 leading-relaxed mb-3">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary">
                        {category.count}
                      </span>
                      <FaArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Popular Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-base-content mb-6">
            Popular Topics
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {popularTags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-base-100 hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-medium border border-base-300 cursor-pointer transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Browse All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link to="/public_lessons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg gap-2"
              >
                <FaStar className="w-5 h-5" />
                Browse All Lessons
                <FaArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;