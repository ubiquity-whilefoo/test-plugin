import { runPlugin } from "./plugin";
import { createActionsPlugin } from "@ubiquity-os/ubiquity-os-kernel";
import * as github from "@actions/github";

export async function verifySignature(publicKeyPem: string, payload: unknown, signature: string) {
  try {
    console.log(signature);
    console.log(JSON.stringify(payload));
    const pemContents = publicKeyPem.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").trim();
    console.log(pemContents);
    const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

    const publicKey = await crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      true,
      ["verify"]
    );

    const signatureArray = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
    const dataArray = new TextEncoder().encode(JSON.stringify(payload));

    return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, signatureArray, dataArray);
  } catch (error) {
    console.error(error);
    return false;
  }
}

console.log(github.context.payload.inputs);

const githubInputs = { ...github.context.payload.inputs };
const signature = githubInputs.signature;
delete githubInputs.signature;
verifySignature(
  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsdKRgFiOZ9xC8B9NGhTh
fceon3/ypqCzRoJAXnbI+qdgZfgKtWsQILbrLeRtT2W8/NA9rBBfTIIZRfLfSEAS
T8tYCFEWb5xv67RUoN1Jd2iRrbmdT2/gA5J6CBp/PrygqF2o79IpSEC50qOw2aRD
Nw4GEonX1NABnPZy+P9WxZFdQotl/s6Cfgh6EDFhmmfU4gpRmHVrG7ztkcYByX6e
a/B/780Kt6QQDNJ8tuEm+vJ1kihYrz5jt47YTifCRrjPnqD57sa0FCObGSMyVl8k
+sHL5LbY0lhPlI0XZDe6UTnUvrataKd5teR+V6jKzarpKn/513PMUyZwWU3dLiZo
uwIDAQAB
-----END PUBLIC KEY-----`,
  githubInputs,
  signature
)
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
