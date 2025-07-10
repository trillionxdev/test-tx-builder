import { VirtueClient } from "@virtue/sdk";

async function main() {
  const virtueClient = new VirtueClient({
    sender:
      "0x99117af9eff00799ec35a0bc3039219617e2e22a2ddccee8704ffffbaf3b7800",
  });

  const tx = await virtueClient.buildManagePositionTransaction({
    collateralSymbol: "stIOTA",
    depositAmount: "1000000000",
    borrowAmount: "0",
    repaymentAmount: "0",
    withdrawAmount: "0",
  });

  const txBytes = await tx.build({ client: virtueClient.getIotaClient() });
  const res = await virtueClient.getIotaClient().dryRunTransactionBlock({
    transactionBlock: txBytes,
  });
  console.log(res.events);
}

main().catch((err) => console.error(err));
