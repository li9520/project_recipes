import { normalizeRecipeItemModel, RecipeItemApi, RecipeItemModel } from './recipeItem';

export type RecipesApi = {
  results: RecipeItemApi[];
  totalResults: number;
};

export type RecipesModel = {
  results: RecipeItemModel[];
  totalResults: number;
};

export const normalizeRecipes = (from: RecipesApi): RecipesModel => {
  const filteredData = from.results.map((item: RecipeItemApi) => {
    const image = !item.image ? 'src/img/banner4.jpg' : item.image;
    return { ...item, image: image };
  });
  return {
    results: filteredData.map((item) => normalizeRecipeItemModel(item)),
    totalResults: from.totalResults,
  };
};
