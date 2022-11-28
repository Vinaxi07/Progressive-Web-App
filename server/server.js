const express = require("express");
const cors = require("cors");
const {updateProductDetails, productsList: productsListConst}= require('./helpers/getProductsUpdates')

const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app = express();
app.use(cors(corsOptions));

const PORT = 3000;
let productsList = [
  { "id": 1, price: 50, claimed: 20}, 
  { "id": 2, price: 56 ,claimed: 0},
  { "id": 3, price: 66,claimed: 10}, 
  { "id": 4, price: 70 ,claimed: 0}, 
  { "id": 5, price: 67 ,claimed: 50}
]

app.get("/sse", function (req, res) {

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",

    // enabling CORS
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    'Access-Control-Allow-Credentials': 'true'
  })

  res.writeHead(200, {
    Connection: "keep-alive"
  });

  // write to client about price updates
  setInterval(() => {

    let productsListInstance = new productsListConst(productsList)
    let updatedProduct= updateProductDetails(productsListInstance?.products || productsList) || {}

    productsListInstance.updateProductList(updatedProduct)
    let stringifyUpdates = JSON.stringify(updatedProduct)

    res.write(
      `id:1\nevent: update_price\ndata: ${stringifyUpdates}`
    );
    res.write("\n\n");
  }, 5000);
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});


