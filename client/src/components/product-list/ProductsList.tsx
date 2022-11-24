import React, { useCallback, useEffect, useState } from "react";
import "./product-list.css";
import { ProductsList as ProductsListConst } from "../../constants/index.js";

const serverBaseURL = "http://localhost:3000";

const ProductsList = () => {
  let [productsList, setProductsList] = useState(ProductsListConst);

  useEffect(() => {
    // connect sse endpoint
    const sse = new EventSource(`${serverBaseURL}/sse`, {
      withCredentials: true,
    });

    sse.onopen = () => {
      // on open
    };

    // catch messages/ updates
    sse.onmessage = (event) => {};

    // listen product price updates
    sse.addEventListener("update_price", (updates) => {
      setRealtimeData(updates);
    });

    // listen product claimed udpates
    sse.addEventListener("update_claimed", (updates) => {
      setRealtimeData(updates);
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

  let setRealtimeData = useCallback(
    (updates: any) => {
      //console.log({data});
      const parsedUpdates = JSON.parse(updates.data || {});

      let updatedProductIndex = productsList.findIndex(
        (product) => product.id === parsedUpdates.id
      );
      if (updatedProductIndex !== -1) {
        let updatedProducts = [...productsList];
        updatedProducts[updatedProductIndex] = {
          ...productsList[updatedProductIndex],
          ...parsedUpdates,
        };
        setProductsList(updatedProducts);
      }
      //  console.log({parsedUpdates})
    },
    [productsList]
  );

  return (
    <div className="wrapper">
      <header>
        <h1 className="service-worker-title">Progressive Web App</h1>
      </header>

      <div className="grid-container">
        {productsList.map((item,index) => {
          return (
            <div className="grid-item" key={index}>
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
