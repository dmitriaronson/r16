import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-settings',
  templateUrl: './channel-settings.component.html',
  styleUrls: ['./channel-settings.component.scss']
})
export class ChannelSettingsComponent implements OnInit {
  @Input() channel;
  @Output() onUpdate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  bitCrush() {
    this.channel.fx = ['bitcrush'];
    this.onUpdate.next(this.channel);
  }

  muteChannel() {
    this.channel.on = !this.channel.on;
    this.onUpdate.next(this.channel);
  }
}
