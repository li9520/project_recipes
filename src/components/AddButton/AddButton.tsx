import React from 'react';

import styles from './AddButton.module.scss';

type AddbuttonProps = {
  onClick(e: React.MouseEvent<Element, MouseEvent>): void;
};

export const AddButton: React.FC<AddbuttonProps> = ({ onClick }) => {
  const handleClick: React.MouseEventHandler = (e) => {
    onClick && onClick(e);
  };

  return (
    <div title={'add to favourites'} onClick={handleClick} className={styles.addButton}>
      <div className={styles.addButton_plus}></div>
    </div>
  );
};

export default AddButton;
