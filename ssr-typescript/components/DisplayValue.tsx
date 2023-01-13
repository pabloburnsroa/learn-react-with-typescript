import store, { ValuesStore } from '../src/store';

const DisplayValue = ({ item }: { item: keyof ValuesStore }) => (
  <div>
    {item}: {store.useStore((state) => state[item])}
  </div>
);

export default DisplayValue;
