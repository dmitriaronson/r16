import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MidiService {
  public onMessage = new EventEmitter();
  private midi: any;
  private devices = [];
  private supportedDevices = ['Launchpad Mini'];
  private colors = {
    off: 0,
    red: {
      low: 1,
      medium: 2,
      high: 3
    },
    yellow: {
      low: 17,
      medium: 34,
      high: 54
    },
    orange: {
      low: 45,
      medium: 46,
      high: 23
    },
    green: {
      low: 16,
      medium: 32,
      high: 48
    }
  };

  constructor() {
    (<any>window.navigator).requestMIDIAccess().then(this.success.bind(this), this.failure.bind(this));
  }

  success(midi) {
    const inputs = midi.inputs.values();
    const outputs = midi.outputs.values();

    this.midi = midi;

    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
      const { id, name } = output.value;

      if (this.supportedDevices.indexOf(name) !== -1) {
        for (let index = 0; index < 120; index++) {
          this.sendMessage(id, [144, index, 0]);
        }

        this.devices.push({ id, name });
      }
    }

    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  failure() {
    console.error('No access to your midi devices.')
  }

  onMIDIMessage(message) {
    const [ channel, note, velocity ] = message.data;
    // const output = this.midi.outputs.get('-1433442592');
    console.log(message.data);
    // if (velocity) {
    //   output.send([144, note, 3]);
    // } else {
    //   output.send([144, note, 0]);
    // }

    this.onMessage.next({ channel, note, velocity });
  }

  sendMessage(id, message) {
    this.midi.outputs.get(id).send(message);
  }
}
