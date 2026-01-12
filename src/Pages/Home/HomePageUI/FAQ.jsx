import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronDown, 
  FaQuestionCircle, 
  FaBookOpen, 
  FaCrown, 
  FaUsers,
  FaShieldAlt,
  FaHeart,
  FaEnvelope
} from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      category: "Getting Started",
      icon: <FaBookOpen className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      questions: [
        {
          question: "How do I create my first life lesson?",
          answer: "Creating your first lesson is simple! After signing up, click 'Add Lesson' in your dashboard. Choose a category, write your title and description, add any relevant tags, and decide if you want it to be public or private. Our intuitive editor will guide you through the process step by step."
        },
        {
          question: "Is Digital Life Lessons free to use?",
          answer: "Yes! We offer a generous free plan that includes creating unlimited personal lessons, accessing public community content, and basic features. Our Premium plan unlocks exclusive content, advanced features, and priority support for those who want to take their growth journey further."
        },
        {
          question: "How do I find lessons relevant to my interests?",
          answer: "You can browse lessons by categories like Personal Growth, Career, Relationships, and more. Use our search function with keywords, filter by tags, or check out our curated collections. Our recommendation engine also suggests lessons based on your reading history and interests."
        }
      ]
    },
    {
      category: "Premium Features",
      icon: <FaCrown className="w-5 h-5" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      questions: [
        {
          question: "What's included in the Premium subscription?",
          answer: "Premium members get access to exclusive lessons from experts, advanced analytics on their growth journey, priority customer support, ad-free experience, unlimited lesson creation, premium templates, and early access to new features. It's a one-time payment of ৳1,500 for lifetime access."
        },
        {
          question: "Can I upgrade or downgrade my plan anytime?",
          answer: "Since our Premium plan is a one-time lifetime purchase, there's no need to worry about recurring payments or downgrades. Once you upgrade, you'll have permanent access to all Premium features. If you have any issues, our support team is always here to help."
        },
        {
          question: "Do you offer refunds for Premium subscriptions?",
          answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your Premium experience within the first 30 days, we'll provide a full refund, no questions asked. We're confident you'll love the additional value Premium brings to your growth journey."
        }
      ]
    },
    {
      category: "Community & Privacy",
      icon: <FaUsers className="w-5 h-5" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      questions: [
        {
          question: "How do privacy settings work for my lessons?",
          answer: "You have full control over your content visibility. Lessons can be set to Private (only you can see), Public (visible to all users), or Premium (visible to Premium members only). You can change these settings anytime from your lesson management dashboard."
        },
        {
          question: "Can I interact with other community members?",
          answer: "Absolutely! You can favorite lessons that resonate with you, follow other users whose content you enjoy, and engage with the community through our respectful and supportive environment. We're building features for comments and discussions coming soon."
        },
        {
          question: "How do you ensure content quality and safety?",
          answer: "We have community guidelines and a reporting system to maintain a positive environment. Our moderation team reviews reported content, and we use both automated and human review processes. We're committed to creating a safe space for sharing and learning."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      questions: [
        {
          question: "Is my data secure and backed up?",
          answer: "Yes, we take data security seriously. All data is encrypted in transit and at rest, we perform regular backups, and we follow industry best practices for data protection. Your lessons and personal information are stored securely on reliable cloud infrastructure."
        },
        {
          question: "Can I export my lessons and data?",
          answer: "Yes! You can export your lessons in various formats including PDF, Word, and JSON. This ensures you always have access to your content and can take it with you if needed. Premium users get additional export options and formatting choices."
        },
        {
          question: "What browsers and devices are supported?",
          answer: "Our platform works on all modern browsers (Chrome, Firefox, Safari, Edge) and is fully responsive for mobile, tablet, and desktop use. We also have progressive web app features, so you can add it to your home screen for a native app-like experience."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const newIndex = categoryIndex * 1000 + questionIndex;
    setActiveIndex(activeIndex === newIndex ? -1 : newIndex);
  };

  return (
    <section className="py-20 bg-base-100" id="faq">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaQuestionCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            Got Questions?
            <span className="text-primary"> We've Got Answers</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Find answers to common questions about Digital Life Lessons. 
            Can't find what you're looking for? Our support team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              {faqs.map((category, categoryIndex) => (
                <motion.button
                  key={categoryIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  onClick={() => {
                    const element = document.getElementById(`category-${categoryIndex}`);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`
                    w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300
                    hover:bg-base-200 group
                  `}
                >
                  <div className={`
                    w-10 h-10 ${category.bgColor} rounded-xl flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <div className={category.color}>
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-base-content group-hover:text-primary transition-colors">
                      {category.category}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {category.questions.length} questions
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3 space-y-12">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                id={`category-${categoryIndex}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`
                    w-12 h-12 ${category.bgColor} rounded-2xl flex items-center justify-center
                  `}>
                    <div className={category.color}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-base-content">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const faqIndex = categoryIndex * 1000 + questionIndex;
                    const isActive = activeIndex === faqIndex;

                    return (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: questionIndex * 0.1 }}
                        className={`
                          bg-base-200 rounded-2xl border-2 transition-all duration-300
                          ${isActive ? 'border-primary shadow-lg' : 'border-transparent hover:border-base-300'}
                        `}
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <h4 className="text-lg font-semibold text-base-content pr-4">
                            {faq.question}
                          </h4>
                          <motion.div
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <FaChevronDown className="w-5 h-5 text-base-content/60" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <p className="text-base-content/70 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaHeart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-base-content mb-4">
              Still Have Questions?
            </h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Our friendly support team is here to help you get the most out of 
              Digital Life Lessons. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg gap-2"
              >
                <FaEnvelope className="w-5 h-5" />
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-lg gap-2"
              >
                <FaBookOpen className="w-5 h-5" />
                Browse Help Center
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;