import React from 'react';

import { Button } from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { URLmap } from 'store/ApiStore';
import { IngredientModel, RecipeModel } from 'store/models/recipe';

import serving_img from './img/servings.png';
import timer_img from './img/timer.png';
import styles from './RenderPage.module.scss';

const CardIngredient: React.FC<IngredientModel> = ({ image, amount, unit, name }) => {
  const getUrl = URLmap.ingredientImg;
  return (
    <div className={styles.card_ingredient}>
      <p>{`${amount} ${unit}`}</p>
      <img className={styles.card_ingredient_img} src={getUrl(image)} alt={name} />
      <p>{name}</p>
    </div>
  );
};

type RenderPageProps = {
  recipe: RecipeModel;
};
const RenderPage: React.FC<RenderPageProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { image, title, readyInMinutes, instructions, extendedIngredients, servings } = recipe;
  const recipeImage = <img className={styles.recipe_img} alt="" src={image} />;
  const recipeTitle = <h1 className={styles.recipe_body_title}>{title}</h1>;
  const recipeInfo = (
    <div className={styles.recipe_body_info}>
      <div className={styles.recipe_body_info_item}>
        <img src={timer_img} alt="timer" />
        <div>{`${readyInMinutes} MINUTES`}</div>
      </div>
      <div className={styles.recipe_body_info_item}>
        <img src={serving_img} alt="serving" />
        <div>{`${servings} ${servings === 1 ? 'SERVING' : 'SERVINGS'}`}</div>
      </div>
    </div>
  );

  const recipe_ingredients = (
    <>
      <h2>Ingredients</h2>
      <div className={styles.recipe_body_ingredients}>
        {extendedIngredients.map((item) => (
          <CardIngredient key={`${item.id} ${item.name}`} {...item} />
        ))}
      </div>
    </>
  );

  const recipe_instraction = (
    <>
      <h2>Instruction</h2>
      <div className={styles.recipe_body_instraction} dangerouslySetInnerHTML={{ __html: instructions }} />
    </>
  );

  return (
    <div className={styles.recipe}>
      {recipeImage}
      <div className={styles.recipe_body}>
        <div className={styles.wrapper}>
          {recipeTitle}
          {recipeInfo}
          {recipe_ingredients}
          {recipe_instraction}
        </div>
      </div>
      <Button onClick={() => navigate(-1)} className={'button_home'}>
        Home
      </Button>
    </div>
  );
};

export default RenderPage;
