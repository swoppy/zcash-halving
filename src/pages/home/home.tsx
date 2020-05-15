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

const themedStyles: ThemedStyles<HomeStyleProps> = {
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

type RendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/*  Unable to typecheck css in this component as <Countdown> doesnt accept renderer with hooks (useStyles)
    so I just used baseStyles directly
    TODO: much better is if we have internal timer component but takes too much time
*/
const Renderer = ({ days, hours, minutes, seconds }: RendererProps) => {
  return (
    <div className={baseStyles.timer}>
      <div className={baseStyles.logoContainer}>
        <div className={baseStyles.figureLogo}/>
      </div>
      <div className={baseStyles.countdownContainer}>
        <div className={baseStyles.timerColumn}>
          <span className={baseStyles.number}>
            {days}
          </span>
          <span className={baseStyles.timeLabel}>
            {text.days()}
          </span>
        </div>
        <div className={baseStyles.timerColumn}>
          <span className={baseStyles.number}>
            {hours}
          </span>
          <span className={baseStyles.timeLabel}>
            {text.hours()}
          </span>
        </div>
        <div className={baseStyles.timerColumn}>
          <span className={baseStyles.number}>
            {minutes}
          </span>
          <span className={baseStyles.timeLabel}>
            {text.minutes()}
          </span>
        </div>
        <div className={baseStyles.timerColumn}>
          <span className={baseStyles.number}>
            {seconds}
          </span>
          <span className={baseStyles.timeLabel}>
            {text.seconds()}
          </span>
        </div>
      </div>
    </div>
  )
};

type InfoBlocksProps = {
  currentBlock: number;
  meanBlockTime: number;
  price: number;
};

const InfoBlocks = ({ currentBlock, meanBlockTime, price }: InfoBlocksProps) => {
  const styles = useStyles(themedStyles);
  return (
    <div className={styles.infoBlocks}>
      <div className={styles.infoBlock}>
        <span className={styles.data}>
          {currentBlock}
        </span>
        <span className={styles.label}>
          {text.currentHeight()}
        </span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.data}>
          {Math.trunc(meanBlockTime)} s
        </span>
        <span className={styles.label}>
          {text.meanTime()}
        </span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.data}>
          {data.halvingBlock() - currentBlock}
        </span>
        <span className={styles.label}>
          {text.untilHaving()}
        </span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.data}>
          ${price}
        </span>
        <span className={styles.label}>
          {text.price()}
        </span>
      </div>
    </div>
  )
}

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
      <InfoBlocks currentBlock={state.currentBlock} meanBlockTime={state.blockTime} price={price}/>
    </StandardPage>
  );
});

export const Home = observer(() => {
  const [store] = React.useState(
    new HomeStore(GlobalThemeStore.get() === Theme.DAYLIGHT ? false : true)
  );
  return <BaseHome store={store}/>
});

