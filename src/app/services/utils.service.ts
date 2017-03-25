import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  static pickRandom(max: number) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }

  static getUrlId() {
    return window.location.pathname.substr(1);
  }

  constructor() { }

}
