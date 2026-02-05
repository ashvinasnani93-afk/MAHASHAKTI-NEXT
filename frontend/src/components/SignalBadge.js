import React from 'react';

const SignalBadge = ({ signal }) => {
  const getClassName = () => {
    switch (signal) {
      case 'STRONG BUY':
        return 'signal-badge strong-buy';
      case 'BUY':
        return 'signal-badge buy';
      case 'SELL':
        return 'signal-badge sell';
      case 'STRONG SELL':
        return 'signal-badge strong-sell';
      case 'WAIT':
        return 'signal-badge wait';
      default:
        return 'signal-badge';
    }
  };

  return (
    <span className={getClassName()} data-testid={`signal-badge-${signal.toLowerCase().replace(' ', '-')}`}>
      {signal}
    </span>
  );
};

export default SignalBadge;
