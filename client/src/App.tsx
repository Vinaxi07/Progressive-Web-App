import React, { useEffect, useState } from 'react'
import './App.css';

const serverBaseURL = "http://localhost:3000";


const App = () =>{

  useEffect(() => {

    // connect sse endpoint
    const sse = new EventSource(`${serverBaseURL}/sse`,
      { withCredentials: true });

    let setRealtimeData = (data: any)=> {
      //console.log({data});
      const parsedData = JSON.parse(data);
    }

    sse.onopen = () =>{
      // on open
    }

    // catch messages/ updates
    sse.onmessage = (event) => {
      console.log({event});
      
      setRealtimeData(event.data)
    };

    sse.addEventListener("update_price",(updates)=>{
      console.log({updates});
      
    })

    // error
    sse.onerror = () => {
      // error log here 
      sse.close();
    }

    return () => {
      sse.close();
    };
  }, []);

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
