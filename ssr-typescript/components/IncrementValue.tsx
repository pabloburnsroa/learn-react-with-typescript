import store, { ValuesStore } from '../src/store';

export default function IncrementValue({ item }: { item: keyof ValuesStore }) {
  return (
    <button
      onClick={() => {
        const state = store.getState();
        store.setState({
          ...state,
          [item]: state[item] + 1,
        });
      }}
    >
      Increment {item}
    </button>
  );
}
