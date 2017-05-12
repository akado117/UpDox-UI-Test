import React from 'react';
import { render } from 'react-dom';
import ProviderDirectory from './pages/providerDirectory.jsx';
import style from '../sass/main.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <ProviderDirectory />
  </MuiThemeProvider>,
  document.getElementById('root')
);
