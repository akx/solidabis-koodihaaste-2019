import React from "react";
import { DecodedBullshit, ShiftResult } from "../types";

interface BullshitTableRowProps {
  bs: DecodedBullshit;
  threshold: number;
}

export const BullshitTableRow: React.FC<BullshitTableRowProps> = ({
  bs,
  threshold,
}) => {
  let bestResult: ShiftResult | undefined;
  bs.shiftResults.forEach(sr => {
    if (!bestResult || sr.score >= bestResult.score) {
      bestResult = sr;
    }
  });
  if (bestResult && bestResult.score >= threshold) {
    return (
      <tr className="no-bullshit">
        <td>{bestResult.result}</td>
        <td>{bestResult.score.toFixed(4)}</td>
        <td>{bestResult.shift}</td>
      </tr>
    );
  } else {
    return (
      <tr className="is-bullshit">
        <td>{bs.original}</td>
        <td className="best-bs-score">
          {bestResult ? bestResult.score.toFixed(4) : null}
        </td>
        <td />
      </tr>
    );
  }
};
