import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {

  constructor() { }

  getRandomString(length) {
    let result = '';
    const mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = length; i > 0; --i) {
      result += mask[Math.floor(Math.random() * mask.length)];
    };

    return result;
  }

  getRandomNumber(length) {
    let result = '';
    const mask = '0123456789';

    for (let i = length; i > 0; --i) {
      result += mask[Math.floor(Math.random() * mask.length)];
    };

    return result;
  }

  getAppTitle() {
    return `${this.getRandomString(2)}${this.getRandomNumber(1)}`;
  }

}
