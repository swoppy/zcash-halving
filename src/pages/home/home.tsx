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
import { Renderer, InfoBlocks, Faq, Stats, Footer, LeadSection } from './components/components';
import { Helmet } from 'react-helmet';

type HomeStyleProps = {
  headerContainer: string;
  leadSection: string;
  leadsLink: string;
  binanceLogoWrapper: string;
  binanceLogo: string;
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
  footerContainer: string;
  footer: string;
  link: string;
  tipBoxConainer: string;
  qrContainer: string;
  zecqr: string;
  ethqr: string;
  tooltiptext: string;
  approxDate: string;
  screenshotView: string;
};

export const themedStyles: ThemedStyles<HomeStyleProps> = {
  [Theme.DAYLIGHT]: {
    headerContainer: baseStyles.baseHeaderContainer,
    leadSection: baseStyles.daylightLeadSection,
    leadsLink: baseStyles.daylightLeadsLink,
    binanceLogoWrapper: baseStyles.binanceLogoWrapper,
    binanceLogo: baseStyles.binanceLogo,
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
    footerContainer: baseStyles.daylightFooterContainer,
    footer: baseStyles.footer,
    link: baseStyles.link,
    tipBoxConainer: baseStyles.tipBoxContainer,
    qrContainer: baseStyles.qrContainer,
    zecqr: baseStyles.zecqr,
    ethqr: baseStyles.ethqr,
    tooltiptext: baseStyles.tooltiptext,
    approxDate: baseStyles.daylightApproxDate,
    screenshotView: baseStyles.screenshotView,
  },
  [Theme.MIDNIGHT]: {
    headerContainer: baseStyles.midnightHeaderContainer,
    leadSection: baseStyles.midnightLeadSection,
    leadsLink: baseStyles.midnightLeadsLink,
    binanceLogoWrapper: baseStyles.binanceLogoWrapper,
    binanceLogo: baseStyles.binanceLogo,
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
    widgetContainer: baseStyles.midnightWidgetContainer,
    statSheet: baseStyles.statSheet,
    sheetRow: baseStyles.midnightSheetRow,
    statLabel: baseStyles.midnightStatLabel,
    statData: baseStyles.midnightStatData,
    footerContainer: baseStyles.midnightFooterContainer,
    footer: baseStyles.midnightFooter,
    link: baseStyles.link,
    tipBoxConainer: baseStyles.tipBoxContainer,
    qrContainer: baseStyles.qrContainer,
    zecqr: baseStyles.zecqr,
    ethqr: baseStyles.ethqr,
    tooltiptext: baseStyles.tooltiptext,
    approxDate: baseStyles.midnightApproxDate,
    screenshotView: baseStyles.screenshotView,
  },
};

type BaseHomeProps = {
  store: HomeStore;
};

/* countdown formula
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

  /*  for the countdown data
  * use a constant mean block time of 75s before 1011800 (approx. 30 days before halving) but after it will be dynanmic
  */
  React.useEffect(() => {
    fetch('https://api.zcha.in/v2/mainnet/network')
      .then(response => response.json())
      .then(data => setHalvingInfo({
        currentBlock: data.blockNumber,
        blockTime: data.blockNumber > 1011800 ? data.meanBlockTime : 75, // as per revsion
        hashrate: data.hashrate,
    }))
  }, [halvingInfo.blockTime, halvingInfo.currentBlock, halvingInfo.hashrate]);

  // for Stats section
  React.useEffect(() => {
    fetch('https://api.coincap.io/v2/assets/zcash')
      .then(response => response.json())
      .then(api => setEconomicInfo({
        price: api.data.priceUsd,
        totalSupply: api.data.maxSupply,
        circulatingSupply: api.data.supply,
        marketCap: api.data.marketCapUsd,
      }))
  }, [economicInfo.price, economicInfo.totalSupply, economicInfo.circulatingSupply, economicInfo.marketCap])

  const date = Date.now() + Math.trunc(halvingInfo.blockTime * (data.halvingBlock() - halvingInfo.currentBlock)) * 1000;
  const localDate = new Date(date).toUTCString();
  const dateUTC = localDate.replace(/GMT/gi, 'UTC');
  return (
    <StandardPage>
      <Helmet>
        <title>{text.altTitle()}</title>
        <meta name='description' content={text.metaDesc()}/>
        <meta property='og:title' content={text.altTitle()}/>
        <meta property='og:url' content={text.siteUrl()}/>
        <meta property='og:description' content={text.metaDesc()}/>
        <meta property='twitter:title' content={text.altTitle()}/>
        <meta property='twitter:url' content={text.siteUrl()}/>
        <meta property='twitter:description' content={text.metaDesc()}/>
      </Helmet>
      <LeadSection/>
      <div className={styles.headerContainer}>
        <div className={styles.themeContainer}>
          <SwitchInput store={store.theme}/>
        </div>
        <div className={styles.title}>
          <h2>{text.headerTitle()}</h2>
        </div>
      </div>
      <div className={styles.halvingInfo}>
        <div className={styles.screenshotView} id='countdownTimer'>
          <div className={styles.approxDate}>{text.eta(dateUTC)}</div>
          <div className={styles.timerContainer}>
            <Countdown date={date} renderer={Renderer}/>
          </div>
        </div>
        <InfoBlocks
          currentBlock={halvingInfo.currentBlock}
          meanBlockTime={halvingInfo.blockTime}
          hashrate={halvingInfo.hashrate}
        />
      </div>
      <Faq/>
      <Stats
        marketCap={economicInfo.marketCap}
        totalSupply={economicInfo.totalSupply}
        circulatingSupply={economicInfo.circulatingSupply}  
      />
      <Footer/>
    </StandardPage>
  );
});

export const Home = observer(() => {
  const [store] = React.useState(
    new HomeStore(GlobalThemeStore.get() === Theme.MIDNIGHT)
  );

  return <BaseHome store={store}/>
});

