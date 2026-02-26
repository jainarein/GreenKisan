import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, DollarSign, Handshake, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { buyers, type Buyer } from '../../data/mockData';

const BuyerMarketplace: React.FC = () => {
    const [selectedBuyer, setSelectedBuyer] = useState<number | null>(null);
    const [isMatching, setIsMatching] = useState(false);
    const [matchSuccess, setMatchSuccess] = useState(false);

    const handleMatch = () => {
        setIsMatching(true);
        setTimeout(() => {
            setIsMatching(false);
            setMatchSuccess(true);
            setTimeout(() => {
                setMatchSuccess(false);
                setSelectedBuyer(null);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="w-full flex justify-center pb-20">
            <div className="w-full flex items-center justify-center">

                {/* Marketplace Cards Stacked Vertically */}
                <div className="flex flex-col gap-4 w-full">
                    {buyers.map((buyer: Buyer, index: number) => (
                        <motion.div
                            key={buyer.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-panel p-4 cursor-pointer relative overflow-hidden transition-all duration-300 rounded-2xl ${selectedBuyer === buyer.id ? 'border-primary shadow-glow-primary scale-[1.02]' : 'hover:border-white/20'
                                }`}
                            onClick={() => setSelectedBuyer(buyer.id)}
                        >

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center p-1">
                                        <Zap size={18} className={buyer.type === 'Bio-Power Plant' ? 'text-primary' : 'text-accent-green'} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white line-clamp-1">{buyer.name}</h3>
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 mt-1 inline-block">
                                            {buyer.type}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 mb-1 flex items-center gap-1"><DollarSign size={10} /> Price/Ton</span>
                                    <span className="text-base font-bold text-primary">₹ {buyer.pricePerTon}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 mb-1 flex items-center gap-1"><Package size={10} /> Req. Capacity</span>
                                    <span className="text-base font-bold text-white">{buyer.capacityRequired} t</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-white/5">
                                <span className="flex items-center gap-1"><MapPin size={12} className="text-accent-green" /> {buyer.distance} km away</span>
                                <span className="text-primary flex items-center">View <ChevronRight size={14} /></span>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Action Bottom Sheet Modal */}
                <AnimatePresence>
                    {selectedBuyer && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                onClick={() => !isMatching && !matchSuccess && setSelectedBuyer(null)}
                            />

                            {/* Bottom Sheet */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed bottom-[80px] left-0 right-0 w-full max-w-[430px] mx-auto bg-[#0B3D2E]/95 backdrop-blur-xl border-t border-x border-primary/20 p-6 z-50 rounded-t-3xl shadow-organic"
                            >
                                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>

                                {!isMatching && !matchSuccess ? (
                                    <div className="text-center">
                                        <h3 className="text-xl font-display font-bold text-white mb-2">Initiate Smart Contract</h3>
                                        <p className="text-sm text-gray-400 mb-6">You are about to lock in 14.2 tons of biomass residue at the current market rate.</p>

                                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6 text-left">
                                            <div className="flex justify-between items-center border-b border-primary/10 pb-3 mb-3">
                                                <span className="text-gray-400 text-sm">Estimated Value</span>
                                                <span className="text-lg font-bold text-accent-green">₹ 42,500</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-1">
                                                <span className="text-gray-400 text-sm">Logistics Pickup</span>
                                                <span className="text-white text-sm font-medium">Included</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleMatch}
                                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent-green text-[#F4F1EA] font-bold text-base shadow-glow-primary hover:shadow-glow-green transition-all relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <Handshake size={20} /> Execute Match
                                            </span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedBuyer(null)}
                                            className="w-full mt-3 py-3 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : isMatching ? (
                                    <div className="py-12 flex flex-col items-center">
                                        <div className="w-20 h-20 relative mb-6">
                                            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                            <Handshake className="absolute inset-0 m-auto text-primary" size={32} />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-white mb-2 animate-pulse">Running AI Match...</h3>
                                        <p className="text-sm text-gray-400">Verifying satellite coordinates</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="py-10 flex flex-col items-center text-center"
                                    >
                                        <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mb-6 relative">
                                            <div className="absolute inset-0 bg-accent-green blur-xl opacity-20 rounded-full animate-pulse"></div>
                                            <CheckCircle2 className="text-accent-green relative z-10" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-white mb-2">Deal Confirmed!</h3>
                                        <p className="text-sm text-gray-400">Logistics dispatch has been notified.</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default BuyerMarketplace;
