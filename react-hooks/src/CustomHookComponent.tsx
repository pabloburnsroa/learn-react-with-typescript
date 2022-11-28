import React from 'react';

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

function useFetchData<Payload>(url: string): {
  data: Payload | null;
  done: boolean;
} {
  const [data, dataSet] = React.useState<Payload | null>(null);
  const [done, doneSet] = React.useState(false);

  React.useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((d: Payload) => {
        dataSet(d);
        doneSet(true);
      });
  }, [url]);

  return {
    data,
    done,
  };
}

function CustomHookComponent() {
  const { data, done } = useFetchData<Pokemon[]>('/pokemon.json');
  const attackPoints = React.useMemo(
    () => (data || []).filter((pkm) => pkm.base.Attack > 60),
    [data]
  );

  return (
    <>
      <div>{done && <h3>{data![0].name.english}</h3>}</div>
      <div>
        <span>useMemo</span>
        {attackPoints.length && (
          <p>Attack &gt; 60: {attackPoints![0].name.english}</p>
        )}
      </div>
    </>
  );
}

export default CustomHookComponent;
