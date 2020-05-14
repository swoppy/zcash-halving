import React from 'react';
import { observable } from 'mobx';

export enum Theme {
  DAYLIGHT = 'daylight',
  MIDNIGHT = 'midnight',
}

export const GlobalThemeStore = observable.box(Theme.DAYLIGHT);
export const ThemeContext = React.createContext(Theme.DAYLIGHT);
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export type ThemedStyles<K extends {}> = Record<Theme, K>;

export function useStyles<K>(themedStyles: ThemedStyles<K>): K {
  const theme = React.useContext(ThemeContext);
  return themedStyles[theme];
}
