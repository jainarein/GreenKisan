import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, PackageCheck, Route } from 'lucide-react';

const LogisticsTracking: React.FC = () => {
    return (
        <section className="py-24 relative bg-background overflow-hidden border-t border-white/5">

            {/* Background aesthetic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6 shadow-glow-primary"
                    >
                        <Route className="text-primary" size={32} />
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Autonomous <span className="text-gradient">Logistics Engine</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Once a match is confirmed, our routing algorithm dispatches verified transporters, generating real-time ETAs and route optimizations.
                    </p>
                </div>

                <div className="glass-panel p-8 max-w-5xl mx-auto relative overflow-hidden">

                    {/* Active Status Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center border border-accent-green animate-pulse">
                                <Truck className="text-accent-green" size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Shipment #BS-8492-X</h3>
                                <p className="text-sm text-gray-400">Status: <span className="text-accent-green">In Transit</span></p>
                            </div>
                        </div>

                        <div className="flex gap-8 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1 tracking-wider uppercase text-xs">Origin</p>
                                <p className="text-white font-medium">Sangrur, Punjab</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1 tracking-wider uppercase text-xs">Destination</p>
                                <p className="text-white font-medium">Ropar Power Plant</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 mb-1 tracking-wider uppercase text-xs">ETA</p>
                                <p className="text-primary font-bold font-display text-lg">2h 15m</p>
                            </div>
                        </div>
                    </div>

                    {/* Animated Map Route */}
                    <div className="relative h-[200px] w-full bg-background/50 rounded-xl border border-white/5 overflow-hidden flex items-center mb-12">
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-0 pt-4">
                            {/* Dashed background path */}
                            <path
                                d="M 50 100 Q 250 20 450 100 T 950 100"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="4"
                                strokeDasharray="10 10"
                            />

                            {/* Animated progress line */}
                            <motion.path
                                d="M 50 100 Q 250 20 450 100 T 950 100"
                                fill="none"
                                stroke="#00f2fe"
                                strokeWidth="4"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 0.6 }} // stops at 60%
                                viewport={{ once: true }}
                                transition={{ duration: 3, ease: "easeOut" }}
                                style={{ filter: "drop-shadow(0 0 8px rgba(0, 242, 254, 0.8))" }}
                            />

                            {/* Animated Truck Icon running along a custom path by translation (Simplified via Framer Motion x positioning) */}
                        </svg>

                        {/* Origin Marker */}
                        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] mb-2 relative z-10" />
                            <MapPin size={24} className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                        </div>

                        {/* Destination Marker */}
                        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-accent-green shadow-glow-green mb-2 relative z-10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <PackageCheck size={28} className="text-accent-green" />
                        </div>

                        {/* Moving Truck along horizontal line */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-[calc(50%+20px)] flex flex-col items-center"
                            initial={{ left: "5%" }}
                            whileInView={{ left: "58%" }} // matches 60% path length approximately
                            viewport={{ once: true }}
                            transition={{ duration: 3, ease: "easeOut" }}
                        >
                            <div className="bg-background border border-primary px-3 py-1.5 rounded-lg shadow-glow-primary flex items-center gap-2 mb-2 relative group whitespace-nowrap">
                                <Truck className="text-primary" size={16} />
                                <span className="text-xs font-bold text-white">HR-55-XY-9021</span>
                                {/* Arrow pointing down to path */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-t-[8px] border-t-primary border-r-[6px] border-r-transparent"></div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-primary animate-ping opacity-75" />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-white/10">
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Driver</p>
                            <p className="text-white font-medium">Satnam Singh</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Vehicle Type</p>
                            <p className="text-white font-medium">Heavy Rigid (20t)</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Load Value</p>
                            <p className="text-white font-medium">14.2 Tons</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Emission Saved</p>
                            <p className="text-accent-green font-bold">2.1t CO₂</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LogisticsTracking;
