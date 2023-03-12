import { useCallback } from 'react';
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

const CatalogPage = () => {
  const foodStore = useLocalStore(() => new FoodStore());
  const { search, meta, list, nextPage, prevPage, setType, setQuery, totalResults, setDiet, removeFilter } = foodStore;

  const handleChangeSearch = useCallback(
    (value: string) => {
      setQuery({ query: value });
    },
    [setQuery]
  );

  const handleChangeType = useCallback(
    (types: string[]) => {
      setType({ type: types });
    },
    [setType]
  );

  const handleChangeDiet = useCallback(
    (diest: string[]) => {
      setDiet({ diet: diest });
    },
    [setDiet]
  );

  const handleRemoveCategory = useCallback(
    (value: string) => {
      removeFilter(value);
    },
    [removeFilter]
  );

  const handleClearSearch = () => {
    setQuery({ query: '' });
  };

  return (
    <div className={styles.catalogPage}>
      <Search query={search.query} setQuery={handleChangeSearch} clearQuery={handleClearSearch} />
      <div className={styles.catalogPage_filter}>
        <Filter
          filter={{
            type: [...search.type],
            diet: [...search.diet],
          }}
          setType={handleChangeType}
          setDiet={handleChangeDiet}
        />
      </div>
      {(search.type.length > 0 || search.diet.length > 0) && (
        <CategoryList values={[...search.type, ...search.diet]} onClick={handleRemoveCategory} />
      )}
      {meta === Meta.error && <p>Server error</p>}
      {meta === Meta.success && (
        <>
          <p>
            Showing {totalResults} recipes
            {search.query && <span> for {search.query}</span>}
          </p>
          <Paginate
            recipes={[...list]}
            currentPage={search.page}
            nextPage={nextPage}
            prevPage={prevPage}
            totalResults={totalResults}
          />
        </>
      )}
      {meta === Meta.loading && <Paginate loading />}
    </div>
  );
};

export default observer(CatalogPage);
