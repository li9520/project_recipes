import { CardProps } from 'components/Card';
import { action, autorun, computed, makeObservable, observable } from 'mobx';

export interface IFavouriteStore {
  data: CardProps[];
  addRecipe(recipe: CardProps): void;
  removeRecipe(id: number): void;
}
type PrivateFields = '_data';

const name = 'FavouriteStore';

export default class FavouriteStore implements IFavouriteStore {
  constructor() {
    makeObservable<FavouriteStore, PrivateFields>(this, {
      _data: observable.ref,
      data: computed,
      addRecipe: action.bound,
      removeRecipe: action.bound,
    });
    const storedJson = localStorage.getItem(name);
    if (storedJson) Object.assign(this, JSON.parse(storedJson));
    autorun(() => {
      localStorage.setItem(name, JSON.stringify(this));
    });
  }
  private _data: CardProps[] = [];

  get data(): CardProps[] {
    return this._data;
  }

  addRecipe(recipe: CardProps): void {
    const filtredData = this._data.filter((item) => item.id === recipe.id);
    if (filtredData.length > 0) {
      return;
    }
    this._data = [...this._data, { ...recipe, addButton: false, deletebutton: true }];
  }

  removeRecipe(id: number): void {
    const filtredData = this._data.filter((item) => item.id !== id);
    this._data = filtredData;
  }
}
