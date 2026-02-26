import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ImpactAnalytics from '../components/sections/ImpactAnalytics';
import LogisticsTracking from '../components/sections/LogisticsTracking';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col w-full">
            <HeroSection />
            <HowItWorksSection />
            <LogisticsTracking />
            <ImpactAnalytics />
        </div>
    );
};

export default Home;
