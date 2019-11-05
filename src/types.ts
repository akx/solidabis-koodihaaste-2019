export interface ShiftResult {
  shift: number;
  result: string;
  score: number;
}

export interface DecodedBullshit {
  original: string;
  shiftResults: ShiftResult[];
}
