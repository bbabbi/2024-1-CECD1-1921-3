import React from 'react';

const ResponsiveIframe: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        src="https://swiu_testbed.dongguk.edu/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="SWIU Testbed"
      />
    </div>
  );
};

export default ResponsiveIframe;
