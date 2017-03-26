import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from '@angular-redux/store';

import { StoreModule } from './store/store.module';
import { AppComponent } from './app.component';
import { SeqComponent } from './components/seq/seq.component';
import { PresetManagerComponent } from './components/preset-manager/preset-manager.component';
import { InfoComponent } from './components/info/info.component';
import { SampleManagerComponent } from './components/sample-manager/sample-manager.component';
import { PreventDefaultDirective } from './directives/prevent-default.directive';
import { AudioContextService } from './services/audio-context.service';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { PatternService } from './services/pattern.service';
import { MidiService } from './services/midi.service';
import { PresetManagerService } from './services/preset-manager.service';
import { UtilsService } from './services/utils.service';
import { PatternActions } from './actions/pattern.actions';
import { PatternEpics } from './epics/pattern.epics';
import { SamplesActions } from './actions/samples.actions';
import { SamplesEpics } from './epics/samples.epics';
import { MetronomeActions } from './actions/metronome.actions';
import { ActiveStepActions } from './actions/active-step.actions';
import { ActiveStepEpics } from './epics/active-step.epics';
import { ChannelSettingsComponent } from './components/channel-settings/channel-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SeqComponent,
    PresetManagerComponent,
    PreventDefaultDirective,
    InfoComponent,
    SampleManagerComponent,
    ChannelSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    StoreModule,
  ],
  providers: [
    AudioContextService,
    MetronomeService,
    SamplerService,
    PatternService,
    PresetManagerService,
    MidiService,
    UtilsService,
    ActiveStepActions,
    ActiveStepEpics,
    MetronomeActions,
    PatternActions,
    PatternEpics,
    SamplesActions,
    SamplesEpics,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

