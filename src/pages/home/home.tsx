import React from 'react';
import { SwitchInput } from '../../components/input/switch_input';
import { HomeStore } from './home_store';
import Countdown from 'react-countdown';
import { StandardPage } from '../../components/pager/standard_page/standard_page';
import { GlobalThemeStore, Theme, ThemedStyles, useStyles} from '../../ui/themes';
import { observer } from 'mobx-react';
import baseStyles from './home.module.css';
import text from './home_text';
import data from './formula';
import { Renderer, InfoBlocks } from './components/components';

type HomeStyleProps = {
  themeContainer: string;
  header: string;
  countdownContainer: string;
  timerContainer: string;
  timer: string;
  infoBlocks: string;
  infoBlock: string;
  data: string;
  label: string;
  countdownInfoContainer: string;
};

export const themedStyles: ThemedStyles<HomeStyleProps> = {
  [Theme.DAYLIGHT]: {
    themeContainer: baseStyles.themeContainer,
    header: baseStyles.daylightHeader,
    timerContainer: baseStyles.daylightTimerContainer,
    countdownContainer: baseStyles.countdownContainer,
    timer: baseStyles.timer,
    infoBlocks: baseStyles.infoBlocksContainer,
    infoBlock: baseStyles.daylightInfoBlock,
    data: baseStyles.data,
    label: baseStyles.label,
    countdownInfoContainer: baseStyles.countdownInfoContainer,
  },
  [Theme.MIDNIGHT]: {
    themeContainer: baseStyles.themeContainer,
    header: baseStyles.midnightHeader,
    timerContainer: baseStyles.midnightTimerContainer,
    countdownContainer: baseStyles.countdownContainer,
    timer: baseStyles.timer,
    infoBlocks: baseStyles.infoBlocksContainer,
    infoBlock: baseStyles.midnightInfoBlock,
    data: baseStyles.data,
    label: baseStyles.label,
    countdownInfoContainer: baseStyles.countdownInfoContainer,
  },
};

const Faq = () => {
  return (
    <div>

    </div>
  )
}

type BaseHomeProps = {
  store: HomeStore;
};

/* countdonw formula
  remainingTime = meanBlockTIme * (currentBlock - halvingBlock)
*/
const BaseHome = observer(({ store }: BaseHomeProps) => {
  const styles = useStyles(themedStyles);
  const [state, setState] = React.useState({
    currentBlock: 830818,
    blockTime: 75,
  });

  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    fetch('https://api.zcha.in/v2/mainnet/network')
      .then(response => response.json())
      .then(data => setState({
        currentBlock: data.blockNumber,
        blockTime: data.meanBlockTime,
      }))

      fetch('https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd')
        .then(response => response.json())
        .then(data => setPrice(data.zcash.usd))

  }, [state.currentBlock, state.blockTime, Countdown, price]);

  console.log(Math.trunc(state.blockTime * (data.halvingBlock() - state.currentBlock)));
  const date = Date.now() + Math.trunc(state.blockTime * (data.halvingBlock() - state.currentBlock)) * 1000;
  const placeholder = Date.now() + 500000000;
  return (
    <StandardPage>
      <div className={styles.themeContainer}>
        <SwitchInput store={store.theme}/>
      </div>
      <div className={styles.header}>
        <h2>{text.headerTitle()}</h2>
      </div>
      <div className={styles.timerContainer}>
        <Countdown date={date} renderer={Renderer}/>
      </div>
      <InfoBlocks
        currentBlock={state.currentBlock}
        meanBlockTime={state.blockTime}
        price={price}
      />
    </StandardPage>
  );
});

export const Home = observer(() => {
  const [store] = React.useState(
    new HomeStore(GlobalThemeStore.get() === Theme.DAYLIGHT ? false : true)
  );
  return <BaseHome store={store}/>
});

