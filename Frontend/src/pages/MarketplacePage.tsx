import React from 'react';
import BuyerMarketplace from '../components/sections/BuyerMarketplace';
import LanguageSwitcher from '../components/shared/LanguageSwitcher';

const MarketplacePage: React.FC = () => {
    return (
        <div className="w-full min-h-full px-4 py-8 relative">
            <LanguageSwitcher />

            <div className="mb-6 pt-10">
                <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-wide">
                    Biomass <span className="text-gradient">Market</span>
                </h1>
                <p className="text-gray-400 text-sm">Live bids & active buyers nearby.</p>
            </div>

            <BuyerMarketplace />
        </div>
    );
};

export default MarketplacePage;
