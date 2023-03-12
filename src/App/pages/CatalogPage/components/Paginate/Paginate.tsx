import { useEffect } from 'react';
import React from 'react';

import { Button } from 'components/Button';
import { RecipeItemModel } from 'store/models/Food';

import styles from './Paginate.module.scss';
import RecipesList from '../RecipesList';

export type PaginateProps = {
  recipes: RecipeItemModel[];
  currentPage: number;
  nextPage(): void;
  prevPage(): void;
  totalResults: number;
};

const Paginate: React.FC<PaginateProps> = ({ recipes, currentPage, nextPage, prevPage, totalResults }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!recipes.length) return null;

  const recipesPerPage = recipes.length;
  const numberPages = Math.ceil(totalResults / recipesPerPage);

  return (
    <div className={styles.catalog}>
      <RecipesList recipes={recipes} />
      <div className={styles.catalog_paginate}>
        <Button disabled={currentPage === 1} onClick={prevPage}>
          Prev page
        </Button>
        <div className={styles.catalog_paginate_numbering}>{`${currentPage} / ${numberPages}`}</div>
        <Button disabled={currentPage === numberPages} onClick={nextPage}>
          Next page
        </Button>
      </div>
    </div>
  );
};

export default Paginate;
