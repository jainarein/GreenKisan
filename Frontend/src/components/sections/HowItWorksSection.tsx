import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Satellite, BrainCircuit, ScanLine, Activity, BarChart4, Network, Handshake } from 'lucide-react';

const steps = [
    {
        icon: <Satellite size={32} className="text-primary" />,
        title: "1. Satellite Imagery",
        desc: "Sentinel-2 & Landsat data capture multi-spectral imagery of farming regions in real-time."
    },
    {
        icon: <BrainCircuit size={32} className="text-accent-green" />,
        title: "2. CNN Detection",
        desc: "Convolutional Neural Networks segment fields and identify exact crop residue density."
    },
    {
        icon: <ScanLine size={32} className="text-primary" />,
        title: "3. Biomass Quantification",
        desc: "Convert visual residue data into precise metric tons per hectare mapping."
    },
    {
        icon: <Activity size={32} className="text-accent-green" />,
        title: "4. LSTM Prediction",
        desc: "Time-series forecasting predicts harvest timelines and potential burning risks."
    },
    {
        icon: <BarChart4 size={32} className="text-primary" />,
        title: "5. AQI Impact Analysis",
        desc: "Calculate preventative impact on Air Quality Index if biomass is recovered instead of burned."
    },
    {
        icon: <Network size={32} className="text-accent-green" />,
        title: "6. XGBoost Pricing",
        desc: "Dynamic pricing models calculate transport logistics and fair market value."
    },
    {
        icon: <Handshake size={32} className="text-primary" />,
        title: "7. Buyer Matching",
        desc: "Automated smart contracts connect farmers with bio-energy and pellet manufacturers."
    }
];

const HowItWorksSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-32 relative bg-background overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-accent-green/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold font-display mb-6"
                    >
                        The <span className="text-gradient">Intelligence Pipeline</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        A fully autonomous system bridging the gap between space observation and ground-level clean energy production.
                    </motion.p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 transform -translate-x-1/2 rounded-full hidden md:block">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-primary via-accent-green to-primary rounded-full shadow-glow-primary"
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={index} className={`flex flex-col md:flex-row items-start md:items-center relative ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Content Box */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                                    >
                                        <div className={`glass-panel p-8 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500`}
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-green scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-wide">{step.title}</h3>
                                            <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
                                        </div>
                                    </motion.div>

                                    {/* Core Icon Node */}
                                    <div className="absolute left-[11px] md:left-1/2 top-4 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5 }}
                                            className="w-14 h-14 rounded-full bg-background border-2 border-primary shadow-glow-primary flex items-center justify-center relative"
                                        >
                                            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"></div>
                                            {step.icon}
                                        </motion.div>
                                    </div>

                                    <div className="hidden md:block w-[45%]"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
