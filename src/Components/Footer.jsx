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
    { name: 'About Us', path: '#' },
    { name: 'Contact', path: '#' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      url: '#',
      name: 'Facebook',
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: '#',
      name: 'Twitter',
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: '#',
      name: 'LinkedIn',
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: '#',
      name: 'Instagram',
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      url: '#',
      name: 'YouTube',
    },
  ];

  return (
    <footer className="bg-base-300 mt-16 rounded-4xl">
      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12"
          >
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-base-content/70 mb-6 leading-relaxed">
                Empowering people to share, learn, and grow through meaningful
                life lessons. Join our community of wisdom seekers and
                contributors.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-base-content/60">
                  <FaEnvelope className="w-4 h-4 text-primary" />
                  <span>contact@digitallifelessons.com</span>
                </div>
                <div className="flex items-center gap-3 text-base-content/60">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary" />
                  <span>Worldwide Community</span>
                </div>
              </div>
            </div>

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
            <div className="text-gray-500 text-sm text-center">
              <p>© {currentYear} Digital Life Lessons. All rights reserved.</p>
              
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
