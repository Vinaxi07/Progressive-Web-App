import React, { FC, useCallback, useEffect, useState } from "react";
import "./product-list.css";
import { ProductsList as ProductsListConst } from "../../constants/index.js";
import { LinearProgress, Typography } from "@mui/material";

const serverBaseURL = "http://localhost:3000";

const ProductsList = () => {
  const [productsList, setProductsList] = useState(ProductsListConst);

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

    sse.addEventListener("cart_notification",(event)=>{
   //   console.log({event, 1:navigator.serviceWorker});

      navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
        type: 'send_notification',
        notification: event.data
      });

  })

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
      const parsedUpdates = JSON.parse(updates.data || {});

      let updatedProductIndex = productsList.findIndex(
        (product) => product.id === parsedUpdates.id
      );
      if (updatedProductIndex !== -1) {

        setProductsList(ps=>{
          let updatedProducts = [...ps];
          updatedProducts[updatedProductIndex] = {
            ...ps[updatedProductIndex],
            ...parsedUpdates,
          };
          return updatedProducts
        })

      }
    },
    [productsList]
  );

  const GridCard: FC<{
    item: any;
    index: any;
  }> = ({ item = {}, index }) => {
    return (
     <div className="grid-item" key={index}>
          <div className="grid-image">
            <img className="img-src" src={`${item.image}`} />
          </div>
          
          <div className="grid-offer padding-top-10">
            <span className="offer-percentage">{item.offer}</span>
            <span className="offer-text">Deal</span>
            
            </div>
            <div className="grid-name padding-top-10">{item.name}</div>
          <div className="grid-price padding-top-10">&#x20b9;{item.price}</div>
          <div className="grid-progressbar padding-top-10">

            <div className="grid-progressBar">
              <div className="progressBar-loader">
               <LinearProgress variant="determinate" value={item.claimed} color="error"/>
              </div>
              <div className="progressBar-percentage">
                {`${item.claimed}% claimed`}
               </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="wrapper">
      <header>
        <h1 className="service-worker-title">Progressive Web App</h1>
      </header>

      <div className="grid-container">
        {productsList.map((item, index) => {
          return <GridCard item={item} index={index} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ProductsList;
