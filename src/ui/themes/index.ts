import React from 'react';
import { observable } from 'mobx';

export enum Theme {
  DAYLIGHT = 'daylight',
  MIDNIGHT = 'midnight',
}

const getTheme = (localItem: string | null): Theme => {
  if (localItem === Theme.DAYLIGHT) {
    return Theme.DAYLIGHT;
  }
  else if (localItem === Theme.MIDNIGHT) {
    return Theme.MIDNIGHT;
  }
  else {
    return Theme.MIDNIGHT;
  }
};

export const GlobalThemeStore = observable.box(getTheme(localStorage.getItem('theme')));
export const ThemeContext = React.createContext(getTheme(localStorage.getItem('theme')));
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export type ThemedStyles<K extends {}> = Record<Theme, K>;

export function useStyles<K>(themedStyles: ThemedStyles<K>): K {
  const theme = React.useContext(ThemeContext);
  return themedStyles[theme];
}
