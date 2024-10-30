import { createReducer } from '@reduxjs/toolkit';
import { setPumpState } from './actions';

interface PumpState {
  state: string;
}

const initialState: PumpState = { state: 'off' };

const pumpReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPumpState, (state, action) => {
    state.state = action.payload.state;
  });
});

export default pumpReducer;
