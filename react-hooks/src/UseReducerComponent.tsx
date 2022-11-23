import React from 'react';

const initialState = {
  count: 100,
};

type ACTIONTYPE =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + action.payload };
    case 'decrement':
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      throw new Error('Something bad happened...');
  }
}

function UseReducerComponent() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <br />
      <button onClick={() => dispatch({ type: 'decrement', payload: 5 })}>
        -
      </button>{' '}
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        +
      </button>
    </>
  );
}

export default UseReducerComponent;
