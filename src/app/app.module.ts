import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { AudioContextService } from './services/audio-context.service';
import { SeqComponent } from './seq/seq.component';

@NgModule({
  declarations: [
    AppComponent,
    SeqComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AudioContextService, MetronomeService, SamplerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
