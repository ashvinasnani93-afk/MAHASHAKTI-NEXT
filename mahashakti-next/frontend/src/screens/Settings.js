import React from 'react';
import { User, Bell, Shield, Info } from 'lucide-react';

const Settings = () => {
  return (
    <div data-testid="settings-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Settings</h1>
      </div>

      {/* Settings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Profile */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Profile</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Manage your account</div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <div
            style={
{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(6, 214, 160, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={24} style={{ color: '#06d6a0' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Notifications</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Configure alerts</div>
          </div>
        </div>

        {/* Privacy */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 193, 7, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={24} style={{ color: '#ffc107' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Privacy & Security</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Data protection settings</div>
          </div>
        </div>

        {/* About */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(102, 126, 234, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Info size={24} style={{ color: '#667eea' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>About</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Version 1.0.0</div>
          </div>
        </div>
      </div>

      {/* Angel One Status */}
      <div
        className="glass-card"
        style={{
          marginTop: '24px',
          background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.1) 0%, rgba(16, 214, 160, 0.1) 100%)',
          border: '1px solid rgba(6, 214, 160, 0.3)',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Angel One Integration</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#06d6a0',
            }}
          />
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Connected</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
