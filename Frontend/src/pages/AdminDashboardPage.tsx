import React from 'react';
import AdminDashboard from '../components/sections/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12 min-h-[calc(100vh-80px)]">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">
                        System <span className="text-gradient">Control Tower</span>
                    </h1>
                    <p className="text-gray-400">Global overview of AI pipelines, market liquidity, and regional adoption.</p>
                </div>
                <div className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-sm border border-red-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Live Master Node
                </div>
            </div>

            <AdminDashboard />
        </div>
    );
};

export default AdminDashboardPage;
