import { combineReducers } from 'redux';
import { patternReducer } from '../reducers/pattern.reducer';
import { metronomeReducer } from '../reducers/metronome.reducer';
import { samplesReducer } from '../reducers/samples.reducer';
import { activeStepReducer } from '../reducers/active-step.reducer';

export const rootReducer = combineReducers({
    pattern: patternReducer,
    metronome: metronomeReducer,
    sampler: samplesReducer,
    activeStep: activeStepReducer,
});
