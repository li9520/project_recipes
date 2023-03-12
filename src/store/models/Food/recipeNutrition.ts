export type RecipeNutritionApi = {
  ingredients: { name: string }[];
  nutrients: { name: string; amount: number }[];
};

export type RecipeNutritionModel = {
  ingredients: string[];
  kcal: number;
};

export const normalizeRecipeNutrition = (from: RecipeNutritionApi): RecipeNutritionModel => ({
  ingredients: from.ingredients.map((item) => item.name),
  kcal: from.nutrients.reduce((acc, item) => {
    return item.name === 'Calories' ? item.amount : acc;
  }, 0),
});
