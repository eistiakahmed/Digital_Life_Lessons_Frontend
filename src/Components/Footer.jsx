import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Logo from '../Shared/Logo/Logo';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
  FaGithub,
  FaDiscord,
  FaTelegram
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Lessons', path: '/public_lessons' },
    { name: 'Categories', path: '/public_lessons' },
    { name: 'Premium', path: '/pricing' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const supportLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Support', path: '/contact' },
    { name: 'Help Center', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const communityLinks = [
    { name: 'Join Community', path: '/register' },
    { name: 'Success Stories', path: '/public_lessons' },
    { name: 'Featured Authors', path: '/public_lessons' },
    { name: 'Newsletter', path: '#newsletter' },
    { name: 'Blog', path: '/public_lessons' },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      url: 'https://facebook.com/digitallifelessons',
      name: 'Facebook',
      color: 'hover:text-blue-600'
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: 'https://twitter.com/digitallifelessons',
      name: 'Twitter',
      color: 'hover:text-blue-400'
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/company/digitallifelessons',
      name: 'LinkedIn',
      color: 'hover:text-blue-700'
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: 'https://instagram.com/digitallifelessons',
      name: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      url: 'https://youtube.com/@digitallifelessons',
      name: 'YouTube',
      color: 'hover:text-red-500'
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: 'https://github.com/digitallifelessons',
      name: 'GitHub',
      color: 'hover:text-gray-600'
    },
    {
      icon: <FaDiscord className="w-5 h-5" />,
      url: 'https://discord.gg/digitallifelessons',
      name: 'Discord',
      color: 'hover:text-indigo-500'
    },
    {
      icon: <FaTelegram className="w-5 h-5" />,
      url: 'https://t.me/digitallifelessons',
      name: 'Telegram',
      color: 'hover:text-blue-500'
    },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5 text-primary" />,
      label: 'Email Us',
      value: 'hello@digitallifelessons.com',
      link: 'mailto:hello@digitallifelessons.com'
    },
    {
      icon: <FaPhone className="w-5 h-5 text-secondary" />,
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5 text-accent" />,
      label: 'Visit Us',
      value: '123 Innovation Street, Tech City, TC 12345',
      link: 'https://maps.google.com/?q=123+Innovation+Street+Tech+City'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-base-300 mt-16 relative">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 right-8 btn btn-primary btn-circle shadow-lg"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="px-4 py-16">
        <div className="max-w-11/12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12"
          >
            
            {/* Company Info - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-base-content/70 mb-6 leading-relaxed text-lg">
                Empowering people to share, learn, and grow through meaningful
                life lessons. Join our community of wisdom seekers and
                contributors building a better tomorrow together.
              </p>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-base-content mb-4">
                  Get in Touch
                </h4>
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    {contact.icon}
                    <div>
                      <div className="text-sm font-medium text-base-content/80">
                        {contact.label}
                      </div>
                      <a
                        href={contact.link}
                        target={contact.link.startsWith('http') ? '_blank' : '_self'}
                        rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="text-sm text-base-content/60 hover:text-primary transition-colors"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-base-content mb-4">
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`btn btn-circle btn-outline btn-sm ${social.color} transition-colors`}
                      title={social.name}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-base-content/70 hover:text-primary transition-colors duration-200 hover:underline flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Support & Legal
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-base-content/70 hover:text-primary transition-colors duration-200 hover:underline flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Community
              </h3>
              <ul className="space-y-3">
                {communityLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-base-content/70 hover:text-primary transition-colors duration-200 hover:underline flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="mt-8 p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <h4 className="font-semibold text-base-content mb-2">
                  Weekly Wisdom
                </h4>
                <p className="text-sm text-base-content/70 mb-3">
                  Get curated life lessons delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input input-bordered input-sm flex-1 text-sm h-11"
                  />
                  <button className="btn btn-primary btn-sm">
                    <FaEnvelope className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-base-content/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-base-content/60 text-sm text-center md:text-left">
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  © {currentYear} Digital Life Lessons. Made with 
                  <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                  for the community.
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-base-content/60">
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Support
                </Link>
                <div className="flex items-center gap-1">
                  <span>Status:</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-500">All Systems Operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
