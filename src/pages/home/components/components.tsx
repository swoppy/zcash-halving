import React from 'react';
import baseStyles from '../home.module.css';
import text from '../home_text';
import data from '../formula';
import { useStyles, GlobalThemeStore, Theme } from '../../../ui/themes';
import { themedStyles } from '../home';
import { SimpleLink } from '../../../components/link/link';

const formatHashRate = (hashrate: number, decimals: number = 2) => {
  if (hashrate === 0) return '0 Hash';
  const h = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Hash', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];
  const i = Math.floor(Math.log(hashrate) / Math.log(h));
  return parseFloat((hashrate / Math.pow(h, i)).toFixed(dm)) + ' ' + sizes[i];
}

type RendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/*  component <Renderer> Unable to typecheck css in this component as <Countdown> doesnt accept renderer with hooks (useStyles)
    so I just used baseStyles directly
    TODO: much better is if we have internal timer component but takes too much time
*/
export const Renderer = ({ days, hours, minutes, seconds }: RendererProps) => {
  const details: { time: number, label: string}[] = [
    {
      time: days,
      label: text.days(),
    },
    {
      time: hours,
      label: text.hours(),
    },
    {
      time: minutes,
      label: text.minutes(),
    },
    {
      time: seconds,
      label: text.seconds(),
    },
  ];

  return (
    <div className={baseStyles.timer}>
      <div className={baseStyles.logoContainer}>
        <div className={baseStyles.figureLogo}/>
      </div>
      <div className={baseStyles.countdownContainer}>
        {details.map((item, key) => {
          return (
            <div className={baseStyles.timerColumn} key={key}>
              <span className={baseStyles.number}>
                {item.time}
              </span>
              <span className={baseStyles.timeLabel}>
                {item.label}
              </span>
            </div>
          );
        })}
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
  const blockDetails: { label: string, blockStat: number | string }[] = [
    {
      label: text.currentHeight(),
      blockStat: currentBlock,
    },
    {
      label: text.meanTime(),
      blockStat: meanBlockTime.toFixed(1) + 's',
    },
    {
      label: text.untilHaving(),
      blockStat: data.halvingBlock() - currentBlock,
    },
    {
      label: text.hashrate(),
      blockStat: formatHashRate(hashrate),
    },
  ]
  return (
    <div className={styles.infoBlocks}>
      {blockDetails.map((item, key) => {
        return (
          <div className={styles.infoBlock} key={key}>
            <span className={styles.data}>
              {item.blockStat}
            </span>
            <span className={styles.label}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const Faq = () => {
  const styles = useStyles(themedStyles);
  const faqDetails: { question: string, answer: string }[] = [
    {
      question: text.q4(),
      answer: text.a4(),
    },
    {
      question: text.q1(),
      answer: text.a1(),
    },
    {
      question: text.q2(),
      answer: text.a2(),
    },
    {
      question: text.q3(),
      answer: text.a3(),
    },
  ];
  return (
    <div className={styles.faqContainer}>
      <div className={styles.alphaSection}>
        {faqDetails.map((item, key) => {
          return (
            <div key={key}>
              <div className={styles.question}>
                {item.question}
              </div>
              <div className={styles.answer}>
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Widget = () => {
  const theme = GlobalThemeStore.get() === Theme.DAYLIGHT;
  const widget = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const currentElm = widget.current;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "BINANCE:ZECUSDT",
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "dateRange": "all",
      "colorTheme": `${theme ? 'light' : 'dark'}`,
      "trendLineColor": "#f5b728",
      "underLineColor": "rgba(245, 183, 40, 0.15)",
      "isTransparent": false,
      "autosize": true,
      "largeChartUrl": ""
    });
    currentElm?.appendChild(script);
    return () => {
      // removing first two elements, so it won't overlap when it's time to rerender, sort of like a cleanup
      currentElm?.firstElementChild?.remove();
      currentElm?.firstElementChild?.remove();
    };
  }, [theme])
  return (
    <div className="tradingview-widget-container" ref={widget}>
    </div>
  );
};

type StatsProps = {
  totalSupply: number;
  circulatingSupply: number;
  marketCap: number;
};

export const Stats = ({ totalSupply, circulatingSupply, marketCap }: StatsProps) => {
  const styles = useStyles(themedStyles);
  const statDetails: { label: string, figures: string | number }[] = [
    {
      label: text.zecMarketCap(),
      figures: Math.trunc(marketCap).toLocaleString(),
    },
    {
      label: text.zecInCirculation(),
      figures: Math.trunc(circulatingSupply).toLocaleString(),
    },
    {
      label: text.zecSupply(),
      figures: Math.trunc(totalSupply).toLocaleString(),
    },
    {
      label: text.percentMined(),
      figures: Math.trunc(circulatingSupply/totalSupply * 100) ? Math.trunc(circulatingSupply/totalSupply * 100) + '%' : 0,
    },
  ]
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
          {statDetails.map((item, key) => {
            return (
              <div className={`${styles.sheetRow} ${baseStyles.sheetRow}`} key={key}>
                <span className={styles.statLabel}>
                  {item.label}
                </span>
                <span className={styles.statData}>
                  {item.figures}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const styles = useStyles(themedStyles);
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div>
          © 2020 zcashblockhalf. Built by
          <SimpleLink to={text.twitterSwoppy()} target={'_blank'} text={' Swoppy'} className={styles.link}/>,
          contact
          <SimpleLink to={text.anondranCrypto()} target={'_blank'} text={' AnondranCrypto'} className={styles.link}/> for any inquiries.
        </div>
        <div className={styles.tipBoxConainer}>
          <div className={styles.qrContainer}>
            <div className={styles.ethqr}/>
            <span>{text.ethLabel()}</span>
            <span className={styles.tooltiptext}>{text.ethAddress()}</span>
          </div>
          <div className={styles.qrContainer}>
            <div className={styles.zecqr}/>
            <span>{text.zecLabel()}</span>
            <span className={styles.tooltiptext}>{text.zecAddress()}</span>
          </div>
        </div>
      </div>
    </div>   
  );
};