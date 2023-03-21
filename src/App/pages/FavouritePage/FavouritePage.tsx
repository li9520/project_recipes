import React, { useEffect } from 'react';

import Card from 'components/Card';
import { observer } from 'mobx-react-lite';
import favouriteStore from 'store/FavouriteStore/instance';

import styles from './FavouritePage.module.scss';

const FavouritePage = () => {
  const copyData = [...favouriteStore.data];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      {copyData.length > 0 ? (
        <div className={styles.recipes}>
          {copyData.map((item) => {
            return (
              <div className={styles.recipes_item} key={item.id}>
                <Card {...item} />
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Add first recipe</h1>
      )}
    </div>
  );
};

export default observer(FavouritePage);
