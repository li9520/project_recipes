import { ReactNode } from 'react';

import { IngredientApi, IngredientModel, normalizeIngredient } from './ingredient';

export type RecipeApi = {
  id: number;
  title: ReactNode;
  image: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: IngredientApi[];
};

export type RecipeModel = {
  id: number;
  title: ReactNode;
  image: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: IngredientModel[];
};

export const normalizeRecipe = (from: RecipeApi): RecipeModel => ({
  id: from.id,
  title: from.title,
  image: from.image,
  instructions: from.instructions,
  readyInMinutes: from.readyInMinutes,
  servings: from.servings,
  extendedIngredients: from.extendedIngredients.map((item) => normalizeIngredient(item)),
});
