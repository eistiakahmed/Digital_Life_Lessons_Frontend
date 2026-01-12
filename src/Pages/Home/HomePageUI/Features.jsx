import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBookOpen, 
  FaUsers, 
  FaCrown, 
  FaChartLine, 
  FaHeart, 
  FaShieldAlt,
  FaMobile,
  FaGlobe,
  FaRocket,
  FaBrain,
  FaHandshake,
  FaStar
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaBookOpen className="w-8 h-8" />,
      title: "Personal Lesson Library",
      description: "Create, organize, and manage your life lessons in a beautiful, intuitive interface.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community Learning",
      description: "Connect with like-minded individuals and learn from their experiences and insights.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: <FaCrown className="w-8 h-8" />,
      title: "Premium Content",
      description: "Access exclusive lessons from experts, mentors, and thought leaders in various fields.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your personal growth journey with detailed analytics and milestone tracking.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Favorites & Bookmarks",
      description: "Save and organize lessons that resonate with you for easy access and review.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Privacy Controls",
      description: "Full control over your content visibility with flexible privacy settings.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20"
    },
    {
      icon: <FaMobile className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Access your lessons anywhere with our fully responsive, mobile-first design.",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20"
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Community",
      description: "Join learners from around the world and discover diverse perspectives and wisdom.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions help you discover relevant lessons based on your interests.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "Reflection Tools",
      description: "Built-in tools to help you reflect, analyze, and extract deeper insights from experiences.",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20"
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Mentorship Network",
      description: "Connect with mentors and become a mentor yourself in our supportive ecosystem.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges and recognition for your contributions and learning milestones.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    }
  ];

  return (
    <section className="py-20 bg-base-100" id="features">
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
            <FaRocket className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            Everything You Need to
            <span className="text-primary"> Grow & Learn</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Discover a comprehensive platform designed to help you capture wisdom, 
            connect with others, and accelerate your personal growth journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`
                bg-base-200 rounded-2xl p-6 border-2 ${feature.borderColor} 
                hover:shadow-xl transition-all duration-300 group cursor-pointer
              `}
            >
              <div className={`
                w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300
              `}>
                <div className={feature.color}>
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-base-content/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-base-content/70 mb-6">
            Ready to experience all these features?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg gap-2"
            >
              <FaRocket className="w-5 h-5" />
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline btn-lg gap-2"
            >
              <FaBookOpen className="w-5 h-5" />
              Explore Features
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;