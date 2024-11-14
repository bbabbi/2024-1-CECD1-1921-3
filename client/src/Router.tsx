import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Home from './pages/Home';
import Control from './pages/Control';
import Graph from './pages/Graph';
import WarningLog from './pages/WarningLog';
import Login from './pages/Login';
import Join from './pages/Join';
import EnergyUsage from './pages/EnergyUsage';
import Dashboard from './pages/Dashboard';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/control" element={<Control />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/warninglog" element={<WarningLog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/energyusage" element={<EnergyUsage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
