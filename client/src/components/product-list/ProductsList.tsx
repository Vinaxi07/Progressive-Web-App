import React, { useCallback, useEffect, useState } from "react";
import "./product-list.css";
import { ProductsList as ProductsListConst } from "../../constants/index.js";
import {LinearProgress,Typography} from '@mui/material';

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
    },[productsList]
  );

  const ProdFunction = ()=> {
   return( productsList.map((item,index) => {
    console.log(item.claimed)
      return (
        <div className="grid-item" key={index}>
          <div className="grid-image">
            <img className="img-src" src={`${item.image}`} />
          </div>
          <div className="grid-name padding-top-10">{item.name}</div>
          <div className="grid-offer padding-top-10">{item.offer}</div>
          <div className="grid-price padding-top-10">{item.price}</div>
          <div className="grid-progressbar padding-top-10">

          {/* <Box sx={{ display: 'flex', alignItems: 'center' ,width: '100%' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={item.claimed} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${item.claimed}%`}</Typography>
              </Box>
            </Box> */}
            
            <div className="grid-progressBar">
              <div className="progressBar-loader">
               <LinearProgress variant="determinate" value={item.claimed} color="error"/>
              </div>
              <div className="progressBar-percentage">
             {`Claimed ${item.claimed}%`}
               </div>
            </div>
          </div>
        </div>
      );
    }))
  }
  return (
    <div className="wrapper">
      <header>
        <h1 className="service-worker-title">Progressive Web App</h1>
      </header>

      <div className="grid-container">
        {ProdFunction()}
      </div>
    </div>
  );
};

export default ProductsList;
