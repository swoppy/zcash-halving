import { action, observable } from 'mobx';

export class GenericStore<T> {
  @observable.ref
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  @action.bound
  setValue(value: T) {
    this.value = value;
  }
}

export class BooleanStore extends GenericStore<boolean> {}
export class NumberStore extends GenericStore<number> {}
export class StringStore extends GenericStore<string> {}
