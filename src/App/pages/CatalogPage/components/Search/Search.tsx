import React from 'react';

import Input from 'components/Input';

import styles from './Search.module.scss';
const Search = ({
  query,
  setQuery,
  clearQuery,
}: {
  query: string;
  setQuery: (search: string) => void;
  clearQuery: () => void;
}) => {
  return (
    <div className={styles.search}>
      <Input value={query} onChange={setQuery} placeholder={'What are you looking for?'} />
      <button type="reset" onClick={clearQuery} title="Click me to clear the input field">
        &times;
      </button>
    </div>
  );
};

export default Search;
