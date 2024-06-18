// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './Router';
import ControlPanel from './components/ControlPanel';
import exampleData from './data/exampleData';

const App: React.FC = () => {
  return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
      <ControlPanel {...exampleData} />
		</ThemeProvider>
  );
};

export default App;
