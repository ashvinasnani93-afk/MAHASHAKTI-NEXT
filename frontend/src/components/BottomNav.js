import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Activity, Search, Settings, BarChart3 } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home', testId: 'nav-home' },
    { path: '/signals', icon: TrendingUp, label: 'Signals', testId: 'nav-signals' },
    { path: '/scanner', icon: Activity, label: 'Scanner', testId: 'nav-scanner' },
    { path: '/options', icon: BarChart3, label: 'Options', testId: 'nav-options' },
    { path: '/settings', icon: Settings, label: 'Settings', testId: 'nav-settings' },
  ];

  return (
    <nav className="bottom-nav" data-testid="bottom-navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            data-testid={item.testId}
          >
            <Icon size={22} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
