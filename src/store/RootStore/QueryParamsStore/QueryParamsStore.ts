import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';
import queryString from 'query-string';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      setSearch: action,
      changeParams: action,
      params: computed,
      search: computed,
    });
  }

  getParam(key: string): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  get params() {
    return this._params;
  }

  get search(): string {
    return this._search;
  }

  changeParams(key: string, value: string | string[]) {
    this._params[key] = value;
    this._search = queryString.stringify(this._params);
  }
}
