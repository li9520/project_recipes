import React, { useCallback } from 'react';

import Input from 'components/Input';
import { observer } from 'mobx-react-lite';
import { useFoodStore } from 'pages/CatalogPage/CatalogPage';

import styles from './Search.module.scss';
const Search = () => {
  const foodContext = useFoodStore();
  const { search, setQuery } = foodContext;

  const handleChangeSearch = useCallback(
    (value: string) => {
      setQuery(value);
    },
    [setQuery]
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Input value={search.query} onChange={handleChangeSearch} placeholder={'What are you looking for?'} />
        <button type="reset" onClick={() => setQuery('')} title="Click me to clear the input field">
          &times;
        </button>
      </div>
    </div>
  );
};

export default observer(Search);
