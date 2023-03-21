import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStote';

type PrivateFields = '_isOpen';

export interface IDropDownStore {
  toggleIsOpen(): void;
  close(): void;
  isOpen: boolean;
}

export default class DropDownStore implements IDropDownStore, ILocalStore {
  constructor() {
    makeObservable<DropDownStore, PrivateFields>(this, {
      _isOpen: observable,
      isOpen: computed,
      toggleIsOpen: action.bound,
      close: action.bound,
    });
  }
  private _isOpen = false;

  toggleIsOpen(): void {
    this._isOpen = !this._isOpen;
  }

  close(): void {
    this._isOpen = false;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  destroy(): void {
    this._isOpen = false;
  }
}
