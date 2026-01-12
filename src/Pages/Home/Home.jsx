import React from 'react';
import Banner from './HomePageUI/Banner';
import FeaturedLessons from './HomePageUI/FeaturedLessons';
import WhyLearningMatters from './HomePageUI/WhyLearningMatters';
import Features from './HomePageUI/Features';
import Categories from './HomePageUI/Categories';
import Statistics from './HomePageUI/Statistics';
import TopContributors from './HomePageUI/TopContributors';
import MostSavedLessons from './HomePageUI/MostSavedLessons';
import Testimonials from './HomePageUI/Testimonials';
import Newsletter from './HomePageUI/Newsletter';
import FAQ from './HomePageUI/FAQ';
import CallToAction from './HomePageUI/CallToAction';
import DemoAccess from './HomePageUI/DemoAccess';

const Home = () => {
  return (
    <div>
      {/* 1. Hero Banner / Slider */}
      <Banner />

      {/* 2. Featured Lessons */}
      <FeaturedLessons />

      {/* 3. Why Learning Matters */}
      <WhyLearningMatters />

      {/* 4. Features Section */}
      <Features />

      {/* 5. Categories */}
      <Categories />

      {/* 6. Statistics */}
      <Statistics />

      {/* 7. Top Contributors */}
      <TopContributors />

      {/* 8. Most Saved Lessons */}
      <MostSavedLessons />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Demo Access */}
      <DemoAccess />

      {/* 11. Newsletter */}
      <Newsletter />

      {/* 12. FAQ */}
      <FAQ />

      {/* 13. Call to Action */}
      <CallToAction />
    </div>
  );
};

export default Home;
