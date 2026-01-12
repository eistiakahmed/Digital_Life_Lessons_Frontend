import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaHeart, 
  FaUsers, 
  FaLightbulb, 
  FaRocket,
  FaGlobe,
  FaHandshake,
  FaStar,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaEnvelope
} from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Passionate about helping people share their life experiences and learn from each other.',
      image:
        'https://i.ibb.co.com/9kHpfRjS/From-Klick-Pin-CF-Nailed-it-Professional-profile-pictures-Guy-pictures-Man-photo.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@digitallifelessons.com',
      },
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Building technology that connects people through meaningful stories and experiences.',
      image:
        'https://i.ibb.co.com/3YFRdDJS/From-Klick-Pin-CF-portrait-LINKEDIN-Corporate-headshot-poses-Headshots-professional-Corporate-portr.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@digitallifelessons.com',
      },
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Community',
      bio: 'Fostering a supportive environment where everyone feels safe to share their journey.',
      image:
        'https://i.ibb.co.com/BHS1BDtJ/From-Klick-Pin-CF-Pin-de-K-bra-Akak-e-em-A-ART-Beleza-de-mulher-Mulher-Beleza.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@digitallifelessons.com',
      },
    },
  ];

  const values = [
    {
      icon: <FaHeart className="w-8 h-8 text-error" />,
      title: "Authenticity",
      description: "We believe in the power of genuine, heartfelt stories that come from real life experiences."
    },
    {
      icon: <FaUsers className="w-8 h-8 text-primary" />,
      title: "Community",
      description: "Building a supportive community where everyone can learn, grow, and connect with others."
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-warning" />,
      title: "Growth",
      description: "Empowering personal development through shared wisdom and continuous learning."
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-success" />,
      title: "Respect",
      description: "Creating a safe space where all perspectives are valued and respected."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Life Lessons Shared" },
    { number: "5,000+", label: "Active Users" },
    { number: "50+", label: "Countries Reached" },
    { number: "95%", label: "User Satisfaction" }
  ];

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
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaHeart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-base-content mb-6">
              About Digital Life Lessons
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to create a world where everyone can learn from each other's 
              experiences, grow together, and build meaningful connections through shared wisdom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-base-content mb-6">Our Story</h2>
                <div className="space-y-4 text-base-content/80 leading-relaxed">
                  <p>
                    Digital Life Lessons was born from a simple observation: everyone has valuable 
                    experiences and insights that could help others navigate similar challenges.
                  </p>
                  <p>
                    Founded in 2024, we started as a small project to help people document and 
                    share their personal growth journeys. What began as a simple idea has grown 
                    into a thriving community of learners, storytellers, and wisdom seekers.
                  </p>
                  <p>
                    Today, we're proud to be a platform where authentic stories create real impact, 
                    where vulnerability is met with support, and where every lesson shared has the 
                    potential to change someone's life.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 text-center">
                  <FaQuoteLeft className="w-12 h-12 text-primary mx-auto mb-4" />
                  <blockquote className="text-lg font-medium text-base-content mb-4">
                    "Every person you meet has something valuable to teach you. 
                    We're just making it easier to learn from each other."
                  </blockquote>
                  <cite className="text-base-content/70">- Sarah Johnson, Founder</cite>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Our Values</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              These core values guide everything we do and shape the community we're building together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3">{value.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-base-content mb-4">Our Impact</h2>
              <p className="text-lg text-base-content/70">
                Together, we're building something meaningful
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-base-content/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Meet Our Team</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              The passionate people behind Digital Life Lessons, working to make wisdom sharing accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/20"
                />
                <h3 className="text-xl font-bold text-base-content mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-base-content/70 text-sm leading-relaxed mb-4">{member.bio}</p>
                
                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.linkedin}
                    className="btn btn-circle btn-sm btn-outline hover:btn-primary"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="btn btn-circle btn-sm btn-outline hover:btn-primary"
                    aria-label={`${member.name} Twitter`}
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="btn btn-circle btn-sm btn-outline hover:btn-primary"
                    aria-label={`Email ${member.name}`}
                  >
                    <FaEnvelope className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 rounded-3xl shadow-xl p-8 lg:p-12 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
              Join our community of storytellers and wisdom seekers. Your experiences could be 
              exactly what someone else needs to hear today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary btn-lg gap-2">
                <FaUsers className="w-5 h-5" />
                Join Our Community
              </Link>
              <Link to="/public_lessons" className="btn btn-outline btn-lg gap-2">
                <FaGlobe className="w-5 h-5" />
                Explore Lessons
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;