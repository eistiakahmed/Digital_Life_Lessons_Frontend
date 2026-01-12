import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  FaSearch,
  FaQuestionCircle,
  FaBook,
  FaVideo,
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
  FaRocket,
  FaUsers,
  FaCrown,
  FaShieldAlt,
  FaBug,
  FaLightbulb,
  FaHeart,
  FaArrowRight,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: <FaBook /> },
    { id: 'getting-started', name: 'Getting Started', icon: <FaRocket /> },
    { id: 'lessons', name: 'Creating Lessons', icon: <FaLightbulb /> },
    { id: 'account', name: 'Account & Profile', icon: <FaUsers /> },
    { id: 'premium', name: 'Premium Features', icon: <FaCrown /> },
    { id: 'privacy', name: 'Privacy & Safety', icon: <FaShieldAlt /> },
    { id: 'technical', name: 'Technical Issues', icon: <FaBug /> },
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first life lesson?',
      answer: 'Creating your first lesson is easy! After signing up, go to your dashboard and click "Add Lesson". Fill in your story with a meaningful title, choose a category that fits, describe your experience, and share the lesson you learned. Don\'t forget to add an image if you have one!',
      popular: true
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'What makes a good life lesson?',
      answer: 'A good life lesson is authentic, relatable, and actionable. Share real experiences, be honest about challenges you faced, explain what you learned, and provide practical advice others can apply. The best lessons come from genuine reflection on meaningful experiences.'
    },
    {
      id: 3,
      category: 'lessons',
      question: 'Can I edit my lesson after publishing?',
      answer: 'Yes! You can edit your lessons anytime from your dashboard. Go to "My Lessons", find the lesson you want to update, and click the edit button. Your changes will be saved immediately.'
    },
    {
      id: 4,
      category: 'lessons',
      question: 'How do I make my lesson featured?',
      answer: 'Featured lessons are selected by our community team based on quality, engagement, and impact. Focus on creating authentic, well-written lessons that provide real value. Premium members have a higher chance of being featured.'
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to your dashboard and click on "Profile" in the sidebar. Here you can update your name, bio, profile picture, and other personal information. Changes are saved automatically.'
    },
    {
      id: 6,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from the Profile settings. Please note that this action is permanent and will remove all your lessons and data. Consider downloading your lessons first if you want to keep them.'
    },
    {
      id: 7,
      category: 'premium',
      question: 'What are the benefits of Premium membership?',
      answer: 'Premium members get unlimited lesson creation, ad-free experience, priority support, advanced analytics, exclusive community access, and the ability to create premium-only lessons. You also get priority consideration for featured lessons.'
    },
    {
      id: 8,
      category: 'premium',
      question: 'How do I upgrade to Premium?',
      answer: 'Click on "Upgrade" in the navigation menu or go to the Pricing page. Choose your plan and complete the payment process. Your Premium features will be activated immediately after successful payment.'
    },
    {
      id: 9,
      category: 'privacy',
      question: 'Who can see my lessons?',
      answer: 'You control the visibility of your lessons. You can set them as Public (visible to everyone), Private (only you can see), or Premium (only Premium members can access). You can change these settings anytime.'
    },
    {
      id: 10,
      category: 'privacy',
      question: 'How do you protect my personal information?',
      answer: 'We take privacy seriously. We use industry-standard encryption, never sell your data, and only collect information necessary to provide our service. Read our Privacy Policy for complete details.'
    },
    {
      id: 11,
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try refreshing the page, clearing your browser cache, or checking your internet connection. If the problem persists, try using a different browser or device. Contact support if issues continue.'
    },
    {
      id: 12,
      category: 'technical',
      question: 'I can\'t upload images. What\'s wrong?',
      answer: 'Make sure your image is under 5MB and in JPG, PNG, or GIF format. Check your internet connection and try again. If you\'re still having trouble, try using a different browser or contact support.'
    }
  ];

  const quickActions = [
    {
      title: 'Create Your First Lesson',
      description: 'Share your first life experience with our community',
      icon: <FaLightbulb className="w-6 h-6" />,
      link: '/dashboard/add_lesson',
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Explore Public Lessons',
      description: 'Discover wisdom from our community members',
      icon: <FaBook className="w-6 h-6" />,
      link: '/public_lessons',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      title: 'Upgrade to Premium',
      description: 'Unlock all features and join our premium community',
      icon: <FaCrown className="w-6 h-6" />,
      link: '/pricing',
      color: 'bg-accent/10 text-accent'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our friendly support team',
      icon: <FaHeadset className="w-6 h-6" />,
      link: '/contact',
      color: 'bg-info/10 text-info'
    }
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <FaHeadset className="w-8 h-8 text-primary" />,
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: 'Start Chat',
      premium: false
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: <FaEnvelope className="w-8 h-8 text-secondary" />,
      availability: 'Response within 24 hours',
      action: 'Send Email',
      premium: false
    },
    {
      title: 'Priority Support',
      description: 'Premium members get faster response times',
      icon: <FaCrown className="w-8 h-8 text-accent" />,
      availability: 'Response within 2 hours',
      action: 'Contact Now',
      premium: true
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: <FaPhone className="w-8 h-8 text-info" />,
      availability: 'Premium members only',
      action: 'Call Now',
      premium: true
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Help & Support
            </h1>
            <p className="text-xl lg:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed mb-8">
              Find answers to your questions, learn how to make the most of Digital Life Lessons, 
              and get the support you need to share your wisdom with the world.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-lg w-full pl-12 pr-4"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
            <p className="text-lg text-base-content/70">
              Common tasks to get you started quickly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={action.link}
                  className="block bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                  <p className="text-base-content/70 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Get Started <FaArrowRight className="w-3 h-3 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`btn btn-sm gap-2 ${
                  selectedCategory === category.id ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-base-content/70">
              Find quick answers to the most common questions
            </p>
          </motion.div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-base-100 rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-base-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {faq.popular && (
                        <span className="badge badge-primary badge-sm">Popular</span>
                      )}
                      <h3 className="font-bold text-lg">{faq.question}</h3>
                    </div>
                    {expandedFaq === faq.id ? (
                      <FaChevronUp className="w-5 h-5 text-base-content/60" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-base-content/60" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-base-content/70 leading-relaxed pl-3 border-l-2 border-primary/20">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaQuestionCircle className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No FAQs found</h3>
              <p className="text-base-content/70">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg text-base-content/70">
              Our support team is here to help you succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  option.premium ? 'border-2 border-accent/20' : ''
                }`}
              >
                <div className="text-center">
                  <div className="mb-4">{option.icon}</div>
                  {option.premium && (
                    <span className="badge badge-accent badge-sm mb-2">Premium</span>
                  )}
                  <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                  <p className="text-base-content/70 text-sm mb-4">{option.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-base-content/60 mb-4">
                    <FaClock className="w-3 h-3" />
                    {option.availability}
                  </div>
                  <Link
                    to="/contact"
                    className={`btn btn-sm w-full ${
                      option.premium ? 'btn-accent' : 'btn-primary'
                    }`}
                  >
                    {option.action}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
              <p className="text-lg text-base-content/70">
                Explore more ways to get help and connect with our community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <FaVideo className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
                <p className="text-base-content/70 mb-4">
                  Watch step-by-step guides on how to use our platform effectively.
                </p>
                <button className="btn btn-outline btn-sm">Coming Soon</button>
              </div>

              <div className="text-center">
                <FaUsers className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Forum</h3>
                <p className="text-base-content/70 mb-4">
                  Connect with other users and share tips and experiences.
                </p>
                <button className="btn btn-outline btn-sm">Coming Soon</button>
              </div>

              <div className="text-center">
                <FaBook className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">User Guide</h3>
                <p className="text-base-content/70 mb-4">
                  Comprehensive documentation covering all platform features.
                </p>
                <Link to="/blog" className="btn btn-outline btn-sm">
                  Read Blog
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Help;