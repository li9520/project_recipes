import React from 'react';

import Layout from 'components/Layout/Layout';
import CatalogPage from 'pages/CatalogPage';
import FavouritePage from 'pages/FavouritePage/FavouritePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

import RecipePage from './pages/RecipePage';

const App = () => {
  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="receipt/:id" element={<RecipePage />} />
        <Route path="favourite" element={<FavouritePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
