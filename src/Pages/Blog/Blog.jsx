import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaTag,
  FaHeart,
  FaComment,
  FaShare,
  FaChartLine,
  FaBookOpen,
  FaLightbulb,
  FaRocket,
} from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'personal-growth', name: 'Personal Growth', count: 8 },
    { id: 'career', name: 'Career Tips', count: 6 },
    { id: 'relationships', name: 'Relationships', count: 5 },
    { id: 'mindset', name: 'Mindset', count: 3 },
    { id: 'community', name: 'Community', count: 2 },
  ];

  const featuredPost = {
    id: 1,
    title:
      'The Power of Vulnerability: How Sharing Your Struggles Can Transform Lives',
    excerpt:
      'Discover why opening up about our challenges creates deeper connections and accelerates personal growth for both the storyteller and the listener.',
    content:
      "In a world that often celebrates perfection and success stories, there's immense power in sharing our vulnerabilities...",
    author: {
      name: 'Sarah Johnson',
      avatar:
        'https://i.ibb.co.com/3YFRdDJS/From-Klick-Pin-CF-portrait-LINKEDIN-Corporate-headshot-poses-Headshots-professional-Corporate-portr.jpg',
      role: 'Community Manager',
    },
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Personal Growth',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    likes: 156,
    comments: 23,
    featured: true,
  };

  const blogPosts = [
    {
      id: 2,
      title: '5 Lessons I Learned from My Biggest Career Mistake',
      excerpt:
        "Sometimes our greatest failures become our most valuable teachers. Here's what I discovered when I took the wrong job.",
      author: {
        name: 'Michael Chen',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'Career Coach',
      },
      publishedAt: '2024-01-12',
      readTime: '6 min read',
      category: 'Career Tips',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      likes: 89,
      comments: 15,
    },
    {
      id: 3,
      title: 'Building Authentic Relationships in a Digital World',
      excerpt:
        'How to create meaningful connections when most of our interactions happen through screens.',
      author: {
        name: 'Emily Rodriguez',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        role: 'Relationship Expert',
      },
      publishedAt: '2024-01-10',
      readTime: '7 min read',
      category: 'Relationships',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      likes: 124,
      comments: 31,
    },
    {
      id: 4,
      title: 'The Growth Mindset: Turning Setbacks into Comebacks',
      excerpt:
        'Learn how to reframe challenges as opportunities and develop resilience that lasts.',
      author: {
        name: 'David Park',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        role: 'Mindset Coach',
      },
      publishedAt: '2024-01-08',
      readTime: '5 min read',
      category: 'Mindset',
      image:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      likes: 67,
      comments: 12,
    },
    {
      id: 5,
      title: 'Creating a Supportive Community: Lessons from Our Platform',
      excerpt:
        "What we've learned about fostering genuine connections and mutual support online.",
      author: {
        name: 'Lisa Thompson',
        avatar:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
        role: 'Community Lead',
      },
      publishedAt: '2024-01-05',
      readTime: '9 min read',
      category: 'Community',
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop',
      likes: 203,
      comments: 45,
    },
    
    {
      id: 6,
      title: 'Navigating Career Transitions: A Step-by-Step Guide',
      excerpt:
        "Practical advice for making successful career changes, from someone who's done it three times.",
      author: {
        name: 'Rachel Green',
        avatar:
          'https://i.ibb.co.com/XZ0mBcZ0/From-Klick-Pin-CF-I-will-do-corporate-headshot-editing-portrait-retouching-photo-background-editing.jpg',
        role: 'Career Strategist',
      },
      publishedAt: '2024-01-01',
      readTime: '10 min read',
      category: 'Career Tips',
      image:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
      likes: 145,
      comments: 27,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      post.category.toLowerCase().replace(' ', '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const BlogCard = ({ post, featured = false }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className={`bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`${featured ? 'lg:flex' : ''}`}>
        <div className={`${featured ? 'lg:w-1/2' : ''}`}>
          <img
            src={post.image}
            alt={post.title}
            className={`w-full object-cover ${
              featured ? 'h-64 lg:h-full' : 'h-48'
            }`}
          />
        </div>

        <div className={`p-6 ${featured ? 'lg:w-1/2 lg:p-8' : ''}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="badge badge-primary badge-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <FaCalendarAlt className="w-3 h-3" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <FaClock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>

          <h2
            className={`font-bold mb-3 line-clamp-2 hover:text-primary transition-colors ${
              featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
          >
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </h2>

          <p
            className={`text-base-content/70 mb-4 line-clamp-3 ${
              featured ? 'text-lg' : ''
            }`}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">{post.author.name}</p>
                <p className="text-xs text-base-content/60">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-base-content/60">
              <div className="flex items-center gap-1">
                <FaHeart className="w-3 h-3" />
                {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <FaComment className="w-3 h-3" />
                {post.comments}
              </div>
            </div>
          </div>

          <Link
            to={`/blog/${post.id}`}
            className="btn btn-primary btn-sm mt-4 gap-2"
          >
            Read More <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );

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
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Life Lessons Blog
            </h1>
            <p className="text-xl lg:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
              Insights, stories, and practical wisdom from our community and
              experts. Discover new perspectives and actionable advice for your
              personal growth journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn btn-sm ${
                    selectedCategory === category.id
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaChartLine className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            <BlogCard post={featuredPost} featured={true} />
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaBookOpen className="w-5 h-5 text-secondary" />
              <h2 className="text-2xl font-bold">Latest Articles</h2>
            </div>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaSearch className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-base-content/70">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12 text-center"
          >
            <FaRocket className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
              Get the latest articles, insights, and community highlights
              delivered straight to your inbox. No spam, just valuable content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1"
              />
              <button className="btn btn-primary gap-2">
                <FaArrowRight className="w-4 h-4" />
                Subscribe
              </button>
            </div>

            <p className="text-sm text-base-content/60 mt-4">
              Join 5,000+ subscribers who get weekly insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-lg text-base-content/70">
              Dive deeper into topics that matter most to you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-base-100 rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <FaTag className="w-6 h-6 text-primary" />
                  <span className="badge badge-primary">
                    {category.count} articles
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-base-content/70 text-sm">
                  Discover insights and practical advice in{' '}
                  {category.name.toLowerCase()}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
