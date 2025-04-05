import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const isDev = process.env.NODE_ENV === "development";

const algorithm = "aes-256-cbc";
const secretKey = crypto
   .createHash("sha256")
   .update(process.env.SECRET_KEY || "")
   .digest(); // Ensure 32 bytes

/**
 * Encrypts a password using AES-256-CBC
 * @param password - The plaintext password
 * @returns {string} - The encrypted password in the format IV:Ciphertext
 */
export function encryptPassword(password: string): string {
   const iv = crypto.randomBytes(16); // IV must be 16 bytes
   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
   let encrypted = cipher.update(password, "utf8", "hex");
   encrypted += cipher.final("hex");

   return `${iv.toString("hex")}:${encrypted}`; // Store IV with encrypted data
}

/**
 * Decrypts an encrypted password
 * @param encryptedData - The encrypted string in the format IV:Ciphertext
 * @returns {string} - The decrypted plaintext password
 */
export function decryptPassword(encryptedData: string): string {
   const [ivHex, encrypted] = encryptedData.split(":");

   if (!ivHex || Buffer.from(ivHex, "hex").length !== 16) {
      throw new Error("Invalid IV format or length");
   }

   const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(ivHex, "hex")
   );

   let decrypted = decipher.update(encrypted, "hex", "utf8");
   decrypted += decipher.final("utf8");
   return decrypted;
}
