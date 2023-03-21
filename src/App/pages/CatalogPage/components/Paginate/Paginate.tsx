import React, { useRef } from 'react';

import Button from 'components/Button';
import { observer } from 'mobx-react-lite';
import { useFoodStore } from 'pages/CatalogPage/CatalogPage';
import RecipesList from 'pages/CatalogPage/components/RecipesList';

import styles from './Paginate.module.scss';

const Paginate: React.FC = () => {
  const foodContext = useFoodStore();
  const { search, list, nextPage, prevPage, totalResults } = foodContext;
  const wrapperRef = useRef<null | HTMLDivElement>(null /* начальное значение */);

  const recipesPerPage = list.length;
  const numberPages = Math.ceil(totalResults / recipesPerPage);

  const handleNext = () => {
    if (wrapperRef.current === null) {
      return;
    }
    nextPage();
    wrapperRef.current.scrollIntoView({ block: 'center' });
  };

  const handlePrev = () => {
    if (wrapperRef.current === null) {
      return;
    }
    prevPage();
    wrapperRef.current.scrollIntoView({ block: 'center' });
  };

  return (
    <>
      <p ref={wrapperRef}>
        Showing {totalResults} recipes
        {search.query && <span> for {search.query}</span>}
      </p>
      {list.length !== 0 && (
        <div className={styles.catalog}>
          <RecipesList recipes={[...list]} />
          <div className={styles.catalog_paginate}>
            <Button disabled={search.page === 1} onClick={handlePrev}>
              Prev page
            </Button>
            <div className={styles.catalog_paginate_numbering}>{`${search.page} / ${numberPages}`}</div>
            <Button disabled={search.page === numberPages} onClick={handleNext}>
              Next page
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Paginate);
