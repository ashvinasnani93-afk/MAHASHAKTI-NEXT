import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SignalBadge from '../components/SignalBadge';

const OptionChain = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');
  const [selectedExpiry, setSelectedExpiry] = useState('09FEB2026');
  const [showExpiryDropdown, setShowExpiryDropdown] = useState(false);

  // Mock option chain data
  const strikes = [
    {
      strike: 23400,
      ce: { ltp: 125.50, volume: 45200, oi: 125000, signal: 'BUY' },
      pe: { ltp: 35.75, volume: 32100, oi: 98000, signal: 'WAIT' },
    },
    {
      strike: 23450,
      ce: { ltp: 95.25, volume: 52300, oi: 142000, signal: 'STRONG BUY' },
      pe: { ltp: 55.50, volume: 48200, oi: 115000, signal: 'WAIT' },
    },
    {
      strike: 23500,
      ce: { ltp: 72.75, volume: 68500, oi: 198000, signal: 'BUY' },
      pe: { ltp: 82.25, volume: 61200, oi: 165000, signal: 'SELL' },
    },
    {
      strike: 23550,
      ce: { ltp: 48.50, volume: 42100, oi: 135000, signal: 'WAIT' },
      pe: { ltp: 115.75, volume: 58900, oi: 182000, signal: 'STRONG SELL' },
    },
  ];

  const expiries = ['09FEB2026', '16FEB2026', '27FEB2026'];

  return (
    <div data-testid="option-chain-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Option Chain</h1>
      </div>

      {/* Symbol Selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', overflowX: 'auto' }}>
        {['NIFTY', 'BANKNIFTY', 'FINNIFTY'].map((symbol) => (
          <button
            key={symbol}
            onClick={() => setSelectedSymbol(symbol)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background:
                selectedSymbol === symbol
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.05)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            data-testid={`symbol-${symbol}`}
          >
            {symbol}
          </button>
        ))}
      </div>

      {/* Expiry Selector */}
      <div style={{ marginBottom: '24px', position: 'relative' }}>
        <button
          onClick={() => setShowExpiryDropdown(!showExpiryDropdown)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          data-testid="expiry-selector"
        >
          <span>Expiry: {selectedExpiry}</span>
          <ChevronDown size={20} />
        </button>

        {showExpiryDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '8px',
              background: 'rgba(22, 33, 62, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
              zIndex: 1000,
            }}
          >
            {expiries.map((expiry) => (
              <div
                key={expiry}
                onClick={() => {
                  setSelectedExpiry(expiry);
                  setShowExpiryDropdown(false);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: expiry === selectedExpiry ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
                data-testid={`expiry-option-${expiry}`}
              >
                {expiry}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Option Chain Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
          }}
          data-testid="option-chain-table"
        >
          <thead>
            <tr>
              <th
                colSpan={4}
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  background: 'rgba(6, 214, 160, 0.1)',
                  color: '#06d6a0',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '10px 10px 0 0',
                }}
              >
                CALL OPTIONS
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                STRIKE
              </th>
              <th
                colSpan={4}
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  background: 'rgba(239, 71, 111, 0.1)',
                  color: '#ef476f',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '0 10px 10px 0',
                }}
              >
                PUT OPTIONS
              </th>
            </tr>
            <tr>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Signal</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>LTP</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Volume</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>OI</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}></th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>OI</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Volume</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>LTP</th>
              <th style={{ padding: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Signal</th>
            </tr>
          </thead>
          <tbody>
            {strikes.map((row, index) => (
              <tr
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                }}
                data-testid={`strike-row-${row.strike}`}
              >
                {/* CE Data */}
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <SignalBadge signal={row.ce.signal} />
                </td>
                <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>₹{row.ce.ltp}</td>
                <td style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  {row.ce.volume.toLocaleString()}
                </td>
                <td style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  {row.ce.oi.toLocaleString()}
                </td>

                {/* Strike */}
                <td
                  style={{
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    textAlign: 'center',
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                  }}
                >
                  {row.strike}
                </td>

                {/* PE Data */}
                <td style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  {row.pe.oi.toLocaleString()}
                </td>
                <td style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  {row.pe.volume.toLocaleString()}
                </td>
                <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>₹{row.pe.ltp}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <SignalBadge signal={row.pe.signal} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionChain;
