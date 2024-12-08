import { CardanoSyncClient } from "npm:@utxorpc/sdk";

async function fetchBlockExample() {
  const syncClient = new CardanoSyncClient({
    uri: "http://localhost:50051",
  });

  const tipIter = syncClient.followTip(
    [],
  );

  for await (const tip of tipIter) {
    console.log(tip);
  }
}

fetchBlockExample().catch(console.error);
