import { caesar, finnishShiftTables } from "./caesar";
import { DecodedBullshit, ShiftResult } from "../types";

// Most common ngrams from the most common Finnish words.
const finnishNgrams: Set<string> = new Set(require("../data/ngrams.json"));
// Lengths of ngrams in the ngram set.
const finnishNgramsLengths = [4, 5];
// Carefully tuned initial detection threshold
export const initialDetectionThreshold = 0.141;

function computeNgramScore(
  s: string,
  lengths: readonly number[],
  validSet: Set<string>,
): number {
  let nTotal = 0;
  let nValid = 0;
  lengths.forEach(length => {
    for (let i = 0; i < s.length - length; i++) {
      const sub = s.substring(i, i + length);
      if (/^[a-zåäö]+$/i.exec(sub)) {
        nTotal++;
        if (finnishNgrams.has(sub.toLowerCase())) {
          nValid++;
        }
      }
    }
  });
  return nValid / nTotal;
}

export function decodeBullshit(bs: string): DecodedBullshit {
  const shiftResults: ShiftResult[] = [];
  for (let shift = 0; shift < finnishShiftTables.maxShift; shift++) {
    let result = caesar(bs, shift, finnishShiftTables);
    const score = computeNgramScore(
      result,
      finnishNgramsLengths,
      finnishNgrams,
    );
    shiftResults.push({ shift, result, score });
  }
  return { original: bs, shiftResults };
}

export function decodeRemoteBullshitList(
  remoteBullshits: readonly string[],
  bullshits: readonly DecodedBullshit[],
) {
  const newDecodedBullshits: DecodedBullshit[] = [];
  (remoteBullshits || []).forEach(bs => {
    if (!bullshits.find(dbs => dbs.original === bs)) {
      newDecodedBullshits.push(decodeBullshit(bs));
    }
  });
  return newDecodedBullshits;
}
