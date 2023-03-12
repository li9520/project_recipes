import React from 'react';

import Category from 'components/Category';

import styles from './CategoryList.module.scss';

type CategoryListProps = {
  values: string[];
  onClick: (value: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ values, onClick }) => {
  return (
    <div className={styles.categoryList}>
      {values.map((item) => (
        <div className={styles.categoryList_item} key={item}>
          <Category value={item} onClick={onClick} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
