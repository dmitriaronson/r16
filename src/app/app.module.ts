import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AudioContextService } from './services/audio-context.service';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { PatternService } from './services/pattern.service';
import { RandomService } from './services/random.service';
import { ApiService } from './services/api.service';
import { PresetManagerService } from './services/preset-manager.service';
import { SeqComponent } from './seq/seq.component';
import { PresetManagerComponent } from './preset-manager/preset-manager.component';
import { PreventDefaultDirective } from './directives/prevent-default.directive';
import { InfoComponent } from './info/info.component';
import { SampleManagerComponent } from './sample-manager/sample-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    SeqComponent,
    PresetManagerComponent,
    PreventDefaultDirective,
    InfoComponent,
    SampleManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    AudioContextService,
    MetronomeService,
    SamplerService,
    PatternService,
    PresetManagerService,
    RandomService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
