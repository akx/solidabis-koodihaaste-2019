import React from "react";
import useRemoteBullshit from "./hooks/useRemoteBullshit";
import {
  decodeBullshit,
  DecodedBullshit,
  ShiftResult,
} from "./bullshit-decoder";

const BullshitTableRow: React.FC<{
  bs: DecodedBullshit;
  threshold: number;
}> = ({ bs, threshold }) => {
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

const App: React.FC = () => {
  const remoteBullshits = useRemoteBullshit();
  const [bullshits, setBullshits] = React.useState<DecodedBullshit[]>([]);
  const [threshold, setThreshold] = React.useState<number>(0.022);
  const [newPhrase, setNewPhrase] = React.useState<string>("");
  React.useEffect(() => {
    const newDecodedBullshits: DecodedBullshit[] = [];
    (remoteBullshits || []).forEach(bs => {
      if (!bullshits.find(dbs => dbs.original === bs)) {
        newDecodedBullshits.push(decodeBullshit(bs));
      }
    });
    if (newDecodedBullshits.length !== 0) {
      setBullshits(bullshits.concat(newDecodedBullshits));
    }
  }, [bullshits, remoteBullshits]);

  return (
    <>
      <div className="controls">
        <label>
          Detection Threshold [{threshold.toFixed(3)}]:
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
          <input
            value={newPhrase}
            onChange={e => setNewPhrase(e.target.value)}
          />
          <button type="submit">OK</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Phrase</th>
            <th>Score</th>
            <th>Shift</th>
          </tr>
        </thead>
        {bullshits.map(bs => (
          <BullshitTableRow bs={bs} threshold={threshold} key={bs.original} />
        ))}
      </table>
    </>
  );
};

export default App;
