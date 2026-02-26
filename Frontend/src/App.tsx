import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import { LanguageProvider } from './i18n/context';

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Mobile Wrapper Container - Locks the app into a phone-sized ratio on desktop */}
        <div className="bg-black min-h-screen w-full flex justify-center overflow-hidden">

          <div className="w-full max-w-[430px] h-[100dvh] bg-background relative flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,242,254,0.1)] border-x border-white/5">

            {/* Animated Background Elements scoped to mobile view */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-primary/10 blur-[80px] -z-10 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-[40%] right-[-20%] w-[300px] h-[300px] bg-accent-green/5 blur-[100px] -z-10 rounded-full animate-blob"></div>

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 scroll-smooth hide-scrollbar relative z-0">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/farmer-dashboard" element={<FarmerDashboardPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
              </Routes>
            </main>

            {/* Sticky Bottom Navigation */}
            <BottomNav />
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
