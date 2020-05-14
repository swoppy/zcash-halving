import React from 'react';
import baseStyles from './standard_page.module.css';
import { ThemedStyles, Theme, useStyles  } from '../../../ui/themes';

type StandardPageStyles = {
  background: string;
  container: string;
};

const themedStyles: ThemedStyles<StandardPageStyles> = {
  [Theme.DAYLIGHT]: {
    background: baseStyles.daylightBackground,
    container: baseStyles.container,
  },
  [Theme.MIDNIGHT]: {
    background: baseStyles.midnightBackground,
    container: baseStyles.container,
  },
};

export type StandardPageProps = {
  children: React.ReactNode;
};

export const StandardPage = React.memo(({ children }: StandardPageProps) => {
  const styles = useStyles(themedStyles);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
});