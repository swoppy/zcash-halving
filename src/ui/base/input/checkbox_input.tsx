import React from 'react';
import { observer } from 'mobx-react';
import { BooleanStore } from '../../generic_store/store';
import { InputProps, InputChangeEvent } from '../../types';

export type CheckboxInputProps = Omit<InputProps, 'type' | 'value' | 'onChange'> & {
  store: BooleanStore;
};

export const CheckboxInput = observer(({ store, ...props }: CheckboxInputProps) => {
  const onChange = React.useCallback((event: InputChangeEvent) => {
    store.setValue(event.target.checked);
  }, [store]);

  return <input type='checkbox' checked={store.value} onChange={onChange} {...props}/>;
});
