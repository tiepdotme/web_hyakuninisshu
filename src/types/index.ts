export interface Karuta {
  readonly id: number;
  readonly imageNo: string;
  readonly creator: string;
  readonly firstKanji: string;
  readonly firstKana: string;
  readonly secondKanji: string;
  readonly secondKana: string;
  readonly thirdKanji: string;
  readonly thirdKana: string;
  readonly fourthKanji: string;
  readonly fourthKana: string;
  readonly fifthKanji: string;
  readonly fifthKana: string;
  readonly kimariji: number;
  readonly color: string;
  readonly translation: string;
}

export interface YomiFuda {
  readonly karutaId: number;
  readonly firstText: string;
  readonly secondText: string;
  readonly thirdText: string;
}

export interface ToriFuda {
  readonly karutaId: number;
  readonly fourthText: string;
  readonly fifthText: string;
}

export interface Question {
  readonly correctKaruta: Karuta;
  readonly yomifuda: YomiFuda;
  readonly torifudas: ToriFuda[];
}

export interface OptionItem<T> {
  readonly name: string;
  readonly value: T;
}
