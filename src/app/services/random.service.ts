import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {

  constructor() { }

  getRandomString(length) {
    const mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return this.r(mask, length);
  }

  getRandomNumber(length) {
    const mask = '0123456789';
    return this.r(mask, length);
  }

  r(mask, length) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
  }

  getAppTitle() {
    return `${this.getRandomString(2)}${this.getRandomNumber(1)}`;
  }

}
