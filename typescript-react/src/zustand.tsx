import create from 'zustand';

interface BearState {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increase);
  return <button onClick={increasePopulation}>one up</button>;
}

export function ZustandStateManager() {
  return (
    <div>
      <h2>Zustand - State Management Solution, flux principles</h2>
      <BearCounter />
      <Controls />
    </div>
  );
}
