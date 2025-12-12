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
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Public Lessons', path: '/public_lessons' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      url: 'https://facebook.com',
      name: 'Facebook',
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: 'https://twitter.com',
      name: 'Twitter',
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: 'https://linkedin.com',
      name: 'LinkedIn',
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: 'https://instagram.com',
      name: 'Instagram',
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      url: 'https://youtube.com',
      name: 'YouTube',
    },
  ];

  return (
    <footer className="bg-base-300 mt-16 rounded-4xl">
      {/* Main Footer Content */}
      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12"
          >
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-base-content/70 mb-6 leading-relaxed">
                Empowering people to share, learn, and grow through meaningful
                life lessons. Join our community of wisdom seekers and
                contributors.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-base-content/60">
                  <FaEnvelope className="w-4 h-4 text-primary" />
                  <span>support@digitallifelessons.com</span>
                </div>
                <div className="flex items-center gap-3 text-base-content/60">
                  <FaPhone className="w-4 h-4 text-primary" />
                  <span>+880 1234-567890</span>
                </div>
                <div className="flex items-center gap-3 text-base-content/60">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary" />
                  <span>Dhaka, Bangladesh</span>
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
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base-content/70 hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Support
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base-content/70 hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Stay Connected
              </h3>
              <p className="text-base-content/70 mb-4 text-sm">
                Subscribe to get updates on new features and inspiring lessons.
              </p>

              <div className="flex gap-2 mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered input-sm flex-1"
                />
                <button className="btn btn-primary btn-sm">Subscribe</button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-circle btn-sm btn-outline hover:btn-primary"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-base-content/60 text-sm text-center md:text-left">
                <p>
                  © {currentYear} Digital Life Lessons. All rights reserved.
                </p>
                <p className="mt-1">
                  Made with{' '}
                  <FaHeart className="inline w-4 h-4 text-red-500 mx-1" /> for
                  sharing wisdom and growth.
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  Terms
                </Link>
                <Link
                  to="/cookies"
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 btn btn-primary btn-circle shadow-lg z-50"
        title="Back to top"
      >
        ↑
      </motion.button>
    </footer>
  );
};

export default Footer;
