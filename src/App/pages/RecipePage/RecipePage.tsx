import React from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import PageStore from 'store/PageStore';
import { Meta } from 'store/PageStore/types';
import { useLocalStore } from 'utils/useLocalStote';

import RenderPage from './components/RenderPage';

const RecipePage = () => {
  const pageStore = useLocalStore(() => new PageStore());
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;
    pageStore.getOrganizationRecipe(id);
  }, [id, pageStore]);

  return pageStore.meta === Meta.success ? <RenderPage recipe={pageStore.data} /> : <RenderPage loading />;
};

export default observer(RecipePage);
