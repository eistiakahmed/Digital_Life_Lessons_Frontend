import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaShieldAlt, 
  FaUserCheck, 
  FaGavel, 
  FaExclamationTriangle,
  FaEnvelope,
  FaCalendarAlt
} from 'react-icons/fa';

const Terms = () => {
  const lastUpdated = "January 12, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <FaUserCheck className="w-6 h-6 text-primary" />,
      content: `By accessing and using Digital Life Lessons ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: "description",
      title: "2. Service Description",
      icon: <FaShieldAlt className="w-6 h-6 text-secondary" />,
      content: `Digital Life Lessons is a platform that allows users to create, share, and discover personal life lessons and experiences. The service includes both free and premium features, user-generated content, and community interactions.`
    },
    {
      id: "user-accounts",
      title: "3. User Accounts and Registration",
      icon: <FaUserCheck className="w-6 h-6 text-accent" />,
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must be at least 13 years old to use this service",
        "One person may not maintain more than one account",
        "You are responsible for all activities that occur under your account"
      ]
    },
    {
      id: "user-content",
      title: "4. User-Generated Content",
      icon: <FaGavel className="w-6 h-6 text-info" />,
      content: [
        "You retain ownership of content you create and share on the platform",
        "By posting content, you grant us a non-exclusive license to display, distribute, and promote your content",
        "You are solely responsible for the content you post and its legality",
        "Content must not violate our Community Guidelines or applicable laws",
        "We reserve the right to remove content that violates these terms"
      ]
    },
    {
      id: "prohibited-uses",
      title: "5. Prohibited Uses",
      icon: <FaExclamationTriangle className="w-6 h-6 text-warning" />,
      content: [
        "Posting illegal, harmful, threatening, or offensive content",
        "Harassment, bullying, or intimidation of other users",
        "Spam, unauthorized advertising, or promotional content",
        "Impersonation of others or providing false information",
        "Attempting to hack, disrupt, or compromise the platform's security",
        "Violating intellectual property rights of others"
      ]
    },
    {
      id: "premium-services",
      title: "6. Premium Services and Payments",
      icon: <FaShieldAlt className="w-6 h-6 text-success" />,
      content: [
        "Premium subscriptions provide access to additional features and content",
        "Payments are processed securely through third-party payment processors",
        "Premium subscriptions are non-refundable except as required by law",
        "We reserve the right to change pricing with 30 days notice",
        "Failure to pay may result in suspension of premium features"
      ]
    },
    {
      id: "privacy",
      title: "7. Privacy and Data Protection",
      icon: <FaShieldAlt className="w-6 h-6 text-primary" />,
      content: `Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our service, you consent to the collection and use of information as outlined in our Privacy Policy.`
    },
    {
      id: "intellectual-property",
      title: "8. Intellectual Property Rights",
      icon: <FaGavel className="w-6 h-6 text-secondary" />,
      content: [
        "The Digital Life Lessons platform, including its design, code, and features, is our intellectual property",
        "Our trademarks, logos, and brand elements may not be used without permission",
        "Users retain rights to their original content but grant us usage rights as specified",
        "We respect intellectual property rights and respond to valid DMCA notices"
      ]
    },
    {
      id: "disclaimers",
      title: "9. Disclaimers and Limitations",
      icon: <FaExclamationTriangle className="w-6 h-6 text-warning" />,
      content: [
        "The service is provided 'as is' without warranties of any kind",
        "We do not guarantee the accuracy, completeness, or reliability of user content",
        "Life lessons and advice shared are personal experiences, not professional guidance",
        "We are not liable for decisions made based on content found on our platform",
        "Our liability is limited to the maximum extent permitted by law"
      ]
    },
    {
      id: "termination",
      title: "10. Account Termination",
      icon: <FaExclamationTriangle className="w-6 h-6 text-error" />,
      content: [
        "You may delete your account at any time through your profile settings",
        "We may suspend or terminate accounts that violate these terms",
        "Upon termination, your access to premium features will cease immediately",
        "Some content may remain on the platform after account deletion for legal compliance",
        "Termination does not relieve you of obligations incurred before termination"
      ]
    },
    {
      id: "changes",
      title: "11. Changes to Terms",
      icon: <FaCalendarAlt className="w-6 h-6 text-info" />,
      content: `We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or platform notifications.`
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Jurisdiction",
      icon: <FaGavel className="w-6 h-6 text-primary" />,
      content: `These terms are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or use of the service will be resolved through binding arbitration or in courts of competent jurisdiction.`
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaGavel className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-base-content/70 mb-4">
            Please read these terms carefully before using Digital Life Lessons
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
            <FaCalendarAlt className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-base-content mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-colors text-sm"
              >
                {section.icon}
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-base-100 rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4">
                    {section.title}
                  </h2>
                  
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-base-content/80 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base-content/80 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-base-100 rounded-2xl shadow-lg p-8 mt-12"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-base-content/70 mb-6">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@digitallifelessons.com"
                className="btn btn-primary gap-2"
              >
                <FaEnvelope className="w-4 h-4" />
                Contact Legal Team
              </a>
              <Link to="/privacy" className="btn btn-outline gap-2">
                <FaShieldAlt className="w-4 h-4" />
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;