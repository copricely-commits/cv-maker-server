
import crypto from "crypto";
const ALGO = "aes-256-gcm";
const ITER = 150_000;
const KEYLEN = 32;
const IVLEN = 12;

export function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, ITER, KEYLEN, "sha256");
}

export function encryptForClient(data, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(IVLEN);
  const key = deriveKey(password, salt);

  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const text = Buffer.from(JSON.stringify(data), "utf8");
  const enc = Buffer.concat([cipher.update(text), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    v: 1,
    algo: "AES-256-GCM",
    kdf: "PBKDF2-SHA256",
    iter: ITER,
    ct: Buffer.concat([enc, tag]).toString("base64"),
    iv: iv.toString("base64"),
    salt: salt.toString("base64"),
  };
}



export function generateId(){
    return Date.now().toString(36)+Math.random().toString(36).substring(2,5)
}
