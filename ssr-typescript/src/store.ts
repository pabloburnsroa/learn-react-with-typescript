import { useSyncExternalStore } from 'react';
import createStore from './createStore';

const store = createStore({
  value1: 0,
  value2: 0,
});

// export type ValuesStore = { value1: number; value2: number };
export type ValuesStore = ReturnType<typeof store.getState>;
export default store;
