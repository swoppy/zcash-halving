export default {
  headerTitle: () =>
    "The November 2020 halving was already concluded, the next halving will be in 2024.",
  days: () => "days",
  hours: () => "hours",
  minutes: () => "minutes",
  seconds: () => "seconds",
  currentHeight: () => "Current block height",
  meanTime: () => "Block mean time",
  untilHaving: () => "Blocks till halving",
  hashrate: () => "Hashrate",
  siteUrl: () => "https://zcashblockhalf.com",
  title: () => "Zcash block reward halving",
  altTitle: () => "Zcash halving countdown",
  eta: (date: string) => `ETA date: ${date}`,
  metaDesc: () =>
    "Zcash halving is block interval specific, this means that the halving will occur once the blockchain reached a certain block interval.",
  q1: () => "What is the Zcash Halving?",
  a1: () => `
    Zcash Halving is the event where the number of Zcash Block Reward Subsidy per block will be halved (divided by 2).
    The total number of ZEC mined by miners per block will reduce from 6.25 ZEC to 3.125 ZEC in the next halving at block 1,046,400.
    Other than the decrease in Block Reward Subsidy, the next Zcash halving will also see the sunsetting on the Zcash Founder's Reward.`,
  q2: () => "What is the Expected Date of the Zcash Halving?",
  a2: () => `
    Zcash halving is block interval specific, this means that the halving will occur once the blockchain
    reached a certain block interval. As per the Zcash Blossom Upgrade, the halving block interval has been
    delayed to block 1,046,400. Based on current estimates of 75 seconds per block, the halving should occur
    during November 2020.`,
  q3: () => "Why are Zcash halvings significant?",
  a3: () => `
    Halvings are at the core of the cryptocurrency economic models because they ensure coins will be issued
    at a steady pace, following a predictable decaying rate. Such a controlled rate of monetary inflation is
    one of the main differences between cryptocurrencies and traditional fiat currencies, which essentially
    have an infinite supply.`,
  q4: () => "What is Zcash?",
  a4: () => `
    Zcash is a peer-to-peer cryptocurrency and was created as a fork of Bitcoin and quite like bitcoin it also
    has a hard limit of 21 million coins. Zcash started as a fork of the bitcoin blockchain on October 28, 2016.
    Earlier it was called the Zerocoin protocol before it was transformed into the Zerocash system and then finally,
    Zcash. But Unlike bitcoin, Zcash aims to provide and enhance privacy for users through some ingenious cryptography called zk-SNARKs.
    It is being developed by Electric Coin Company founded by Zooko Wilcox.`,
  q5: () => "How to buy Zcash?",
  a5: (to: string, text: string, style: string) => `
    ZEC is the currency symbol for Zcash, you can buy and trade them at numerous exchanges such as
    <a href=${to} rel='noopener noreferrer' target='_blank' class=${style}>${text}</a> and others. 
    Binance was launched in 2017 and has become the world's leading cryptocurrency exchange,
    has 500+ markets and more than 4 billion (USD)
    in daily trading volume.`, // this is kinda ugly :)
  stats: () => "Stats",
  zecInCirculation: () => "Total ZEC in circulation",
  zecSupply: () => "Total ZEC supply",
  percentMined: () => "Percentage of ZEC mined",
  zecMarketCap: () => "ZEC marketcap (USD)",
  zecPrice: () => "ZEC price (USD)",
  refLink: () => "https://bit.ly/zcashblockhalf",
  twitterSwoppy: () => "https://twitter.com/heyswoppy",
  anondranCrypto: () => "https://twitter.com/AnondranCrypto",
  ethLabel: () => "Tip ETH",
  tZecLabel: () => "Tip t-ZEC",
  zZecLabel: () => "Tip z-ZEC",
  ethAddress: () => "0x7A16Cd69ae74c8804AA5Bf09eD54Fb36628AF7EA",
  zecTAddress: () => "t1gmqwB7mv8TEau6iZxPyg9VRz2PV6cUvfG",
  zecZAddress: () =>
    "zs1hqddkfx49vzlu33pa5fnqlv2vgq869w5m552hlfwzqwfwam5s7menjx934ndr4d994k7g95mp7p",
};
