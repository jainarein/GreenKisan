import { Link, useLocation } from 'react-router-dom';
import { Home, LineChart, Handshake, UserCircle } from 'lucide-react';
import { useTranslation } from '../../i18n/context';

const BottomNav = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const navItems = [
        { name: t('nav.home'), path: '/', icon: <Home size={22} /> },
        { name: t('nav.market'), path: '/marketplace', icon: <Handshake size={22} /> },
        { name: t('nav.dashboard'), path: '/farmer-dashboard', icon: <LineChart size={22} /> },
        { name: t('nav.profile'), path: '#', icon: <UserCircle size={22} /> },
    ];

    if (location.pathname === '/' || location.pathname === '/signup') {
        return null; /* Hide on Login & Signup Pages */
    }

    return (
        <div className="absolute bottom-0 left-0 w-full h-[80px] bg-background/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 relative ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {/* Active Indicator Glow */}
                        {isActive && (
                            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary shadow-glow-primary rounded-full"></div>
                        )}

                        <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                            {item.icon}
                        </div>

                        <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                            {item.name}
                        </span>
                    </Link>
                )
            })}
        </div>
    );
};

export default BottomNav;
