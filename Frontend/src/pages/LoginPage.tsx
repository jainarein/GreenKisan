import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/context';
import LanguageSwitcher from '../components/shared/LanguageSwitcher';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/farmer-dashboard');
        }, 1500);
    };

    return (
        <div className="w-full min-h-full flex flex-col relative px-6 py-8 justify-center overflow-hidden">
            <LanguageSwitcher />

            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-20%] w-[300px] h-[300px] bg-accent-green/10 blur-[100px] rounded-full animate-blob"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-full z-10 pt-10"
            >
                {/* Logo */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent-green p-0.5 shadow-glow-primary mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl animate-pulse"></div>
                    <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center relative z-10">
                        <Leaf className="text-primary" size={40} />
                    </div>
                </div>

                {/* Text */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">
                        {t('login.title')}
                    </h1>
                    <p className="text-gray-400 text-sm">{t('login.subtitle')}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-500 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder={t('login.email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-primary/5 transition-all shadow-organic"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-500 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="password"
                            placeholder={t('login.password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-primary/5 transition-all shadow-organic"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-primary to-accent-green text-[#F4F1EA] font-bold text-base shadow-glow-primary hover:shadow-glow-green transition-all relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {t('login.submit')} <ArrowRight size={18} />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>

                <div className="mt-8 text-sm text-gray-400">
                    {t('login.signup.prompt')}{' '}
                    <Link to="/signup" className="text-accent-green font-medium hover:text-white transition-colors">
                        {t('login.signup.link')}
                    </Link>
                </div>

            </motion.div>
        </div>
    );
};

export default LoginPage;
