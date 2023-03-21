import { RecipeModel } from 'store/models/recipe';

export enum Meta {
  initial = 'initial', // Процесс не начат
  loading = 'loading', // В процессе загрузки
  error = 'error', // Завершилось с ошибкой
  success = 'success', // Завершилось успешно
}

export interface IPageStore {
  getOrganizationRecipe(id: string): Promise<void>;
  data: RecipeModel | null;
  meta: Meta;
}
