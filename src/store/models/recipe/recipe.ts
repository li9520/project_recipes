import { ReactNode } from 'react';

import { IngredientApi, IngredientModel, normalizeIngredient } from './ingredient';

export type RecipeApi = {
  title: ReactNode;
  image: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: IngredientApi[];
};

export type RecipeModel = {
  title: ReactNode;
  image: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: IngredientModel[];
};

export const normalizeRecipe = (from: RecipeApi): RecipeModel => ({
  title: from.title,
  image: from.image,
  instructions: from.instructions,
  readyInMinutes: from.readyInMinutes,
  servings: from.servings,
  extendedIngredients: from.extendedIngredients.map((item) => normalizeIngredient(item)),
});
