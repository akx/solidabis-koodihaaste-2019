import React from "react";
import useRemoteBullshit from "./hooks/useRemoteBullshit";
import {
  decodeRemoteBullshitList,
  initialDetectionThreshold,
} from "./utils/decodeBullshit";
import { Controls } from "./components/Controls";
import { BullshitTable } from "./components/BullshitTable";
import { DecodedBullshit } from "./types";

const App: React.FC = () => {
  const remoteBullshits = useRemoteBullshit();
  const [bullshits, setBullshits] = React.useState<DecodedBullshit[]>([]);
  const [threshold, setThreshold] = React.useState<number>(
    initialDetectionThreshold,
  );
  React.useEffect(() => {
    // Update the decoded bullshits state when remote bullshit is received.
    const newDecodedBullshits =
      remoteBullshits !== undefined
        ? decodeRemoteBullshitList(remoteBullshits, bullshits)
        : [];
    if (newDecodedBullshits.length !== 0) {
      setBullshits(bullshits.concat(newDecodedBullshits));
    }
  }, [bullshits, remoteBullshits]);

  return (
    <>
      <Controls
        threshold={threshold}
        setThreshold={setThreshold}
        bullshits={bullshits}
        setBullshits={setBullshits}
      />
      <BullshitTable decodedBullshits={bullshits} threshold={threshold} />
    </>
  );
};

export default App;
