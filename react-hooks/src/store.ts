import { createContext } from 'react';

const initialState = {
  first: 'Pablo',
  last: 'Burns-Roa',
};

export type UserState = typeof initialState;

const context = createContext<typeof initialState>(initialState);

export default context;
