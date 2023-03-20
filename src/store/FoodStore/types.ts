import { RecipeItemModel } from 'store/models/Food';

export interface IFoodStore {
  getOrganizationRecipeList(): Promise<void>;
  list: RecipeItemModel[];

  meta: Meta;

  search: { query: string; type: string[]; page: number; diet: string[] };
  totalResults: number;
  destroy(): void;
  nextPage(): void;
  prevPage(): void;
  setType(/*search: { type: string[] }*/ value: string[]): void;
  setDiet(/*search: { diet: string[] }*/ value: string[]): void;
  setQuery(value: string): void;
  removeFilter(value: string): void;
}

export enum Meta {
  initial = 'initial', // Процесс не начат
  loading = 'loading', // В процессе загрузки
  error = 'error', // Завершилось с ошибкой
  success = 'success', // Завершилось успешно
}
