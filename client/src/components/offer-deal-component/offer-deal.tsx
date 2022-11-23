import React from "react";
import "./offer-deals.css";
import ProductConstant from '../../constants/product-constant.js';


export default function OfferDealsComponent (){
    console.log(ProductConstant);
 return(
    <div className="wrapper">
        <header>
            <h1 className="service-worker-title">
                Service Worker Example
            </h1>
        </header>
        
        <div className="grid-container">
            
            {
            ProductConstant.map((item)=> {
                return(
                    <div className="grid-item">
                        <div className="grid-image">
                           <img className="img-src" src={`${item.image}`}/>
                        </div>
                        <div className="grid-name"> 
                             {item.name}
                        </div>
                        <div className="grid-offer"> 
                             {item.offer}
                        </div>
                        <div className="grid-price"> 
                             {item.price}
                        </div>
                        <div className="grid-progressbar"> 
                             {item.claimed}
                        </div>
                    </div>
                ) 
            })
            }
        </div>
    </div>
 )
}