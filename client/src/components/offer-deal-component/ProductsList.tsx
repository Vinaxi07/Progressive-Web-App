import React, { useEffect, useState } from "react";
import "./offer-deals.css";
import ProductConstant from "../../constants/product-constant.js";

const serverBaseURL = "http://localhost:3000";

const ProductsList = () => {

    let [productsList, setProductsList] = useState(ProductConstant)

  useEffect(() => {
    // connect sse endpoint
    const sse = new EventSource(`${serverBaseURL}/sse`, {
      withCredentials: true,
    });

    
    sse.onopen = () => {
      // on open
    };

    // catch messages/ updates
    sse.onmessage = (event) => {
    };

    sse.addEventListener("update_price", (updates) => {
      setRealtimeData(updates)

    });

    // error
    sse.onerror = () => {
      // error log here
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  let setRealtimeData = (updates: any) => {
    //console.log({data});
    const parsedUpdates = JSON.parse(updates.data || {});


    let updatedProductIndex = productsList.findIndex(product=>product.id === parsedUpdates.id)
    if(updatedProductIndex !== -1){

      let updatedProducts = productsList
      updatedProducts[updatedProductIndex] = {
        ...productsList[updatedProductIndex],
        ...parsedUpdates
      }

      console.log({updatedProducts});
      

      setProductsList(updatedProducts)
    }
  //  console.log({parsedUpdates})
  };

  console.log({productsList});
  

  return (
    <div className="wrapper">
      <header>
        <h1 className="service-worker-title">Service Worker Example</h1>
      </header>

      <div className="grid-container">
        {productsList.map((item) => {
          return (
            <div className="grid-item">
              <div className="grid-image">
                <img className="img-src" src={`${item.image}`} />
              </div>
              <div className="grid-name">{item.name}</div>
              <div className="grid-offer">{item.offer}</div>
              <div className="grid-price">{item.price}</div>
              <div className="grid-progressbar">{item.claimed}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
