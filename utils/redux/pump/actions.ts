import { createAction } from '@reduxjs/toolkit';

export const fetchPumpState = createAction('pump/fetchState');
export const setPumpState = createAction<{ state: string }>('pump/setState');