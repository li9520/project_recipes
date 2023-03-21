import { normalizeRecipeNutrition, RecipeNutritionApi, RecipeNutritionModel } from './recipeNutrition';

export type RecipeItemApi = {
  id: number;
  image: string;
  title: React.ReactNode;
  nutrition: RecipeNutritionApi;
};

export type RecipeItemModel = {
  id: number;
  image: string;
  title: React.ReactNode;
  nutrition: RecipeNutritionModel;
};

export const normalizeRecipeItemModel = (from: RecipeItemApi): RecipeItemModel => ({
  id: from.id,
  image: from.image,
  title: from.title,
  nutrition: normalizeRecipeNutrition(from.nutrition),
});
