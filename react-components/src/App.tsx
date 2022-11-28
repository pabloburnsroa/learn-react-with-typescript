import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from './EvenMoreReactComponent';

function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

export interface Pokemon {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    'Sp. Attack': number;
    'Sp. Defense': number;
    Speed: number;
  };
}

/*
What happens when you don't know the type coming back from the service??

interface ReallyOpenEndedObjectType {
  id: number;
  [key: string]: string;
}

*/

function App() {
  const [pokemon, pokemonSet] = React.useState<Pokemon[]>([]);
  React.useEffect(() => {
    fetch('/pokemon.json')
      .then((response) => response.json())
      .then((data: Pokemon[]) => pokemonSet(data));
  }, []);

  return (
    <div className="App">
      <TestComponent />
      <List items={pokemon} render={(item: Pokemon) => item.name.english} />
    </div>
  );
}

export default App;
