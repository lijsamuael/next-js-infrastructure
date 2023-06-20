import CryptoJS from "crypto-js";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "default-secret-key";

export const encryptData = (data: any) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  return encryptedData;
};

export const decryptData = (data: any) => {
  if (data) {
    const decryptedBytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
  return null;
};

export function isTimestampWithinRange(
  timestamp: string,
  minutes: number
): boolean {
  const storedTime = new Date(timestamp);
  const currentTime = new Date();
  const diffInMinutes =
    Math.abs(currentTime.getTime() - storedTime.getTime()) / (1000 * 60);
  return diffInMinutes <= minutes;
}
