import React from 'react';
import baseStyles from '../home.module.css';
import text from '../home_text';
import data from '../formula';
import { useStyles } from '../../../ui/themes';
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
  )
};

type InfoBlocksProps = {
  currentBlock: number;
  meanBlockTime: number;
  price: number;
};

export const InfoBlocks = ({ currentBlock, meanBlockTime, price }: InfoBlocksProps) => {
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
