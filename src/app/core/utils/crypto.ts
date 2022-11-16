/// <reference types="crypto-js" />
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

const KEY: string = environment.secretKeyCrypto;

export class Crypto {
  public static encrypt(text: string): string {
    const ciphertext: string = CryptoJS.AES.encrypt(text, KEY).toString();
    return ciphertext;
  }

  public static decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), KEY);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}