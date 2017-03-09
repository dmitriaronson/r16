import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AudioContextService } from './services/audio-context.service';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { PatternService } from './services/pattern.service';
import { PresetManagerService } from './services/preset-manager.service';
import { SeqComponent } from './seq/seq.component';
import { StepOptionsComponent } from './step-options/step-options.component';
import { PresetManagerComponent } from './preset-manager/preset-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    SeqComponent,
    StepOptionsComponent,
    PresetManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [AudioContextService, MetronomeService, SamplerService, PatternService, PresetManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
