import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition
} from '../enums/index';

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

export const toKimarijiString = (kimariji: KimarijiCondition) =>
  `${toChineseChar(kimariji)}字決まり`;

export const toKimarijiConditionString = (
  kimarijiCondition: KimarijiCondition
) =>
  kimarijiCondition === KimarijiCondition.None
    ? '指定しない'
    : toKimarijiString(kimarijiCondition);

export const toColorConditionString = (color: ColorCondition) => {
  switch (color) {
    case ColorCondition.Blue:
      return '青色';
    case ColorCondition.Pink:
      return '桃色';
    case ColorCondition.Yellow:
      return '黄色';
    case ColorCondition.Green:
      return '緑色';
    case ColorCondition.Orange:
      return '橙色';
    default:
      return '指定しない';
  }
};

export const toKarutaStyleConditionString = (
  karutaStyle: KarutaStyleCondition
) => {
  switch (karutaStyle) {
    case KarutaStyleCondition.KanjiAndKana:
      return '漢字と仮名で表示';
    case KarutaStyleCondition.KanaOnly:
      return 'すべて仮名で表示';
  }
};
