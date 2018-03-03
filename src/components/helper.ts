const NUMS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

export const toChineseChar = (num: number) => {
  if (num === 100) {
    return '百';
  }

  const ret: string[] = [];

  const doubleDigits = Math.floor(num / 10);
  const singleDigits = num % 10;

  if (0 < doubleDigits) {
    if (1 < doubleDigits) {
      ret.push(NUMS[doubleDigits - 1]);
    }
    ret.push('十');
  }

  if (0 < singleDigits) {
    ret.push(NUMS[singleDigits - 1]);
  }

  return ret.join('');
};

export const toKarutaIdString = (karutaId: number) =>
  `${toChineseChar(karutaId)}番`;

export const toKimarijiString = (kimariji: number) =>
  `${toChineseChar(kimariji)}字決まり`;
