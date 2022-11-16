import { Injectable } from '@angular/core';
import { Crypto } from '../core/utils/crypto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storagePrefix = 'polizas_';

  //   constructor(private _localStorage: LocalStorage) {}

  public setValue(
    key: KeyStorage | string,
    val: any,
    isEncrypt: boolean = false
  ): void {
    let value: any;
    if (isEncrypt === true) {
      value = Crypto.encrypt(val);
    } else {
      value = val;
    }

    localStorage.setItem(this._getKey(key), JSON.stringify(value));
  }

  /**
   * getValue
   */
  public getValue(
    key: KeyStorage | string,
    isEncrypt: boolean = false,
    defaultVal?: any
  ): any {
    let result: any;
    const value: any = localStorage[this._getKey(key)]
      ? JSON.parse(localStorage[this._getKey(key)])
      : defaultVal || false;

    if (isEncrypt === true) {
      result = Crypto.decrypt(value);
    } else {
      result = value;
    }

    return result;
  }

  /**
   * Arma la estructura de Key de la APP
   * @example "'brickcontrol_' + 'user'"
   */
  private _getKey(key: KeyStorage | string) {
    return this.storagePrefix + key;
  }
}

export enum KeyStorage {
  TOKEN = 'token',
  IS_LOGGED_IN = 'is_logged_in',
  IS_SHOW_CHAT = 'is_show_chat',
}
