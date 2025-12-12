import React from 'react';
import Banner from './HomePageUI/Banner';
import FeaturedLessons from './HomePageUI/FeaturedLessons';
import WhyLearningMatters from './HomePageUI/WhyLearningMatters';
import TopContributors from './HomePageUI/TopContributors';
import MostSavedLessons from './HomePageUI/MostSavedLessons';

const Home = () => {
  return (
    <div>
      {/* Hero Banner / Slider */}
      <Banner />
      
      {/* Featured Life Lessons Section (Dynamic - controlled from admin dashboard) */}
      <FeaturedLessons />
      
      {/* Why Learning From Life Matters section (4 benefit cards) (static) */}
      <WhyLearningMatters />
      
      {/* Top Contributors of the Week (Dynamic) */}
      <TopContributors />
      
      {/* Most Saved Lessons (Dynamic) */}
      <MostSavedLessons />
    </div>
  );
};

export default Home;
