import { createContext, useContext } from 'react';
import React from 'react';

import { observer } from 'mobx-react-lite';
import FoodStore from 'store/FoodStore';
import { Meta } from 'store/FoodStore/types';
import { useLocalStore } from 'utils/useLocalStote';

import styles from './CatalogPage.module.scss';
import CategoryList from './components/CategoryList';
import Filter from './components/Filter';
import Paginate from './components/Paginate';
import Search from './components/Search';

const FoodContext = createContext<FoodStore>({} as FoodStore);
const FoodProvider = FoodContext.Provider;
export const useFoodStore = (): FoodStore => useContext(FoodContext);

const CatalogPage = () => {
  const foodStore = useLocalStore(() => new FoodStore());
  const { search, meta } = foodStore;
  return (
    <FoodProvider value={foodStore}>
      <Search />
      <div className={styles.catalogPage}>
        <Filter />
        <CategoryList />
        {meta === Meta.error && <p>Server error</p>}
        <Paginate loading={meta === Meta.loading} />
      </div>
    </FoodProvider>
  );
};

export default observer(CatalogPage);
