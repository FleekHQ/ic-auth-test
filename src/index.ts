import { Ed25519KeyIdentity } from "@dfinity/identity";
import { HttpAgent, Actor, Principal, ActorSubclass } from "@dfinity/agent";
import { config } from "dotenv";
// import fetch from 'cross-fetch';
import walletIDLFactory from "./wallet/wallet.did";
import WalletService from "./wallet/wallet";
import defaultAgent from "./utils/agent";

config();

const canisterId = process.env.WALLET_CANISTER;
const secret = process.env.BASE64_SECRET;
const buff = Buffer.from(secret, "base64");
const identity = Ed25519KeyIdentity.fromSecretKey(buff.slice(buff.length - 64));

const handler = async () => {
  const agent = new HttpAgent({
    source: await defaultAgent,
    identity,
    // fetch,
  });

  const actor = Actor.createActor<ActorSubclass<WalletService>>(
    walletIDLFactory,
    { agent, canisterId }
  );

  console.log("principal id", identity.getPrincipal().toText());

  actor.wallet_balance().then((res) => {
    console.log("wallet balanace", res);

    actor
      .wallet_call({
        canister: Principal.fromText("bqdjp-7iaaa-aaaad-qabgq-cai"),
        method_name: "canister_status",
        cycles: 0 as unknown as bigint,
        args: [],
      })
      .then(console.log);
  });
};

handler();
