import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaPaperPlane,
  FaQuestionCircle,
  FaBug,
  FaLightbulb,
  FaHandshake
} from 'react-icons/fa';
import { FormInput, FormTextarea, FormSelect, LoadingButton } from '../../Components/FormComponents';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const contactReasons = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'bug', label: 'Report a Bug' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'press', label: 'Press & Media' },
    { value: 'other', label: 'Other' },
  ];

  const contactMethods = [
    {
      icon: <FaEnvelope className="w-6 h-6 text-primary" />,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@digitallifelessons.com",
      action: "mailto:hello@digitallifelessons.com"
    },
    {
      icon: <FaPhone className="w-6 h-6 text-secondary" />,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6 text-accent" />,
      title: "Visit Us",
      description: "Our headquarters",
      contact: "123 Innovation Street, Tech City, TC 12345",
      action: "#"
    },
    {
      icon: <FaClock className="w-6 h-6 text-info" />,
      title: "Business Hours",
      description: "When we're available",
      contact: "Mon-Fri: 9AM-6PM EST",
      action: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <FaTwitter className="w-5 h-5" />,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400"
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "#",
      color: "hover:text-blue-600"
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-500"
    }
  ];

  const faqItems = [
    {
      icon: <FaQuestionCircle className="w-5 h-5 text-primary" />,
      question: "How do I create my first lesson?",
      answer: "Simply sign up for an account and click 'Add Lesson' in your dashboard. Our intuitive editor will guide you through the process."
    },
    {
      icon: <FaBug className="w-5 h-5 text-error" />,
      question: "I found a bug. How do I report it?",
      answer: "Use the contact form below and select 'Report a Bug' as your reason. Please include as much detail as possible about the issue."
    },
    {
      icon: <FaLightbulb className="w-5 h-5 text-warning" />,
      question: "Can I suggest new features?",
      answer: "Absolutely! We love hearing from our community. Use the contact form and select 'Feature Request' to share your ideas."
    },
    {
      icon: <FaHandshake className="w-5 h-5 text-success" />,
      question: "Do you offer partnership opportunities?",
      answer: "Yes! We're always interested in meaningful partnerships. Contact us with 'Partnership Opportunity' selected for more information."
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEnvelope className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you. 
            Our team is here to help and support your journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-base-100 rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-base-content mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    register={(name) => register(name, {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 50, message: 'Name cannot exceed 50 characters' }
                    })}
                    error={errors.name}
                    required
                  />
                  
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    register={(name) => register(name, {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    error={errors.email}
                    required
                  />
                </div>

                <FormSelect
                  label="Reason for Contact"
                  name="reason"
                  options={contactReasons}
                  register={(name) => register(name, {
                    required: 'Please select a reason for contact'
                  })}
                  error={errors.reason}
                  required
                  placeholder="Select a reason"
                />

                <FormInput
                  label="Subject"
                  name="subject"
                  placeholder="Brief subject line"
                  register={(name) => register(name, {
                    required: 'Subject is required',
                    minLength: { value: 5, message: 'Subject must be at least 5 characters' },
                    maxLength: { value: 100, message: 'Subject cannot exceed 100 characters' }
                  })}
                  error={errors.subject}
                  required
                />

                <FormTextarea
                  label="Message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  register={(name) => register(name, {
                    required: 'Message is required',
                    minLength: { value: 20, message: 'Message must be at least 20 characters' },
                    maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' }
                  })}
                  error={errors.message}
                  required
                  rows={6}
                  maxLength={1000}
                />

                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Sending..."
                  variant="primary"
                  size="lg"
                  icon={FaPaperPlane}
                  className="w-full"
                >
                  Send Message
                </LoadingButton>
              </form>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-base-100 rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-base-content mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors">
                    <div className="flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base-content mb-1">{method.title}</h4>
                      <p className="text-sm text-base-content/60 mb-1">{method.description}</p>
                      <a 
                        href={method.action}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {method.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-base-100 rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-base-content mb-6">Follow Us</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-circle btn-outline ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <p className="text-sm text-base-content/60 mt-4">
                Stay updated with our latest features and community highlights.
              </p>
            </motion.div>

            {/* Quick FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-base-100 rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-base-content mb-6">Quick FAQ</h3>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-base-300 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3 mb-2">
                      {item.icon}
                      <h4 className="font-semibold text-base-content text-sm">{item.question}</h4>
                    </div>
                    <p className="text-xs text-base-content/60 ml-8">{item.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Response Time Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-info/10 border border-info/20 rounded-2xl p-6 mt-12 text-center"
        >
          <FaClock className="w-8 h-8 text-info mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-base-content mb-2">Response Time</h3>
          <p className="text-base-content/70">
            We typically respond to all inquiries within 24 hours during business days. 
            For urgent technical issues, please include "URGENT" in your subject line.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;