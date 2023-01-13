import { useEffect, useState } from 'react';
import store from '../src/store';
import { useSyncExternalStore } from 'react';
import { useContext } from 'react';
import ServerContext from '../context/ServerContext';
import { ValuesStore } from '../src/store';

/*
const useStore = (selector = (state) => state) => {
  const [state, setState] = useState(selector(store.getState()));
  useEffect(() => store.subscribe((state) => setState(selector(state))), []);

  return state;
};

export default useStore;

*/

// ******** \\
// DO NOT USE THIS ...
// useStore hook has now been moved to store.ts

const useStore = (selector: (state: ValuesStore) => number) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    // SHOULDN'T PASS USECONTEXT WITHIN USECALLBACK
    // () => selector(useContext(ServerContext))
    () => selector(store.getServerState())
  );

export default useStore;

// ******** \\
