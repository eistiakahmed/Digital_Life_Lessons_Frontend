import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaShieldAlt, 
  FaUserShield, 
  FaDatabase, 
  FaCookie,
  FaEnvelope,
  FaCalendarAlt,
  FaLock,
  FaEye,
  FaTrash,
  FaGlobe
} from 'react-icons/fa';

const Privacy = () => {
  const lastUpdated = "January 12, 2025";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: <FaShieldAlt className="w-6 h-6 text-primary" />,
      content: `Digital Life Lessons ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully.`
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      icon: <FaDatabase className="w-6 h-6 text-secondary" />,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and email address (required for account creation)",
            "Profile picture and bio (optional)",
            "Payment information (processed securely by third-party providers)",
            "Communication preferences and settings"
          ]
        },
        {
          subtitle: "Content Information",
          items: [
            "Life lessons and stories you create and share",
            "Comments and interactions with other users' content",
            "Favorites and bookmarks",
            "Privacy settings for your content"
          ]
        },
        {
          subtitle: "Usage Information",
          items: [
            "Device information (browser type, operating system)",
            "IP address and location data (for security and analytics)",
            "Usage patterns and feature interactions",
            "Performance and error logs"
          ]
        }
      ]
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: <FaEye className="w-6 h-6 text-accent" />,
      content: [
        "Provide and maintain our service functionality",
        "Personalize your experience and content recommendations",
        "Process payments and manage premium subscriptions",
        "Send important updates and notifications",
        "Improve our platform through analytics and user feedback",
        "Ensure security and prevent fraud or abuse",
        "Comply with legal obligations and enforce our terms"
      ]
    },
    {
      id: "information-sharing",
      title: "4. Information Sharing and Disclosure",
      icon: <FaUserShield className="w-6 h-6 text-info" />,
      content: [
        {
          subtitle: "We DO NOT sell your personal information",
          items: [
            "Your personal data is never sold to third parties",
            "We only share information as described in this policy"
          ]
        },
        {
          subtitle: "When We May Share Information",
          items: [
            "With your explicit consent",
            "To comply with legal requirements or court orders",
            "To protect our rights, property, or safety",
            "With service providers who help operate our platform",
            "In connection with a business transfer or merger"
          ]
        },
        {
          subtitle: "Public Content",
          items: [
            "Content you mark as 'Public' is visible to all users",
            "Your profile information may be visible to other users",
            "You control the privacy settings for your content"
          ]
        }
      ]
    },
    {
      id: "data-security",
      title: "5. Data Security",
      icon: <FaLock className="w-6 h-6 text-success" />,
      content: [
        "We use industry-standard encryption to protect your data",
        "Secure authentication with Firebase Authentication",
        "Regular security audits and vulnerability assessments",
        "Access controls and employee training on data protection",
        "Secure data centers with physical and digital safeguards",
        "However, no method of transmission over the internet is 100% secure"
      ]
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking Technologies",
      icon: <FaCookie className="w-6 h-6 text-warning" />,
      content: [
        {
          subtitle: "Essential Cookies",
          items: [
            "Authentication and session management",
            "Security and fraud prevention",
            "Basic functionality and user preferences"
          ]
        },
        {
          subtitle: "Analytics Cookies",
          items: [
            "Usage statistics and performance monitoring",
            "Feature usage and user behavior analysis",
            "Error tracking and debugging information"
          ]
        },
        {
          subtitle: "Your Cookie Choices",
          items: [
            "You can control cookies through your browser settings",
            "Disabling cookies may affect platform functionality",
            "We respect Do Not Track signals where technically feasible"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      title: "7. Your Privacy Rights",
      icon: <FaUserShield className="w-6 h-6 text-primary" />,
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "View and download your personal data",
            "Update or correct your information",
            "Delete your account and associated data",
            "Control privacy settings for your content"
          ]
        },
        {
          subtitle: "Communication Preferences",
          items: [
            "Opt out of marketing communications",
            "Choose notification preferences",
            "Manage email subscription settings"
          ]
        },
        {
          subtitle: "Data Portability",
          items: [
            "Export your content and data",
            "Transfer data to other platforms (where technically feasible)"
          ]
        }
      ]
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      icon: <FaTrash className="w-6 h-6 text-error" />,
      content: [
        "Account data is retained while your account is active",
        "Content may be retained for legal compliance after account deletion",
        "Analytics data is anonymized and retained for service improvement",
        "Payment records are retained as required by law",
        "You can request data deletion subject to legal requirements"
      ]
    },
    {
      id: "international-transfers",
      title: "9. International Data Transfers",
      icon: <FaGlobe className="w-6 h-6 text-info" />,
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable laws.`
    },
    {
      id: "children-privacy",
      title: "10. Children's Privacy",
      icon: <FaUserShield className="w-6 h-6 text-warning" />,
      content: `Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.`
    },
    {
      id: "changes",
      title: "11. Changes to This Privacy Policy",
      icon: <FaCalendarAlt className="w-6 h-6 text-secondary" />,
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date. Significant changes will be communicated via email or platform notification.`
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
            <FaShieldAlt className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-base-content/70 mb-4">
            Your privacy matters to us. Learn how we protect and use your information.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
            <FaCalendarAlt className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-base-content mb-4">Privacy at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <FaLock className="w-5 h-5 text-primary" />
              <span className="text-sm">We never sell your data</span>
            </div>
            <div className="flex items-center gap-3">
              <FaUserShield className="w-5 h-5 text-secondary" />
              <span className="text-sm">You control your privacy</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShieldAlt className="w-5 h-5 text-accent" />
              <span className="text-sm">Industry-standard security</span>
            </div>
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
            {sections.map((section) => (
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

        {/* Privacy Sections */}
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
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.subtitle ? (
                            <div>
                              <h3 className="text-lg font-semibold text-base-content mb-3">
                                {item.subtitle}
                              </h3>
                              <ul className="space-y-2">
                                {item.items.map((subItem, subIndex) => (
                                  <li key={subIndex} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-base-content/80 leading-relaxed">{subItem}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-base-content/80 leading-relaxed">{item}</span>
                            </li>
                          )}
                        </div>
                      ))}
                    </div>
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
              Questions About Your Privacy?
            </h2>
            <p className="text-base-content/70 mb-6">
              We're here to help you understand how we protect your information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@digitallifelessons.com"
                className="btn btn-primary gap-2"
              >
                <FaEnvelope className="w-4 h-4" />
                Contact Privacy Team
              </a>
              <Link to="/terms" className="btn btn-outline gap-2">
                <FaShieldAlt className="w-4 h-4" />
                Terms of Service
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

export default Privacy;