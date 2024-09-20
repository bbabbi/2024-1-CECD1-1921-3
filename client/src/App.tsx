// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './Router';
// import ControlPanel from './components/ControlPanel';
// import exampleData from './data/ControlExData';
// import WarningLogPanel from './components/WarningLogPanel';
// import warningLogData from './data/WarningLogExData';

const App: React.FC = () => {
  return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Router />
      {/* <ControlPanel {...exampleData} />
			<WarningLogPanel {...warningLogData} /> */}
		</ThemeProvider>
  );
};

export default App;
