import { normalizeRecipeItemModel, RecipeItemApi, RecipeItemModel } from './recipeItem';

export type RecipesApi = {
  results: RecipeItemApi[];
  totalResults: number;
};

export type RecipesModel = {
  results: RecipeItemModel[];
  totalResults: number;
};

export const normalizeRecipes = (from: RecipesApi): RecipesModel => ({
  results: from.results.map((item) => normalizeRecipeItemModel(item)),
  totalResults: from.totalResults,
});
