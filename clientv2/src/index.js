import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
// import { ThemeProvider } from 'styled-components';

import { PersistGate } from 'redux-persist/integration/react';

// const theme = {
//   primaryColor: '#FFF',
//   secondaryColor: '#f4ca69',
//   highlightColor: '#edad1a',
//   successColor: '#00b200',
// };

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
