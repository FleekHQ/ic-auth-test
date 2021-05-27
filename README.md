# ic-auth-test

Steps to reproduce:
1. `cp .env.template .env`
2. set env variables (base64 encoded secret from `~/.config/dfx/identity/default/identity.pem` and wallet canister id associated with this identity)
3. `yarn build`
4. `node dist/index`
