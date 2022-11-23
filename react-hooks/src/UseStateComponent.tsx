import React from 'react';

function UseStateComponent() {
  const [arr, arrSet] = React.useState<number[]>([]);
  const [name, nameSet] = React.useState<string | null>(null);

  return (
    <div>
      <div>
        <button onClick={() => arrSet([...arr, arr.length + 1])}>
          Add to array
        </button>
      </div>
      {JSON.stringify(arr)}
      <div>
        <button onClick={() => nameSet('Pablo')}>Set Name</button>
      </div>
      {JSON.stringify(name)}
    </div>
  );
}

export default UseStateComponent;
