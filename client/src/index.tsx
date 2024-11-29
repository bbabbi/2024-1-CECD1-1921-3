// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import "./styles/Reset.css";
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Router />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


