import { createAction } from '@reduxjs/toolkit';

export const setPumpState = createAction<{ state: string }>('pump/setState');