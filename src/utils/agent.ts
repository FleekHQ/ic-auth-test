import { HttpAgent, makeNonceTransform } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import fetch from "cross-fetch";

const identity = Ed25519KeyIdentity.generate();
export const principal = identity.getPrincipal();

const agent = Promise.resolve(
  new HttpAgent({ host: "https://ic0.app", identity, fetch })
).then(async (agent) => {
  // await agent.fetchRootKey();
  // agent.addTransform(makeNonceTransform());
  return agent;
});

export default agent;
