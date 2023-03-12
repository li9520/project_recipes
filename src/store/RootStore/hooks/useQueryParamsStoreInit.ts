import { useEffect } from 'react';

import { IReactionDisposer, reaction } from 'mobx';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

import rootStore from '../instance';
export const useQueryParamsStoreInit = (): void => {
  const navigate = useNavigate();
  const location = useLocation();

  const changeLocation: IReactionDisposer = reaction(
    () => rootStore.query.search,
    (search) => {
      if (location.search !== search) {
        navigate(`/?${search}`);
      }
    }
  );

  useEffect(() => changeLocation, [changeLocation]);
  useEffect(() => {
    if (location.pathname !== '/') {
      rootStore.query.setSearch('');
      return;
    }
    if (location.search) {
      rootStore.query.setSearch(location.search);
    } else {
      rootStore.query.setSearch(queryString.stringify({ page: '1', query: '', type: [] }));
    }
  }, [location.pathname, location.search]);
};
