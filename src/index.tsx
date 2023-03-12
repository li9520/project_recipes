import * as React from 'react';

import { createRoot } from 'react-dom/client';
import 'regenerator-runtime';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (module.hot) {
  module.hot.accept();
}
