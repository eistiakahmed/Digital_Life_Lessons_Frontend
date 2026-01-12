import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaQuoteLeft, 
  FaChevronLeft, 
  FaChevronRight,
  FaHeart,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Life Coach & Entrepreneur",
      location: "San Francisco, CA",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff&size=200",
      rating: 5,
      text: "Digital Life Lessons has transformed how I approach personal growth. The community is incredibly supportive, and I've learned more in 6 months than I did in years of self-help books. The premium content is absolutely worth it!",
      highlight: "Transformed my approach to growth",
      isPremium: true,
      joinedDate: "2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      location: "Toronto, Canada",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=10B981&color=fff&size=200",
      rating: 5,
      text: "As someone who struggles with work-life balance, this platform has been a game-changer. The lessons from other professionals facing similar challenges have given me practical strategies that actually work.",
      highlight: "Game-changer for work-life balance",
      isPremium: false,
      joinedDate: "2024"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Teacher & Mother",
      location: "Austin, TX",
      avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=F59E0B&color=fff&size=200",
      rating: 5,
      text: "The parenting lessons shared here are pure gold. Real parents sharing real experiences - not just theory. My relationship with my teenagers has improved dramatically thanks to the wisdom I've found here.",
      highlight: "Improved family relationships",
      isPremium: true,
      joinedDate: "2023"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Recent Graduate",
      location: "Seoul, South Korea",
      avatar: "https://ui-avatars.com/api/?name=David+Kim&background=8B5CF6&color=fff&size=200",
      rating: 5,
      text: "Starting my career felt overwhelming until I found this community. The career transition lessons and mentorship opportunities have been invaluable. I landed my dream job thanks to insights I gained here!",
      highlight: "Landed dream job with community help",
      isPremium: false,
      joinedDate: "2024"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Wellness Coach",
      location: "London, UK",
      avatar: "https://ui-avatars.com/api/?name=Lisa+Thompson&background=EF4444&color=fff&size=200",
      rating: 5,
      text: "The depth of wisdom shared here is incredible. I've been able to help my clients more effectively by incorporating lessons I've learned from this amazing community. It's like having access to thousands of mentors.",
      highlight: "Enhanced my coaching practice",
      isPremium: true,
      joinedDate: "2023"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Retired Executive",
      location: "Melbourne, Australia",
      avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=06B6D4&color=fff&size=200",
      rating: 5,
      text: "After 40 years in corporate, I thought I knew it all. This platform showed me there's always more to learn. The intergenerational wisdom exchange here is beautiful - I learn from 20-somethings and share with them too.",
      highlight: "Beautiful intergenerational learning",
      isPremium: true,
      joinedDate: "2023"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className="py-20 bg-base-200" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaHeart className="w-4 h-4" />
            Community Love
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            What Our Community
            <span className="text-primary"> Says</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Real stories from real people who have transformed their lives through 
            shared wisdom and meaningful connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Testimonial */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="bg-base-100 rounded-3xl p-8 lg:p-10 shadow-2xl border border-base-300/50 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <FaQuoteLeft className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                  ))}
                  <span className="ml-2 text-sm text-base-content/60">
                    {currentTestimonial.rating}.0 out of 5
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-base-content leading-relaxed mb-6">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Highlight */}
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-3 rounded-r-lg mb-6">
                  <p className="text-primary font-semibold text-sm">
                    "{currentTestimonial.highlight}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-base-content">
                        {currentTestimonial.name}
                      </h4>
                      {currentTestimonial.isPremium && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <FaStar className="w-3 h-3" />
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-base-content/70 text-sm">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-base-content/60 text-xs">
                      {currentTestimonial.location} • Member since {currentTestimonial.joinedDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-primary scale-125' 
                        : 'bg-base-content/20 hover:bg-base-content/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="btn btn-circle btn-outline btn-sm"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="btn btn-circle btn-outline btn-sm"
                >
                  <FaChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Testimonial Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveTestimonial(index)}
                  className={`
                    bg-base-100 rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2
                    ${activeTestimonial === index 
                      ? 'border-primary shadow-lg' 
                      : 'border-transparent hover:border-primary/30 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h5 className="font-semibold text-sm text-base-content truncate">
                          {testimonial.name}
                        </h5>
                        {testimonial.isPremium && (
                          <FaStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-base-content/60 truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3 text-yellow-500" />
                    ))}
                  </div>
                  
                  <p className="text-xs text-base-content/70 line-clamp-3">
                    {testimonial.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 bg-base-100 rounded-2xl p-6 border border-base-300/50"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">4.9★</div>
                  <div className="text-xs text-base-content/60">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary mb-1">2.5K+</div>
                  <div className="text-xs text-base-content/60">Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">98%</div>
                  <div className="text-xs text-base-content/60">Recommend</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-base-content mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Join thousands of learners who are already transforming their lives. 
              Your journey to growth and wisdom starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg gap-2"
              >
                <FaUsers className="w-5 h-5" />
                Join Our Community
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-lg gap-2"
              >
                <FaCheckCircle className="w-5 h-5" />
                Read More Reviews
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;