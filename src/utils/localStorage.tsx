const crypto = require("crypto");

const SECRET_KEY = crypto.randomBytes(32).toString("hex");

export const saveToLocalStorage = (key: string, data: any): void => {
  const encryptedData = crypto.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  localStorage.setItem(key, encryptedData);
};

export const getFromLocalStorage = (key: string): any | null => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    const decryptedData = crypto.AES.decrypt(
      encryptedData,
      SECRET_KEY
    ).toString(crypto.enc.Utf8);
    return JSON.parse(decryptedData);
  }
  return null;
};
