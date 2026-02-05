import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Dashboard from './screens/Dashboard';
import Signals from './screens/Signals';
import OptionChain from './screens/OptionChain';
import Scanner from './screens/Scanner';
import Commodities from './screens/Commodities';
import MarketHeatmap from './screens/MarketHeatmap';
import SymbolDetail from './screens/SymbolDetail';
import Settings from './screens/Settings';
import BottomNav from './components/BottomNav';
import websocketService from './services/websocket';
import './App.css';

function App() {
  useEffect(() => {
    // Connect WebSocket on app load
    websocketService.connect();

    return () => {
      websocketService.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/options" element={<OptionChain />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/commodities" element={<Commodities />} />
            <Route path="/heatmap" element={<MarketHeatmap />} />
            <Route path="/symbol/:symbol" element={<SymbolDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <BottomNav />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;
