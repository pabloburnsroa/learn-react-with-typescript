import React from 'react';
import './App.css';
import UseStateComponent from './UseStateComponent';
import UseEffectComponent from './useEffectComponent';
import UseContextComponent from './UseContextComponent';
import UseReducerComponent from './UseReducerComponent';
import UseRefComponent from './UseRefComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            backgroundColor: 'yellow',
            padding: '40px',
            margin: '10px',
            color: 'black',
          }}
        >
          <h1>useReducer</h1>
          <UseReducerComponent />
        </div>
        <div
          style={{ backgroundColor: 'red', padding: '40px', margin: '10px' }}
        >
          <h1>useContext</h1>
          <UseContextComponent />
        </div>
        <div
          style={{
            backgroundColor: 'darkblue',
            padding: '40px',
            margin: '10px',
          }}
        >
          <h1>useState</h1>
          <UseStateComponent />
        </div>
        <div
          style={{ backgroundColor: 'green', padding: '40px', margin: '10px' }}
        >
          <h1>useEffect</h1>
          <UseEffectComponent />
        </div>
        <div
          style={{
            backgroundColor: 'yellow',
            padding: '40px',
            margin: '10px',
            color: 'black',
          }}
        >
          <h1>useRef</h1>
          <span style={{ marginRight: '5px' }}>input</span>
          <UseRefComponent />
        </div>
      </header>
    </div>
  ); 
}

export default App;
