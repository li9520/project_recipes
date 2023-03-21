import React from 'react';

import Card from 'components/Card';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { RecipeItemModel } from 'store/models/Food';

import styles from './RecipesList.module.scss';

type RecipesListProps = {
  recipes: RecipeItemModel[];
};

const RecipesLits: React.FC<RecipesListProps> = ({ recipes }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.recipes}>
      {recipes.map((card: RecipeItemModel) => {
        return (
          <div className={styles.recipes_item} key={card.id}>
            <Card
              {...card}
              content={`${card.nutrition.kcal} kcal`}
              subtitle={card.nutrition.ingredients.splice(0, 4).join(' + ')}
              onClick={() => navigate(`/receipt/${card.id}`)}
              addButton={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default observer(RecipesLits);
