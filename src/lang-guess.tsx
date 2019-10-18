import { sortBy, toPairs } from "lodash";

type NgramMap = { [s: string]: number };
// Most common ngrams from the most common Finnish words.
export const finnishNgrams = new Set(require("./data/ngrams.json"));

export function computeNgrams(
  s: string,
  lengths: readonly number[],
  cutoff: number,
): NgramMap {
  const occurrences: NgramMap = {};
  let nTotal = 0;
  lengths.forEach((length) => {
    for (let i = 0; i < s.length - length; i++) {
      const sub = s.substring(i, i + length);
      if (/^[a-zåäö]+$/i.exec(sub)) {
        occurrences[sub] = (occurrences[sub] || 0) + 1;
        nTotal++;
      }
    }
  });
  const cutoffNgrams = sortBy(toPairs(occurrences), p => -p[1]).slice(0, cutoff);
  const normalizedOccurrences = {};
  sortBy(toPairs(occurrences), p => -p[1]).slice(0, cutoff).forEach(([ngram, n]) => {
    normalizedOccurrences.set(ngram, n / nTotal * 10000);
  });


  const sortedOccurrences = occurrences.const;
  normalizedOccurrences = new Map();
  occurrences.forEach((n, ngram) => {
  });
  return normalizedOccurrences;
}

export function countNgrams(s: string, grams: readonly string[]): number {
  let sum = 0;
  grams.forEach(gram => {
    sum += s.includes(gram) ? 1 : 0;
  });
  return sum / grams.length;
}

export function compareNgramMaps(m1: NgramMap, m2: NgramMap) {
  const keys = new Set();
}
