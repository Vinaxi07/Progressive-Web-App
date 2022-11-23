import React, { useEffect, useState } from 'react'
import './App.css';

const App = () =>{
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log({parsedData});

      };
      setListening(true);
    }
  }, [listening]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
