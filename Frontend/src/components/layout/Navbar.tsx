import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Farmer Dashboard', path: '/farmer-dashboard' },
        { name: 'Admin Node', path: '/admin' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel !rounded-none border-t-0 border-l-0 border-r-0 border-b-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-green p-0.5 shadow-glow-primary group-hover:shadow-glow-green transition-all duration-500">
                        <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                            <Leaf className="text-primary group-hover:text-accent-green transition-colors" size={20} />
                        </div>
                    </div>
                    <span className="font-display font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Bio<span className="text-primary">Sphere</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-300'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="px-5 py-2.5 rounded-full bg-primary/10 border border-primary text-primary font-medium hover:bg-primary hover:text-background hover:shadow-glow-primary transition-all duration-300">
                        Log In
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-300 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full glass-panel !rounded-none border-x-0 p-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-base font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-300'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="px-5 py-2.5 mt-4 rounded-full bg-primary/10 border border-primary text-primary font-medium w-full">
                        Log In
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
