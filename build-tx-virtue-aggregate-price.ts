import { VirtueClient } from "@virtue/sdk";

async function main() {
  const virtueClient = new VirtueClient({
    sender:
      "0x99117af9eff00799ec35a0bc3039219617e2e22a2ddccee8704ffffbaf3b7800",
  });

  await virtueClient.aggregatePrice("IOTA");

  const tx = virtueClient.getTransaction();
  tx.setSender(virtueClient.sender);
  const txBytes = await tx.build({ client: virtueClient.getIotaClient() });
  const res = await virtueClient.getIotaClient().dryRunTransactionBlock({
    transactionBlock: txBytes,
  });
  console.log(res.events);
}

main().catch((err) => console.error(err));
