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
import { Renderer, InfoBlocks, Faq, Stats } from './components/components';

type HomeStyleProps = {
  headerContainer: string;
  themeContainer: string;
  title: string;
  halvingInfo: string;
  countdownContainer: string;
  timerContainer: string;
  timer: string;
  infoBlocks: string;
  infoBlock: string;
  data: string;
  label: string;
  countdownInfoContainer: string;
  faqContainer: string;
  alphaSection: string;
  question: string;
  answer: string;
  statsContainer: string;
  wsWrapper: string;
  widgetContainer: string;
  statSheet: string;
  sheetRow: string;
  statLabel: string;
  statData: string;
};

export const themedStyles: ThemedStyles<HomeStyleProps> = {
  [Theme.DAYLIGHT]: {
    headerContainer: baseStyles.baseHeaderContainer,
    themeContainer: baseStyles.themeContainer,
    title: baseStyles.daylightTitle,
    timerContainer: baseStyles.daylightTimerContainer,
    countdownContainer: baseStyles.countdownContainer,
    timer: baseStyles.timer,
    infoBlocks: baseStyles.infoBlocksContainer,
    infoBlock: baseStyles.daylightInfoBlock,
    data: baseStyles.data,
    label: baseStyles.label,
    countdownInfoContainer: baseStyles.countdownInfoContainer,
    faqContainer: baseStyles.daylightFaqContainer,
    halvingInfo: baseStyles.daylightHalvingInfo,
    alphaSection: baseStyles.alphaSection,
    question: baseStyles.daylightQuestion,
    answer: baseStyles.daylightAnswer,
    statsContainer: baseStyles.daylightStatsContainer,
    wsWrapper: baseStyles.wsWrapper,
    widgetContainer: baseStyles.daylightWidgetContainer,
    statSheet: baseStyles.statSheet,
    sheetRow: baseStyles.daylightSheetRow,
    statLabel: baseStyles.daylightStatLabel,
    statData: baseStyles.daylightStatData,
  },
  [Theme.MIDNIGHT]: {
    headerContainer: baseStyles.midnightHeaderContainer,
    themeContainer: baseStyles.themeContainer,
    title: baseStyles.midnightTitle,
    timerContainer: baseStyles.midnightTimerContainer,
    countdownContainer: baseStyles.countdownContainer,
    timer: baseStyles.timer,
    infoBlocks: baseStyles.infoBlocksContainer,
    infoBlock: baseStyles.midnightInfoBlock,
    data: baseStyles.data,
    label: baseStyles.label,
    countdownInfoContainer: baseStyles.countdownInfoContainer,
    faqContainer: baseStyles.midnightFaqContainer,
    halvingInfo: baseStyles.midnightHalvingInfo,
    alphaSection: baseStyles.alphaSection,
    question: baseStyles.midnightQestion,
    answer: baseStyles.midnightAnswer,
    statsContainer: baseStyles.midnightStatsContainer,
    wsWrapper: baseStyles.wsWrapper,
    widgetContainer: baseStyles.widgetContainer,
    statSheet: baseStyles.statSheet,
    sheetRow: baseStyles.midnightSheetRow,
    statLabel: baseStyles.midnightStatLabel,
    statData: baseStyles.midnightStatData,
  },
};

const trimToNumber = (n: any) => {
  const num = Number(n);
  return num.toFixed(2);
}

type BaseHomeProps = {
  store: HomeStore;
};

/* countdonw formula
  remainingTime = meanBlockTIme * (currentBlock - halvingBlock)
*/
const BaseHome = observer(({ store }: BaseHomeProps) => {
  const styles = useStyles(themedStyles);
  const [halvingInfo, setHalvingInfo] = React.useState({
    currentBlock: 830818,
    blockTime: 75,
    hashrate: 0,
  });
  const [economicInfo, setEconomicInfo] = React.useState({
    price: 0,
    totalSupply: 0,
    circulatingSupply: 0,
    marketCap: 0,
  });

  React.useEffect(() => {
    // fetch('https://api.zcha.in/v2/mainnet/network')
    //   .then(response => response.json())
    //   .then(data => setHalvingInfo({
    //     currentBlock: data.blockNumber,
    //     blockTime: data.meanBlockTime,
    //     hashrate: data.hashrate,
    //   }))

      // fetch('https://api.coincap.io/v2/assets/zcash')
      //   .then(response => response.json())
      //   .then(data => setEconomicInfo(data.data.priceUsd))

  }, [halvingInfo, economicInfo]);

  // console.log(Math.trunc(state.blockTime * (data.halvingBlock() - state.currentBlock)));
  const date = Date.now() + Math.trunc(halvingInfo.blockTime * (data.halvingBlock() - halvingInfo.currentBlock)) * 1000;
  const placeholder = Date.now() + 500000000;
  return (
    <StandardPage>
      <div className={styles.headerContainer}>
        <div className={styles.themeContainer}>
          <SwitchInput store={store.theme}/>
        </div>
        <div className={styles.title}>
          <h2>{text.headerTitle()}</h2>
        </div>
      </div>
      <div className={styles.halvingInfo}>
        <div className={styles.timerContainer}>
          <Countdown date={date} renderer={Renderer}/>
        </div>
        <InfoBlocks
          currentBlock={halvingInfo.currentBlock}
          meanBlockTime={halvingInfo.blockTime}
          hashrate={halvingInfo.hashrate}
        />
      </div>
      <Faq/>
      <Stats/>
    </StandardPage>
  );
});

export const Home = observer(() => {
  const [store] = React.useState(
    new HomeStore(GlobalThemeStore.get() === Theme.MIDNIGHT)
  );

  return <BaseHome store={store}/>
});

