import React from 'react';
import { SwitchInput } from '../../components/input/switch_input';
import { HomeStore } from './home_store';
import { GlobalThemeStore, Theme } from '../../ui/themes';
import { observer } from 'mobx-react';
import { StandardPage } from '../../components/pager/standard_page/standard_page';

type BaseHomeProps = {
  store: HomeStore;
};

const BaseHome = observer(({ store }: BaseHomeProps) => {
  return (
    <StandardPage>
      <SwitchInput store={store.theme}/>
      This is home!
    </StandardPage>
  );
});

export const Home = observer(() => {
  const [store] = React.useState(
    new HomeStore(GlobalThemeStore.get() === Theme.DAYLIGHT ? false : true)
  );
  
  return <BaseHome store={store}/>
});

