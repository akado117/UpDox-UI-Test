import React from 'react';
import { render } from 'react-dom';
import ProviderDirectory from './pages/providerDirectory.jsx';
import style from '../sass/main.scss'

render(
  <ProviderDirectory />,
  document.getElementById('root')
);
