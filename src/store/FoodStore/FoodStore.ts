import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import queryString from 'query-string';
import ApiStore, { HTTPMethod, URLmap } from 'store/ApiStore';
import { RecipeItemModel } from 'store/models/Food';
import { normalizeRecipes, RecipesApi } from 'store/models/Food/resipes';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collection';
import rootStore from 'store/RootStore';
import { ILocalStore } from 'utils/useLocalStote';

import { IFoodStore, Meta } from './types';

type PrivateFields = '_list' | '_meta' | '_search' | '_totalResults';
const numberRecipes = 21;

export default class FoodStore implements IFoodStore, ILocalStore {
  constructor() {
    makeObservable<FoodStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalResults: observable,
      list: computed,
      meta: computed,
      totalResults: computed,
      getOrganizationRecipeList: action,
      destroy: action,
      _search: observable,
      search: computed,
      nextPage: action.bound,
      prevPage: action.bound,
      setType: action.bound,
      setDiet: action.bound,
      setQuery: action.bound,
      removeFilter: action.bound,
    });
  }

  private _search: {
    query: string;
    type: string[];
    page: number;
    diet: string[];
  } = {
    query: '',
    type: [],
    diet: [],
    page: 1,
  };
  private _list: CollectionModel<number, RecipeItemModel> = getInitialCollectionModel();

  private _cachedList: {
    [page: string]: CollectionModel<number, RecipeItemModel>;
  } = {};

  private _meta: Meta = Meta.initial;

  private _totalResults = 0;

  private readonly _apiStore = new ApiStore();

  get search(): {
    query: string;
    type: string[];
    page: number;
    diet: string[];
  } {
    return this._search;
  }

  get totalResults(): number {
    return this._totalResults;
  }

  get list(): RecipeItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  nextPage(): void {
    this._search.page = this._search.page + 1;
    rootStore.query.changeParams('page', String(this._search.page));
  }

  prevPage(): void {
    this._search.page = this._search.page - 1;
    rootStore.query.changeParams('page', String(this._search.page));
  }

  setType(value: string[]): void {
    this._search.page = 1;
    this._search.type = value;
    this._cachedList = {};
    rootStore.query.setSearch(
      queryString.stringify({
        ...this.search,
        type: this.search.type.join('|'),
        diet: this.search.diet.join('|'),
      })
    );
  }

  setDiet(value: string[]): void {
    this._search.page = 1;
    this._search.diet = value;
    this._cachedList = {};
    rootStore.query.setSearch(
      queryString.stringify({
        ...this.search,
        type: this.search.type.join('|'),
        diet: this.search.diet.join('|'),
      })
    );
  }

  setQuery(value: string): void {
    this._search.page = 1;
    this._search.query = value;
    this._cachedList = {};
    rootStore.query.setSearch(
      queryString.stringify({
        ...this.search,
        type: this.search.type.join('|'),
        diet: this.search.diet.join('|'),
      })
    );
  }

  removeFilter(value: string): void {
    this._search.page = 1;
    this._cachedList = {};
    if (this._search.type.includes(value)) {
      this._search.type = this._search.type.filter((item) => item !== value);
    } else if (this._search.diet.includes(value)) {
      this._search.diet = this._search.diet.filter((item) => item !== value);
    }
    rootStore.query.setSearch(
      queryString.stringify({
        ...this._search,
        type: this._search.type.join('|'),
        diet: this._search.diet.join('|'),
      })
    );
  }

  async getOrganizationRecipeList(): Promise<void> {
    if (this._cachedList[this._search.page]) {
      this._list = this._cachedList[this._search.page];
      return;
    }
    const getUrl = URLmap.list;
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this._apiStore.request<{ data: RecipesApi[] }>({
      method: HTTPMethod.GET,
      endpoint: getUrl({
        query: this._search.query,
        offset: (this._search.page - 1) * numberRecipes,
        type: this._search.type.join('|'),
        diet: this._search.diet.join('|'),
        number: numberRecipes,
        addRecipeNutrition: true,
      }),
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const list: RecipeItemModel[] = [];

        const normalizesData = normalizeRecipes(response.data);

        list.push(...normalizesData.results);
        this._totalResults = normalizesData.totalResults;
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        this._cachedList[this._search.page] = this._list;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    this._list = getInitialCollectionModel();
    this._meta = Meta.initial;
    this._cachedList = {};

    this._search = { query: '', type: [], page: 1, diet: [] };
    this._totalResults = 0;
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.search,
    (search) => {
      if (!search) return;
      if (
        search !==
        queryString.stringify({
          ...this.search,
          type: this.search.type.join('|'),
          diet: this.search.diet.join('|'),
        })
      ) {
        this._search.diet = rootStore.query.getParam('diet')
          ? (rootStore.query.getParam('diet') as string).split('|')
          : [];
        this._search.type = rootStore.query.getParam('type')
          ? (rootStore.query.getParam('type') as string).split('|')
          : [];
        this._search.query = (rootStore.query.getParam('query') as string) ?? '';
        this._search.page = Number(rootStore.query.getParam('page') ?? 1);
      }
      this.getOrganizationRecipeList();
    }
  );
}
