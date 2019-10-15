import React from "react";

async function fetchBullshit(): Promise<string[]> {
  // The API server does not allow the CORS preflight OPTIONS request,
  // so the following doesn't work.  Instead of bothering with a backend to proxy this request without
  // CORS constraints, the author has opted to include the response data in the repository.
  /*
  const secretResp = await fetch('https://koodihaaste-api.solidabis.com/secret');
  const { bullshitUrl, jwtToken } = await secretResp.json();
  const bullshitResp = await fetch(bullshitUrl, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const { bullshits } = await bullshitResp.json();
  */
  const bullshitResp = require("../data/api-response.json");
  const { bullshits } = bullshitResp;
  return bullshits.map((b: { message: string }) => b.message);
}

export default function useRemoteBullshit() {
  const [bullshitList, setBullshitList] = React.useState<string[] | undefined>(
    undefined,
  );
  React.useEffect(() => {
    fetchBullshit().then(shits => setBullshitList(shits));
  }, []);
  return bullshitList;
}
