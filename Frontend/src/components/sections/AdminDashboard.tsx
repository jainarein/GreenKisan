import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, Users, Activity, Target } from 'lucide-react';

const regionPerformance = [
    { subject: 'Punjab', A: 120, fullMark: 150 },
    { subject: 'Haryana', A: 98, fullMark: 150 },
    { subject: 'UP', A: 86, fullMark: 150 },
    { subject: 'Delhi', A: 45, fullMark: 150 },
    { subject: 'Rajasthan', A: 65, fullMark: 150 },
];

const transactionTrends = [
    { day: 'Mon', volume: 45 },
    { day: 'Tue', volume: 52 },
    { day: 'Wed', volume: 38 },
    { day: 'Thu', volume: 65 },
    { day: 'Fri', volume: 89 },
    { day: 'Sat', volume: 110 },
    { day: 'Sun', volume: 95 },
];

const AdminDashboard: React.FC = () => {
    return (
        <div className="w-full flex-col flex gap-8">

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Farmers", value: "15,234", icon: <Users />, color: "text-primary" },
                    { label: "Total Matches Made", value: "8,942", icon: <Activity />, color: "text-accent-green" },
                    { label: "AI Confidence Avg", value: "98.4%", icon: <Target />, color: "text-primary" },
                    { label: "System Uptime", value: "99.99%", icon: <Shield />, color: "text-accent-green" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel p-6 flex items-center justify-between group overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-[20px] -mr-8 -mt-8 pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold font-display text-white">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Radar Chart (Regional Heatmap Alternative) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6 lg:col-span-1"
                >
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Regional Adoption Heatmap</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={regionPerformance}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Adoption" dataKey="A" stroke="#00f2fe" fill="#00f2fe" fillOpacity={0.3} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0f16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#00f2fe' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Transaction Trends */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6 lg:col-span-2"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-lg font-bold text-white">Daily Marketplace Transactions</h3>
                        <span className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-lg border border-white/10">This Week</span>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={transactionTrends} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0f16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Line type="monotone" dataKey="volume" stroke="#00ff87" strokeWidth={3} dot={{ r: 4, fill: '#0a0f16', stroke: '#00ff87', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#00ff87', stroke: '#0a0f16', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

            </div>

        </div>
    );
};

export default AdminDashboard;
