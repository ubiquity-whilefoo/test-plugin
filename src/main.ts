import { runPlugin } from "./plugin";
import { createActionsPlugin } from "@ubiquity-os/ubiquity-os-kernel";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";

const inputs = github.context.payload.inputs;
const octokit = new Octokit({ auth: inputs.authToken });
octokit.rest.repos
  .createDispatchEvent({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    event_type: "return-data-to-ubiquity-os-kernel",
    client_payload: {
      state_id: inputs.stateId,
      output: null,
    },
  })
  .then(console.log)
  .catch(console.error);

createActionsPlugin(runPlugin, {
  kernelPublicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsdKRgFiOZ9xC8B9NGhTh
fceon3/ypqCzRoJAXnbI+qdgZfgKtWsQILbrLeRtT2W8/NA9rBBfTIIZRfLfSEAS
T8tYCFEWb5xv67RUoN1Jd2iRrbmdT2/gA5J6CBp/PrygqF2o79IpSEC50qOw2aRD
Nw4GEonX1NABnPZy+P9WxZFdQotl/s6Cfgh6EDFhmmfU4gpRmHVrG7ztkcYByX6e
a/B/780Kt6QQDNJ8tuEm+vJ1kihYrz5jt47YTifCRrjPnqD57sa0FCObGSMyVl8k
+sHL5LbY0lhPlI0XZDe6UTnUvrataKd5teR+V6jKzarpKn/513PMUyZwWU3dLiZo
uwIDAQAB
-----END PUBLIC KEY-----
`,
})
  .then(console.log)
  .catch(console.error);
