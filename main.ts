import { CardanoQueryClient, CardanoSyncClient } from "@utxorpc/sdk";
import { Buffer } from "node:buffer";
import { Assets, Constr, Data } from "@spacebudz/lucid";

async function fetchBlockExample() {
  const syncClient = new CardanoSyncClient({
    uri: "http://localhost:50051",
  });
  // const queryClient = new CardanoQueryClient({ uri: "http://localhost:50051" });
  // const plutusAsset = new Constr<Data>(0, [
  //   "",
  //   "",
  // ]);

  // const snekAdaMinswapV2 = queryClient.searchUtxosByAddress(
  //   Buffer.from(
  //     "f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c.2ffadbb87144e875749122e0bbb9f535eeaa7f5660c6c4a91bcc4121e477f08d",
  //     "hex",
  //   ),
  // );

  const tipIter = syncClient.followTip();

  for await (const tip of tipIter) {
    if (tip.action === "apply") {
      // query current snek / ada pair information.
      console.log(tip.block.body.tx[0].auxiliary);
      for (const tx of tip.block.body.tx) {
        if (tx.auxiliary.metadata.length > 0) {
          console.log(tx.auxiliary.metadata);
        }
      }
    }
  }
}

fetchBlockExample().catch(console.error);
