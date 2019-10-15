// Most common ngrams from the most common Finnish words.
export const finnishNgrams = require("./data/ngrams.json");

export function countNgrams(s: string, grams: readonly string[]): number {
  let sum = 0;
  grams.forEach(gram => {
    sum += s.includes(gram) ? 1 : 0;
  });
  return sum / grams.length;
}
