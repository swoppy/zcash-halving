import React from 'react';
import baseStyles from '../home.module.css';
import text from '../home_text';
import data from '../formula';
import { useStyles, GlobalThemeStore, Theme } from '../../../ui/themes';
import { themedStyles } from '../home';

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
export const Renderer = ({ days, hours, minutes, seconds }: RendererProps) => {
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
  );
};

type InfoBlocksProps = {
  currentBlock: number;
  meanBlockTime: number;
  hashrate: number;
};

export const InfoBlocks = ({ currentBlock, meanBlockTime, hashrate }: InfoBlocksProps) => {
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
          {hashrate}
        </span>
        <span className={styles.label}>
          {text.hashrate()}
        </span>
      </div>
    </div>
  );
};

export const Faq = () => {
  const styles = useStyles(themedStyles);
  return (
    <div className={styles.faqContainer}>
      <div className={styles.alphaSection}>
        <div className={styles.question}>
          {text.q1()}
        </div>
        <div className={styles.answer}>
          {text.a1()}
        </div>
        <div className={styles.question}>
          {text.q2()}
        </div>
        <div className={styles.answer}>
          {text.a2()}
        </div>
        <div className={styles.question}>
          {text.q3()}
        </div>
        <div className={styles.answer}>
          {text.a3()}
        </div>
      </div>
    </div>
  );
};

const Widget = () => {
  const styles = useStyles(themedStyles);
  const theme = GlobalThemeStore.get() === Theme.DAYLIGHT;
  const widget = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "BITFINEX:ZECUSD",
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "dateRange": "all",
      "colorTheme": `${theme ? 'light' : 'dark'}`,
      "trendLineColor": "#37a6ef",
      "underLineColor": "rgba(55, 166, 239, 0.15)",
      "isTransparent": false,
      "autosize": true,
      "largeChartUrl": ""
    });
    widget.current?.appendChild(script);
    return () => {
      // removing first two element, so it won't overlap when it's time to rerender
      widget.current?.firstElementChild?.remove();
      widget.current?.firstElementChild?.remove();
    };
  }, [theme])
  return (
    <div className="tradingview-widget-container" ref={widget}>
    </div>
  );
};

type StatsProps = {
  totalCirculation: string;
  totalSupply: string;
  percentage: string;
};

export const Stats = () => {
  const styles = useStyles(themedStyles);
  return (
    <div className={styles.statsContainer}>
      <div className={styles.wsWrapper}>
        <div className={styles.widgetContainer}>
          <Widget/>
        </div>
        <div className={styles.statSheet}>
          <div className={styles.question}>
            {text.stats()}
          </div>
          <div className={`${styles.sheetRow} ${baseStyles.sheetRow}`}>
            <span className={styles.statLabel}>
              {text.statLabel1()}
            </span>
            <span className={styles.statData}>
              123123123123
            </span>
          </div>
          <div className={`${styles.sheetRow} ${baseStyles.sheetRow}`}>
            <span className={styles.statLabel}>
              {text.statLabel2()}
            </span>
            <span className={styles.statData}>
              123123123123
            </span>
          </div>
          <div className={`${styles.sheetRow} ${baseStyles.sheetRow}`}>
            <span className={styles.statLabel}>
              {text.statLabel3()}
            </span>
            <span className={styles.statData}>
              87623487
            </span>
          </div>
          <div className={`${styles.sheetRow} ${baseStyles.sheetRow}`}>
            <span className={styles.statLabel}>
              {text.statLabel4()}
            </span>
            <span className={styles.statData}>
              123123123123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};