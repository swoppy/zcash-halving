export default {
  headerTitle: () => 'Zcash Block Reward Halving',
  days: () => 'days',
  hours: () => 'hours',
  minutes: () => 'minutes',
  seconds: () => 'seconds',
  currentHeight: () => 'Current block height',
  meanTime: () => 'Block mean time',
  untilHaving: () => 'Blocks till halving',
  hashrate: () => 'Hashrate',
  q1: () => 'What is the Zcash Halving?',
  a1: () => `
    Zcash Halving is the event where the number of Zcash Block Reward Subsidy per block will be halved (divided by 2).
    The total number of ZEC mined by miners per block will reduce from 12.5 ZEC to 6.25 ZEC in the next halving at block 1,046,400.
    Other than the decrease in Block Reward Subsidy, the next Zcash halving will also see the sunsetting on the Zcash`,
  q2: () => 'What is the Expected Date of the Zcash Halving?',
  a2: () => `
    Zcash halving is block interval specific, this means that the halving will occur once the blockchain
    reached a certain block interval. As per the Zcash Blossom Upgrade, the halving block interval has been
    delayed to block 1,046,400. Based on current estimates of 75 seconds per block, the halving should occur
    during November 2020.`,
  q3: () => 'Why are Zcash halvings significant?',
  a3: () => `
    Halvings are at the core of the cryptocurrency economic models because they ensure coins will be issued at a steady pace, following a predictable decaying rate. Such a controlled rate of monetary inflation is one of the main differences between cryptocurrencies and traditional fiat currencies, which essentially have an infinite supply.`,
  stats: () => 'Stats',
  statLabel1: () => 'Total ZEC in circulation',
  statValue1: (value: string) => value,
  statLabel2: () => 'Total ZEC supply',
  statValue2: (value: string) => value,
  statLabel3: () => 'Percentage of ZEC mined',
  statValue3: (value: string) => value,
  statLabel4: () => 'Zec marketcap',
};