import React, { useEffect, useState } from 'react'
import './App.css';
import OfferDealsComponent from './components/offer-deal-component/offer-deal';


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
      <OfferDealsComponent/>
    </div>
  );
}

export default App;
