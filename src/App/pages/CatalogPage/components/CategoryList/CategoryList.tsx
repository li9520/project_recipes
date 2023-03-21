import React, { useCallback, useEffect } from 'react';

import Category from 'components/Category';
import { observer } from 'mobx-react-lite';
import { useFoodStore } from 'pages/CatalogPage/CatalogPage';

import styles from './CategoryList.module.scss';

const CategoryList: React.FC = () => {
  const foodContext = useFoodStore();
  const { search, removeFilter } = foodContext;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const handleRemoveCategory = useCallback(
    (value: string) => {
      removeFilter(value);
    },
    [removeFilter]
  );

  const values = [...search.type, ...search.diet];
  return (
    <div className={styles.categoryList}>
      {values.map((item) => (
        <div className={styles.categoryList_item} key={item}>
          <Category value={item} onClick={handleRemoveCategory} />
        </div>
      ))}
    </div>
  );
};

export default observer(CategoryList);
