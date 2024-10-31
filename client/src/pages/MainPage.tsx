import React from 'react';

const MyIframeComponent: React.FC = () => {
  return (
    <div>
      <iframe
        src="https://swiu_testbed.dongguk.edu/"
        style={{ width: '1000px', height: '1500px' }}
        title="SWIU Testbed"
      />
    </div>
  );
};

export default MyIframeComponent;
