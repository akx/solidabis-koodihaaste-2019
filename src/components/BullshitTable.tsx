import React from "react";
import { BullshitTableRow } from "./BullshitTableRow";
import { DecodedBullshit } from "../types";

interface BullshitTableProps {
  decodedBullshits: readonly DecodedBullshit[];
  threshold: number;
}

export const BullshitTable: React.FC<BullshitTableProps> = ({
  decodedBullshits,
  threshold,
}) => (
  <table>
    <thead>
      <tr>
        <th>Phrase</th>
        <th>Score</th>
        <th>Shift</th>
      </tr>
    </thead>
    {decodedBullshits.map(bs => (
      <BullshitTableRow bs={bs} threshold={threshold} key={bs.original} />
    ))}
  </table>
);
