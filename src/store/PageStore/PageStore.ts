import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import ApiStore, { HTTPMethod, URLmap } from 'store/ApiStore';
import { normalizeRecipe, RecipeApi, RecipeModel } from 'store/models/recipe';
import { ILocalStore } from 'utils/useLocalStote';

import { IPageStore, Meta } from './types';

type PrivateFields = '_data' | '_meta';
export default class PageStore implements IPageStore, ILocalStore {
  constructor() {
    makeObservable<PageStore, PrivateFields>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      meta: computed,
      getOrganizationRecipe: action,
    });
  }
  _data: RecipeModel | null = null;
  private _meta: Meta = Meta.initial;

  private readonly _apiStore = new ApiStore();

  get meta(): Meta {
    return this._meta;
  }

  get data(): RecipeModel | null {
    return this._data;
  }

  async getOrganizationRecipe(id: string): Promise<void> {
    const getUrl = URLmap.recipe;
    this._meta = Meta.loading;
    this._data = null;

    const response = await this._apiStore.request<{ results: RecipeApi }>({
      method: HTTPMethod.GET,
      endpoint: getUrl(id, {
        includeNutrition: true,
      }),
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const data: RecipeModel = normalizeRecipe(response.data);
        this._meta = Meta.success;
        this._data = data;
      } catch (e) {
        this._meta = Meta.error;
        this._data = null;
      }
    });
  }
  destroy(): void {
    this._meta = Meta.loading;
    this._data = null;
  }
}
