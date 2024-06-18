// src/pages/Control.tsx
import React from 'react';
import ControlPanel from '../components/ControlPanel';
import exampleData from '../data/exampleData';

const Control: React.FC = () => {
  return (
    <div>
      <h1>컨트롤</h1>
      <ControlPanel {...exampleData} />
    </div>
  );
};

export default Control;
