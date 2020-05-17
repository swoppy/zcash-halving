import { reaction } from 'mobx';
import { BooleanStore } from '../../ui/generic_store/store';
import { GlobalThemeStore, Theme } from '../../ui/themes';

export class HomeStore {
  readonly theme: BooleanStore;
  
  constructor(theme: boolean) {
    this.theme = new BooleanStore(theme);
    reaction(
      () => this.theme.value,
      () => {
        GlobalThemeStore.set(this.theme.value ? Theme.MIDNIGHT : Theme.DAYLIGHT);
        localStorage.setItem('theme', GlobalThemeStore.get());
      },
    );
  }
}
