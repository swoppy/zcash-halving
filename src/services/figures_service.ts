type ZchainProps = {
  blockNumber: number;
  meanBlockTime: number;
  hashrate: number
};

export const fetchZchain = async(): Promise<ZchainProps> => {
  const request = await fetch('https://api.zcha.in/v2/mainnet/network')
  const response = await request.json();
  return response;
}

type CoinCapProps = {
  priceUsd: number
  maxSupply: number;
  supply: number;
  marketCapUsd: number;
}

export const fetchCoinCap = async(): Promise<CoinCapProps> => {
  const request = await fetch('https://api.coincap.io/v2/assets/zcash')
  const response = await request.json();
  return response.data
}