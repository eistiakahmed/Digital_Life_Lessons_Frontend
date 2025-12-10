import React from 'react';
import { FaLightbulb, FaUsers, FaHeart, FaChartLine } from 'react-icons/fa';

const WhyLearningMatters = () => {
  const benefits = [
    {
      icon: <FaLightbulb size={50} className="text-primary" />,
      title: 'Gain Wisdom',
      description:
        'Preserve personal insights and meaningful life lessons for continuous growth.',
    },
    {
      icon: <FaUsers size={50} className="text-primary" />,
      title: 'Build Connections',
      description:
        'Learn from the experiences of others and strengthen your community ties.',
    },
    {
      icon: <FaHeart size={50} className="text-primary" />,
      title: 'Self-Reflection',
      description:
        'Reflect on your own journey to understand patterns, emotions, and progress.',
    },
    {
      icon: <FaChartLine size={50} className="text-primary" />,
      title: 'Track Progress',
      description:
        'Monitor your learning journey and grow by exploring lessons from the community.',
    },
  ];

  return (
    <section className="py-16">
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold mb-2 text-base-content dark:text-secondary">
          Why Learning From Life Matters
        </h2>
        <p className="mb-12 text-base-content/70 dark:text-base-content/60 max-w-2xl mx-auto">
          Discover the benefits of reflecting on life lessons and learning from
          shared experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-[250px]">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-base-100 p-6 rounded-xl shadow-lg 
             hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 flex justify-center text-primary dark:text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {benefit.title}
              </h3>
              <p className="text-black dark:text-base-content/60 text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningMatters;
