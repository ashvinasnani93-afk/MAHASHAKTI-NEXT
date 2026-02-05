import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { marketAPI } from '../services/api';
import MarketOverview from '../components/MarketOverview';
import { toast } from 'sonner';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

 useEffect(() => {
  loadDashboard();
}, [loadDashboard]);
  
 const loadDashboard = useCallback(async () => {
  try {
    const response = await marketAPI.getDashboard();

    if (response?.data?.success) {
      setDashboardData(response.data.data);
    }

  } catch (error) {
    toast.error('Failed to load dashboard data');
    console.error('Dashboard error:', error);

  } finally {
    setLoading(false);
  }
}, []);
  
  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>Loading market data...</p>
      </div>
    );
  }

  return (
    <div data-testid="dashboard-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Mahashakti Market Pro</h1>
        <Link to="/settings" data-testid="profile-button">
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            M
          </div>
        </Link>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          data-testid="search-bar"
        >
          <Search size={20} style={{ color: 'rgba(255,255,255,0.6)' }} />
          <input
            type="text"
            placeholder="Search stocks, indices, commodities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '15px',
            }}
            data-testid="search-input"
          />
        </div>
      </div>

      {/* Market Overview */}
      {dashboardData?.indices && <MarketOverview indices={dashboardData.indices} />}

      {/* Quick Actions */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {[
            { label: 'All', value: 'all' },
            { label: 'Gainers', value: 'gainers' },
            { label: 'Losers', value: 'losers' },
            { label: 'Midcap', value: 'midcap' },
            { label: 'Smallcap', value: 'smallcap' },
            { label: 'Largecap', value: 'largecap' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background:
                  activeCategory === cat.value
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255,255,255,0.05)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
              data-testid={`category-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Gainers */}
      {dashboardData?.topGainers && activeCategory === 'gainers' && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Top Gainers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dashboardData.topGainers.map((stock) => (
              <Link
                to={`/symbol/${stock.symbol}`}
                key={stock.symbol}
                style={{ textDecoration: 'none' }}
                data-testid={`stock-${stock.symbol}`}
              >
                <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{stock.symbol}</div>
                    <div style={{ fontSize: '20px', fontWeight: '700' }}>₹{stock.ltp.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', color: '#06d6a0', fontWeight: '600' }}>
                      <TrendingUp size={18} style={{ display: 'inline', marginRight: '4px' }} />
                      +{stock.changePercent.toFixed(2)}%
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>+₹{stock.change.toFixed(2)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Top Losers */}
      {dashboardData?.topLosers && activeCategory === 'losers' && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Top Losers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dashboardData.topLosers.map((stock) => (
              <Link
                to={`/symbol/${stock.symbol}`}
                key={stock.symbol}
                style={{ textDecoration: 'none' }}
              >
                <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{stock.symbol}</div>
                    <div style={{ fontSize: '20px', fontWeight: '700' }}>₹{stock.ltp.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', color: '#ef476f', fontWeight: '600' }}>
                      <TrendingDown size={18} style={{ display: 'inline', marginRight: '4px' }} />
                      {stock.changePercent.toFixed(2)}%
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>₹{stock.change.toFixed(2)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming IPOs */}
      {dashboardData?.upcomingIPOs && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Upcoming IPOs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dashboardData.upcomingIPOs.map((ipo, index) => (
              <div key={index} className="glass-card">
                <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{ipo.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Price Range</span>
                  <span style={{ fontWeight: '600' }}>{ipo.priceRange}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Open - Close</span>
                  <span style={{ fontWeight: '600' }}>
                    {ipo.openDate} - {ipo.closeDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Grey Market Premium</span>
                  <span
                    style={{
                      fontWeight: '700',
                      color: ipo.gmp > 0 ? '#06d6a0' : '#ef476f',
                    }}
                  >
                    ₹{ipo.gmp} ({ipo.gmpPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
