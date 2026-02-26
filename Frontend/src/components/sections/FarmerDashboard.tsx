import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Map, Leaf, DollarSign, Sprout, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../../i18n/context';

const mockChartData = [
    { month: 'Jul', biomass: 1.2 },
    { month: 'Aug', biomass: 2.5 },
    { month: 'Sep', biomass: 4.8 },
    { month: 'Oct', biomass: 8.5 },
    { month: 'Nov', biomass: 12.4 },
    { month: 'Dec', biomass: 14.2 },
];

const FarmerDashboard: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full flex flex-col gap-4 pb-12">

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-4 flex items-center gap-3 relative overflow-hidden group rounded-2xl"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[30px] -mr-8 -mt-8 pointer-events-none"></div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-primary/50 shadow-glow-primary flex items-center justify-center p-0.5 flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Farmer" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">{t('dash.farmer')}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Map size={12} className="text-accent-green" /> {t('dash.location')}
                    </p>
                </div>
            </motion.div>

            {/* Primary Metrics Group */}
            <div className="grid grid-cols-2 gap-3">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-4 border-l-2 border-l-primary rounded-2xl"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                            <Leaf size={14} className="text-primary" />
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs mb-1 line-clamp-1">{t('dash.residue')}</p>
                    <h4 className="text-xl font-bold font-display text-white">14.2 <span className="text-xs text-gray-500 font-sans">t/ha</span></h4>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-4 border-l-2 border-l-accent-green rounded-2xl"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-6 h-6 rounded-md bg-accent-green/10 flex items-center justify-center">
                            <Map size={14} className="text-accent-green" />
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs mb-1 line-clamp-1">{t('dash.area')}</p>
                    <h4 className="text-xl font-bold font-display text-white">45.5 <span className="text-xs text-gray-500 font-sans">Acres</span></h4>
                </motion.div>
            </div>

            {/* Earnings Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel p-5 relative overflow-hidden rounded-2xl"
            >
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-accent-green/10 rounded-full blur-[30px] translate-y-8 translate-x-8"></div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-bold text-white">{t('dash.earnings')}</h3>
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <DollarSign size={12} className="text-accent-green" />
                    </div>
                </div>

                <h2 className="text-3xl font-display font-bold text-gradient mb-4">₹ 42,500</h2>

                <div className="flex flex-col gap-2">
                    <div className="w-full bg-background rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-primary to-accent-green h-1.5 rounded-full w-[75%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-gray-400">{t('dash.currentOutput')}</span>
                        <span className="text-accent-green">75%</span>
                    </div>
                </div>
            </motion.div>

            {/* Satellite View (Mobile Optimized) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-2 h-[220px] relative overflow-hidden border border-primary/20 rounded-2xl group shadow-organic"
            >
                <div className="absolute inset-0 bg-[#0B3D2E] bg-[radial-gradient(rgba(31,111,67,0.4)_1px,transparent_1px)] [background-size:12px_12px] opacity-80 z-0"></div>
                <div className="absolute left-0 top-0 w-full h-[1px] bg-accent-green shadow-glow-green z-20 animate-[slideDown_3s_ease-in-out_infinite_alternate]"></div>

                <div className="absolute inset-0 flex items-center justify-center z-10 p-3">
                    <div className="relative w-full h-full border border-primary/30 bg-primary/10 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center shadow-organic">
                        <svg className="absolute inset-0 w-full h-full opacity-40 drop-shadow-[0_0_8px_rgba(46,139,87,0.8)]" viewBox="0 0 400 300" preserveAspectRatio="none">
                            <path d="M50,50 L350,70 L380,250 L80,280 Z" fill="#1F6F43" stroke="#2E8B57" strokeWidth="2" />
                        </svg>
                        <div className="absolute top-[30%] left-[40%] w-20 h-20 bg-red-500/30 blur-xl rounded-full mix-blend-screen animate-pulse"></div>

                        <div className="absolute top-2 left-2 flex gap-1">
                            <span className="px-1.5 py-0.5 bg-background/80 backdrop-blur-md rounded border border-white/10 text-[8px] font-mono text-primary flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-500 animate-ping"></span> LIVE
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Status Warning System */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-4 flex items-center justify-between rounded-2xl border border-[#D97706]/20 bg-[#D97706]/5"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D97706]/10 flex items-center justify-center shadow-[0_0_10px_rgba(217,119,6,0.2)]">
                        <AlertTriangle size={16} className="text-[#D97706]" />
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-medium">{t('dash.risk.title')}</h4>
                        <p className="text-[10px] text-gray-400">{t('dash.risk.desc')}</p>
                    </div>
                </div>
                <button className="px-3 py-1.5 bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/50 text-xs font-bold rounded-lg hover:bg-[#D97706] hover:text-white transition-colors shadow-organic whitespace-nowrap">
                    {t('dash.sellNow')}
                </button>
            </motion.div>

            {/* Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass-panel p-4 rounded-2xl"
            >
                <div className="mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sprout size={14} className="text-accent-green" /> {t('dash.chartTitle')}
                    </h3>
                </div>

                <div className="h-[140px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBiomass" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2E8B57" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#1F6F43" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(244,241,234,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="rgba(244,241,234,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(244,241,234,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}t`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(11, 61, 46, 0.9)', borderColor: 'rgba(244,241,234,0.1)', borderRadius: '12px', fontSize: '12px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)' }}
                                itemStyle={{ color: '#2E8B57', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="biomass" stroke="#2E8B57" strokeWidth={3} fillOpacity={1} fill="url(#colorBiomass)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

        </div>
    );
};

export default FarmerDashboard;
