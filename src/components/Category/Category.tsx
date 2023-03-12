import React from 'react';

import styles from './Category.module.scss';

type CategoryProps = {
  value: string;
  onClick: (value: string) => void;
};

const Category: React.FC<CategoryProps> = ({ value, onClick }) => {
  return (
    <div className={styles.category}>
      <div>{value}</div>
      <button type="reset" onClick={() => onClick(value)}>
        &times;
      </button>
    </div>
  );
};

export default React.memo(Category);
