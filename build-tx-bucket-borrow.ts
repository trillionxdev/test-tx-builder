import { BucketClient, buildBorrowTx } from "bucket-protocol-sdk";
import { Transaction } from "@mysten/sui/transactions";

async function main() {
  const bucketClient = new BucketClient();
  const tx = new Transaction();
  const sender =
    "0x95b0ce9775382b88a4e698d31a0a7fd796922c91bb80de66e940bd4cae5a9916";
  tx.setSender(sender);

  await buildBorrowTx(
    bucketClient,
    tx,
    "0xe44df51c0b21a27ab915fa1fe2ca610cd3eaa6d9666fe5e62b988bf7f0bd8722::musd::MUSD",
    "60000000000",
    "50000000000",
    sender,
  );

  const txBytes = await tx.build({ client: bucketClient.getSuiClient() });
  const res = await bucketClient.getSuiClient().dryRunTransactionBlock({
    transactionBlock: txBytes,
  });
  console.log(res.events);
}

main().catch((err) => console.error(err));
