import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MidiService {
  onMessage = new EventEmitter();

  constructor() {
    (<any>window.navigator).requestMIDIAccess().then(this.success.bind(this), this.failure.bind(this));
  }

  success(midi) {
    const inputs = midi.inputs.values();
    for (let input = inputs.next();
      input && !input.done;
      input = inputs.next()) {
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  failure() {
    console.error('No access to your midi devices.')
  }

  onMIDIMessage(message) {
    const [ channel, note, velocity ] = message.data;
    this.onMessage.next({ channel, note, velocity });
  }
}
