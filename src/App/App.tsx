import React from 'react';

import CatalogPage from 'pages/CatalogPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

import RecipePage from './pages/RecipePage';

const App = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/receipt/:id" element={<RecipePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
