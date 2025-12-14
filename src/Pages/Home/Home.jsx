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
      
      
      <FeaturedLessons />
      
      
      <WhyLearningMatters />
      
      
      <TopContributors />
      
      
      <MostSavedLessons />
    </div>
  );
};

export default Home;
