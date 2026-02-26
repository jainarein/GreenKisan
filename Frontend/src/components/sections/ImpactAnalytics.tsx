import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Zap, Factory } from 'lucide-react';

const aqiData = [
    { month: 'Sep', before: 180, predicted: 150 },
    { month: 'Oct', before: 320, predicted: 190 },
    { month: 'Nov', before: 450, predicted: 220 },
    { month: 'Dec', before: 380, predicted: 180 },
    { month: 'Jan', before: 210, predicted: 140 },
];

const energyData = [
    { region: 'Punjab', pellets: 45, bioPower: 120 },
    { region: 'Haryana', pellets: 30, bioPower: 85 },
    { region: 'UP', pellets: 65, bioPower: 140 },
];

const ImpactAnalytics: React.FC = () => {
    return (
        <section className="py-24 relative bg-background">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30">
                            <Wind className="text-primary" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-display">Macro <span className="text-gradient">Impact Analytics</span></h2>
                        </div>
                    </motion.div>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Real-time tracking of avoided CO2 emissions, improved air quality indices, and clean energy conversion outputs across Northern India.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* AQI Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-6 lg:p-8"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Air Quality Index Improvement</h3>
                                <p className="text-sm text-gray-400">Historical vs AI Predicted Avoidance</p>
                            </div>
                            <div className="px-3 py-1 bg-accent-green/20 text-accent-green text-xs font-bold rounded flex items-center gap-1">
                                -42% Peak Drop
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={aqiData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                                    <YAxis stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0f16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    />
                                    <Line type="monotone" dataKey="before" name="Without Intervention" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                    <Line type="monotone" dataKey="predicted" name="With BioSphere" stroke="#00f2fe" strokeWidth={3} activeDot={{ r: 8, fill: '#00f2fe', stroke: '#0a0f16', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Energy Generated Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel p-6 lg:p-8"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 text-gradient">Clean Energy Conversion</h3>
                                <p className="text-sm text-gray-400">Biomass to Power & Pellets (in MegaWatts)</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center border border-accent-green/30">
                                <Zap size={16} className="text-accent-green" />
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={energyData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="region" stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                                    <YAxis stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0f16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    />
                                    <Bar dataKey="pellets" name="Bio-Pellets" stackId="a" fill="#00ff87" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="bioPower" name="Direct Co-firing (MW)" stackId="a" fill="#00f2fe" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                </div>

                {/* Real-time Ticker */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="w-full glass-panel p-1 rounded-2xl overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent-green/10 to-primary/10 animate-[pulse_4s_linear_infinite]"></div>

                    <div className="bg-background/90 rounded-xl p-8 flex flex-col md:flex-row justify-around items-center divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
                        <div className="px-6 py-4 text-center basis-1/3">
                            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2"><Factory size={14} /> Total Stubble Saved</p>
                            <h4 className="text-4xl md:text-5xl font-display font-bold text-white">4.2<span className="text-primary text-2xl">M tons</span></h4>
                        </div>

                        <div className="px-6 py-4 text-center basis-1/3">
                            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2"><Wind size={14} /> Prevented PM2.5</p>
                            <h4 className="text-4xl md:text-5xl font-display font-bold text-white">18.5<span className="text-accent-green text-2xl">K tons</span></h4>
                        </div>

                        <div className="px-6 py-4 text-center basis-1/3">
                            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2"><Zap size={14} /> Value Created</p>
                            <h4 className="text-4xl md:text-5xl font-display font-bold text-white">₹7.8<span className="text-primary text-2xl">Cr+</span></h4>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ImpactAnalytics;
