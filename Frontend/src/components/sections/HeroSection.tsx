import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import * as THREE from 'three';

// Rotating Earth Component
const Earth = () => {
    const earthRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (earthRef.current) {
            earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={earthRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                {/* We use a high-tech wireframe/distorted material as a stand-in for a real satellite texture to give a futuristic AI vibe */}
                <MeshDistortMaterial
                    color="#002b3d"
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.2}
                    wireframe={true}
                    transparent={true}
                    opacity={0.8}
                />
            </mesh>

            {/* Outer atmosphere glow */}
            <mesh>
                <sphereGeometry args={[2.7, 32, 32]} />
                <meshBasicMaterial color="#00f2fe" transparent={true} opacity={0.1} side={THREE.BackSide} />
            </mesh>

            {/* Inner solid core for contrast */}
            <mesh>
                <sphereGeometry args={[2.45, 32, 32]} />
                <meshStandardMaterial color="#0a192f" roughness={0.8} metalness={0.5} />
            </mesh>

            {/* Scattered highlight nodes (Representing active biomass regions) */}
            {[...Array(15)].map((_, i) => {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = 2.5;
                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);

                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshBasicMaterial color={Math.random() > 0.5 ? "#00ff87" : "#00f2fe"} />
                    </mesh>
                );
            })}
        </Float>
    );
};

const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center pt-10">

            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0 opacity-80 md:opacity-100">
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f2fe" />
                    <pointLight position={[-10, -10, -5]} intensity={1} color="#00ff87" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Earth />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <div className="container mx-auto px-6 lg:px-12 relative z-10 pointer-events-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl pointer-events-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI-Powered Geospatial Intel</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Turning Satellite Intelligence into <br />
                            <span className="text-gradient">Clean Air & Farmer Income</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                            We connect agricultural biomass with clean energy producers using advanced CNN & LSTM models to predict, locate, and prevent stubble burning globally.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent-green text-background font-bold text-lg hover:shadow-glow-green transition-all duration-300 flex items-center justify-center gap-2 group">
                                Explore Platform
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="px-8 py-4 rounded-full glass-panel border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 group hover:border-primary/50">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Play size={16} fill="currentColor" className="ml-1" />
                                </div>
                                View Demo
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-display font-bold text-white mb-1">2.4<span className="text-primary text-xl">M</span></p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Tons Avoided</p>
                            </div>
                            <div>
                                <p className="text-3xl font-display font-bold text-white mb-1">15<span className="text-accent-green text-xl">K+</span></p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Farmers Active</p>
                            </div>
                            <div>
                                <p className="text-3xl font-display font-bold text-white mb-1">98<span className="text-primary text-xl">%</span></p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">CNN Accuracy</p>
                            </div>
                        </div>

                    </motion.div>

                    <div className="hidden lg:block">
                        {/* The right side is intentionally empty to let the 3D Earth shine through */}
                    </div>

                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};

export default HeroSection;
