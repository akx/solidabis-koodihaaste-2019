import React from "react";
import { decodeBullshit } from "../utils/decodeBullshit";
import { DecodedBullshit } from "../types";

interface ControlsProps {
  threshold: number;
  setThreshold: (n: number) => void;
  bullshits: readonly DecodedBullshit[];
  setBullshits: (bs: DecodedBullshit[]) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  threshold,
  setThreshold,
  bullshits,
  setBullshits,
}) => {
  const [newPhrase, setNewPhrase] = React.useState<string>("");
  return (
    <div className="controls">
      <label>
        Detection Threshold [{threshold.toFixed(3)}
        ]:
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.001}
          value={threshold}
          onChange={e => setThreshold(e.target.valueAsNumber)}
        />
      </label>
      <form
        onSubmit={e => {
          const phrase = newPhrase.trim();
          if (phrase.length) {
            const newBullshits = [decodeBullshit(phrase)].concat(bullshits);
            setBullshits(newBullshits);
            setNewPhrase("");
          }
          e.preventDefault();
          return false;
        }}
      >
        Add new bullshit:{" "}
        <input value={newPhrase} onChange={e => setNewPhrase(e.target.value)} />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};
