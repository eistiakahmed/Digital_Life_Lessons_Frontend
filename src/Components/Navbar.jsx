import { Link, NavLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from './ThemeToggle';
import useAuth from '../hooks/useAuth';
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaBookOpen,
  FaPlus,
  FaHeart,
  FaCrown,
  FaShieldAlt,
  FaEnvelope,
  FaInfoCircle,
  FaChevronDown,
  FaBell,
  FaBlog,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, userDB, LogoutUser } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdmin = userDB?.role === 'admin';
  const isPremium = userDB?.isPremium;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await LogoutUser();
      toast.success('Logged out successfully');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Navigation links for logged out users (minimum 3)
  const publicLinks = [
    { to: '/', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    {
      to: '/public_lessons',
      label: 'Explore Lessons',
      icon: <FaBookOpen className="w-4 h-4" />,
    },
    {
      to: '/about',
      label: 'About',
      icon: <FaInfoCircle className="w-4 h-4" />,
    },
    {
      to: '/contact',
      label: 'Contact',
      icon: <FaEnvelope className="w-4 h-4" />,
    },
    { to: '/blog', label: 'Blogs', icon: <FaBlog className="w-4 h-4" /> },
  ];

  // Navigation links for logged in users (minimum 5)
  const privateLinks = [
    { to: '/', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    {
      to: '/public_lessons',
      label: 'Explore',
      icon: <FaBookOpen className="w-4 h-4" />,
    },
    {
      to: '/dashboard/add_lesson',
      label: 'Create',
      icon: <FaPlus className="w-4 h-4" />,
    },
    {
      to: '/dashboard/my_lessons',
      label: 'My Lessons',
      icon: <FaUser className="w-4 h-4" />,
    },
    {
      to: '/dashboard/favorites',
      label: 'Favorites',
      icon: <FaHeart className="w-4 h-4" />,
    },
    ...(isAdmin
      ? [
          {
            to: '/dashboard/admin',
            label: 'Admin',
            icon: <FaShieldAlt className="w-4 h-4" />,
            isAdmin: true,
          },
        ]
      : []),
    ...(!isPremium && !isAdmin
      ? [
          {
            to: '/pricing',
            label: 'Upgrade',
            icon: <FaCrown className="w-4 h-4" />,
            isPremium: true,
          },
        ]
      : []),
  ];

  const currentLinks = user ? privateLinks : publicLinks;

  const NavLinkComponent = ({
    to,
    label,
    icon,
    isAdmin: linkIsAdmin,
    isPremium: linkIsPremium,
    mobile = false,
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200
        ${mobile ? 'w-full justify-start' : ''}
        ${
          isActive
            ? linkIsAdmin
              ? 'bg-error/10 text-error border border-error/20'
              : linkIsPremium
              ? 'bg-warning/10 text-warning border border-warning/20'
              : 'bg-primary/10 text-primary border border-primary/20'
            : 'hover:bg-base-200 text-base-content hover:text-primary'
        }
      `}
      onClick={() => mobile && setIsMobileMenuOpen(false)}
    >
      {icon}
      <span className={mobile ? '' : 'hidden xl:inline'}>{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Full-width sticky navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? ' bg-base-100/95 backdrop-blur-lg shadow-lg '
              : ' bg-base-100/90 backdrop-blur-sm'
          }
        `}
      >
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between h-20 rounded-4xl">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0"
            >
              <Link to="/" className="flex items-center">
                <Logo />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {currentLinks.map((link, index) => (
                <NavLinkComponent key={index} {...link} />
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {user ? (
                <>
                  {/* Notifications (placeholder) */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-ghost btn-circle hidden sm:flex"
                    aria-label="Notifications"
                  >
                    <FaBell className="w-5 h-5" />
                  </motion.button>

                  {/* Advanced Profile Dropdown */}
                  <div className="dropdown dropdown-end">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      tabIndex={0}
                      role="button"
                      className="flex items-center gap-2 p-1 rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
                    >
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring-2 ring-primary/20">
                          <img
                            src={
                              user.photoURL ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.displayName || 'User'
                              )}&background=4F46E5&color=fff`
                            }
                            alt={user.displayName || 'User'}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-base-content truncate max-w-24">
                          {user.displayName || 'User'}
                        </div>
                        <div className="text-xs text-base-content/60">
                          {isPremium ? 'Premium' : isAdmin ? 'Admin' : 'Free'}
                        </div>
                      </div>
                      <FaChevronDown className="w-3 h-3 text-base-content/60 hidden sm:block" />
                    </motion.div>

                    {/* Advanced Dropdown Menu */}
                    <ul className="dropdown-content menu bg-base-100 rounded-2xl shadow-md border border-base-300/50 w-90 p-4 mt-2">
                      {/* User Info Header */}
                      <li className="mb-3 p-3 bg-base-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full">
                              <img
                                src={
                                  user.photoURL ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.displayName || 'User'
                                  )}&background=4F46E5&color=fff`
                                }
                                alt={user.displayName || 'User'}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base-content">
                              {user.displayName || 'User'}
                            </div>
                            <div className="text-sm text-base-content/60 truncate">
                              {user.email}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {isPremium && (
                                <span className="badge badge-warning badge-xs gap-1">
                                  <FaCrown className="w-2 h-2" />
                                  Premium
                                </span>
                              )}
                              {isAdmin && (
                                <span className="badge badge-error badge-xs gap-1">
                                  <FaShieldAlt className="w-2 h-2" />
                                  Admin
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Menu Items */}
                      <li>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                        >
                          <FaTachometerAlt className="w-4 h-4 text-primary" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                        >
                          <FaUser className="w-4 h-4 text-secondary" />
                          <span>Profile Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/favorites"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                        >
                          <FaHeart className="w-4 h-4 text-error" />
                          <span>Favorites</span>
                        </Link>
                      </li>

                      {isAdmin && (
                        <li>
                          <Link
                            to="/dashboard/admin"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error"
                          >
                            <FaShieldAlt className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </li>
                      )}

                      {!isPremium && !isAdmin && (
                        <li>
                          <Link
                            to="/pricing"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-warning/10 text-warning"
                          >
                            <FaCrown className="w-4 h-4" />
                            <span>Upgrade to Premium</span>
                          </Link>
                        </li>
                      )}

                      <div className="divider my-2"></div>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error w-full"
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                /* Auth buttons for logged out users */
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn btn-primary btn-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-secondary btn-sm">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-ghost btn-circle lg:hidden"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-base-100 border-t border-base-300/50"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="space-y-2">
                  {currentLinks.map((link, index) => (
                    <NavLinkComponent key={index} {...link} mobile />
                  ))}

                  {!user && (
                    <div className="pt-4 border-t border-base-300 mt-4 space-y-2">
                      <Link
                        to="/login"
                        className="btn btn-ghost w-full justify-start"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-primary w-full justify-start"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
