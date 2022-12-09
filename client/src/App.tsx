import React, { useEffect } from 'react'
import './App.css';
import ProductsList from './components/product-list/ProductsList';

const App = () =>{

  // useEffect(()=>{
  //   Notification.requestPermission().then(function(result) {
  //     if (result === 'granted') {
  //       console.log('Permission granted');
        
  //     }
  //   });
  // },[])

  return (
    <div className="App">
      <ProductsList/>
    </div>
  );
}

export default App;
