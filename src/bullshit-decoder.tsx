import { caesar, finnishShiftTables } from "./caesar";
import { countNgrams, finnishNgrams } from "./lang-guess";

export interface ShiftResult {
  shift: number;
  result: string;
  score: number;
}

export interface DecodedBullshit {
  original: string;
  shiftResults: ShiftResult[];
}

export function decodeBullshit(bs: string): DecodedBullshit {
  const shiftResults: ShiftResult[] = [];
  for (let shift = 0; shift < finnishShiftTables.maxShift; shift++) {
    let result = caesar(bs, shift, finnishShiftTables);
    const score = countNgrams(result, finnishNgrams);
    shiftResults.push({ shift, result, score });
  }
  return { original: bs, shiftResults };
}
