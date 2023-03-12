export type IngredientApi = {
  id: number;
  image: string;
  amount: number;
  unit: string;
  name: string;
};

export type IngredientModel = {
  id: number;
  image: string;
  amount: number;
  unit: string;
  name: string;
};

export const normalizeIngredient = (from: IngredientApi): IngredientModel => ({
  id: from.id,
  image: from.image,
  amount: from.amount,
  unit: from.unit,
  name: from.name,
});
