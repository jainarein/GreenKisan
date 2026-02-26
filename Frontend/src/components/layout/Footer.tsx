import React from 'react';
import { Leaf, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t border-white/10 glass-panel !rounded-none mt-auto">
            <div className="container mx-auto px-6 py-12 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-green p-0.5 shadow-glow-primary group-hover:shadow-glow-green transition-all duration-500">
                                <div className="w-full h-full bg-background rounded-[6px] flex items-center justify-center">
                                    <Leaf className="text-primary group-hover:text-accent-green transition-colors" size={16} />
                                </div>
                            </div>
                            <span className="font-display font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                BioSphere
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Turning Satellite Intelligence into Clean Air & Farmer Income via Geospatial AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Validation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Impact Reports</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Research Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} BioSphere Marketplace. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
