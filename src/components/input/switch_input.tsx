import React from 'react';
import { observer } from 'mobx-react';
import baseStyles from './switch_input.module.css';
import { ThemedStyles, Theme, useStyles } from '../../ui/themes';
import { 
  CheckboxInput as BaseCheckboxInput,
  CheckboxInputProps as BaseCheckboxInputProps, 
} from '../../ui/base/input/checkbox_input';


type SwitchInputStyles = {
  unselected: string;
  selected: string;
  checkbox: string;
};

const themedStyles: ThemedStyles<SwitchInputStyles> = {
  [Theme.DAYLIGHT]: {
    unselected: baseStyles.daylightUnselectedLabel,
    selected: baseStyles.daylightSelectedLabel,
    checkbox: baseStyles.checkbox,
  },
  [Theme.MIDNIGHT]: {
    unselected: baseStyles.midnightUnselectedLabel,
    selected: baseStyles.midnightSelectedLabel,
    checkbox: baseStyles.checkbox,
  },
};

/* Since the SwitchInput is just a glorified CheckboxInput, we use the same CheckboxStore */
export type SwitchInputProps = Omit<BaseCheckboxInputProps, 'className'>;
export const SwitchInput = observer(({ store, ...props }: SwitchInputProps) => {
  const styles = useStyles(themedStyles);
  return (
    <label className={store.value ? styles.selected : styles.unselected}>
      <BaseCheckboxInput className={styles.checkbox} store={store} {...props}/>
    </label>
  );
});
