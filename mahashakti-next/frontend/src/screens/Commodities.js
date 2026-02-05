import React, { useState, useEffect } from 'react';
import { marketAPI } from '../services/api';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

const Commodities = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommodities();
  }, []);

  const loadCommodities = async () => {
    try {
      setLoading(true);
      const response = await marketAPI.getCommodities();
      if (response.data.success) {
        setCommodities(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load commodities');
      console.error('Commodities error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>Loading commodities...</p>
      </div>
    );
  }

  return (
    <div data-testid="commodities-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Commodities</h1>
      </div>

      {/* Commodities List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {commodities.map((commodity) => (
          <div key={commodity.symbol} className="glass-card" data-testid={`commodity-${commodity.symbol}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{commodity.name}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{commodity.symbol}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Last Price</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>₹{commodity.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Change</div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: commodity.change >= 0 ? '#06d6a0' : '#ef476f',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {commodity.change >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  {commodity.change >= 0 ? '+' : ''}
                  {commodity.change.toFixed(2)} ({commodity.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commodities;
