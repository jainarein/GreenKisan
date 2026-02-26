import React from 'react';
import FarmerDashboard from '../components/sections/FarmerDashboard';
import LanguageSwitcher from '../components/shared/LanguageSwitcher';
import { useTranslation } from '../i18n/context';

const FarmerDashboardPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full min-h-full px-4 py-8 relative">
            <LanguageSwitcher />

            <div className="mb-6 pt-10">
                <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-wide">
                    Farmer <span className="text-gradient">{t('dash.title')}</span>
                </h1>
                <p className="text-gray-400 text-sm">{t('dash.subtitle')}</p>
            </div>

            <FarmerDashboard />
        </div>
    );
};

export default FarmerDashboardPage;
