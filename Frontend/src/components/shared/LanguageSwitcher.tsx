import React from 'react';
import { useTranslation } from '../../i18n/context';
import { type Language } from '../../i18n/translations';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useTranslation();

    return (
        <div className="absolute top-4 right-4 z-50 flex items-center bg-background/80 backdrop-blur-md rounded-full border border-white/10 px-2 py-1 shadow-glass">
            <Globe size={14} className="text-gray-400 mr-2 ml-1" />
            {(['en', 'hi', 'pa'] as Language[]).map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === lang
                        ? 'bg-primary text-background shadow-glow-primary'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    {t(`dash.lang.${lang}`)}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
