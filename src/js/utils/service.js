import { LOTTO } from './constants.js';

const getRank = (winLottoNumbers, lottoNumbers, bonusNumber) => {
  const matchCount = lottoNumbers.reduce((acc, cur) => {
    return winLottoNumbers.includes(cur) ? acc + 1 : acc;
  }, 0);

  if (matchCount === 5) {
    return lottoNumbers.includes(bonusNumber) ? 'BONUS_WIN' : 5;
  }
  return matchCount;
};

const calculateRankState = (lottos, { winLottoNumbers, bonusNumber }) => {
  const rank = {
    3: 0,
    4: 0,
    5: 0,
    BONUS_WIN: 0,
    6: 0,
  };

  lottos.forEach((lotto) => {
    const lottoNumbers = lotto.getLottoNumbers();
    const currentRank = getRank(winLottoNumbers, lottoNumbers, bonusNumber);
    if (currentRank < LOTTO.MIN_WIN_COUNT) {
      return;
    }
    rank[currentRank]++;
  });

  return rank;
};

const calculateProfitRate = (rank, purchaseAmount) => {
  const prizeKeys = Object.keys(rank);

  const totalPrize = prizeKeys.reduce((acc, cur) => {
    return acc + LOTTO.LOTTO_PRIZE[cur] * rank[cur];
  }, 0);
  return Math.round(((totalPrize - purchaseAmount) / purchaseAmount) * 100);
};

export { getRank, calculateRankState, calculateProfitRate };
