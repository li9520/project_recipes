import * as React from 'react';

import { createRoot } from 'react-dom/client';
import 'regenerator-runtime';
import { HashRouter } from 'react-router-dom';
import 'styles/styles.scss';

import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

if (module.hot) {
  module.hot.accept();
}
