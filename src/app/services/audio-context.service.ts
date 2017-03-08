import { Injectable } from '@angular/core';

@Injectable()
export class AudioContextService {
  private ctx = new window.AudioContext();
  public currentTime = this.ctx.currentTime;

  constructor() {}

  get() {
    return this.ctx;
  }

}
