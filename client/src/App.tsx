import React, { useEffect, useState } from 'react'
import './App.css';
import ProductsList from './components/product-list/ProductsList';

const App = () =>{
  return (
    <div className="App">
      <ProductsList/>
    </div>
  );
}

export default App;
