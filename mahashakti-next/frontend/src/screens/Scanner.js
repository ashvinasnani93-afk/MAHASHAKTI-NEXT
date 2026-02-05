import React, { useState, useEffect } from 'react';
import { scannerAPI } from '../services/api';
import websocketService from '../services/websocket';
import { Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Scanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();

    // Listen for real-time explosion alerts
    websocketService.onExplosionAlert((alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 100));
      
      // Show toast notification
      toast.success(`💥 ${alert.signalTag}: ${alert.symbol} ${alert.strike}${alert.optionType}`, {
        duration: 5000,
      });
    });
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await scannerAPI.getAlerts();
      if (response.data.success) {
        setAlerts(response.data.data);
      }
    } catch (error) {
      console.error('Scanner error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSignalIcon = (tag) => {
    switch (tag) {
      case 'OPTION BLAST':
        return <Zap size={18} />;
      case 'SMART MONEY ENTRY':
        return <TrendingUp size={18} />;
      case 'FAST MOMENTUM':
        return <AlertCircle size={18} />;
      default:
        return <Zap size={18} />;
    }
  };

  const getSignalColor = (tag) => {
    switch (tag) {
      case 'OPTION BLAST':
        return '#ff6b6b';
      case 'SMART MONEY ENTRY':
        return '#06d6a0';
      case 'FAST MOMENTUM':
        return '#ffc107';
      default:
        return '#667eea';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>Scanning options...</p>
      </div>
    );
  }

  return (
    <div data-testid="scanner-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Option Explosion Scanner</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
          Real-time detection of explosive option moves
        </p>
      </div>

      {/* Scanner Status */}
      <div
        className="glass-card"
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#06d6a0',
              animation: 'pulse 2s infinite',
            }}
          />
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>Scanner Active</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              Monitoring {alerts.length} detected opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
            <Zap size={48} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>No explosions detected yet</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '8px' }}>
              Scanner is actively monitoring the market
            </p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                borderLeft: `4px solid ${getSignalColor(alert.signalTag)}`,
                animation: index === 0 ? 'pulse 2s 1' : 'none',
              }}
              data-testid={`alert-${index}`}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                    {alert.symbol} {alert.strike}
                    <span style={{ fontSize: '16px', color: alert.optionType === 'CE' ? '#06d6a0' : '#ef476f', marginLeft: '4px' }}>
                      {alert.optionType}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
                <div
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: getSignalColor(alert.signalTag),
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {getSignalIcon(alert.signalTag)}
                  {alert.signalTag}
                </div>
              </div>

              {/* LTP */}
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
                ₹{alert.ltp.toFixed(2)}
                <span
                  style={{
                    fontSize: '16px',
                    marginLeft: '12px',
                    color: alert.priceChange >= 0 ? '#06d6a0' : '#ef476f',
                  }}
                >
                  {alert.priceChange >= 0 ? '+' : ''}
                  {alert.priceChange.toFixed(2)}%
                </span>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Volume Spike</div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{alert.volumeSpike.toFixed(1)}x</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>OI Change</div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{alert.oiChange.toFixed(1)}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>IV Change</div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{alert.ivChange.toFixed(1)}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Score</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: getSignalColor(alert.signalTag) }}>
                    {alert.score}/9
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Scanner;
