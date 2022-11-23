const express = require("express");
const cors = require("cors");
const updateProductPrice = require('./helpers/getProductsUpdates')

const app = express();
app.use(cors());

const PORT = 3000;
const productsList = [{ "id": 1, price: "50", claimed: "20" }, { "id": 2, price: "56" ,claimed: "0"}, { "id": 3, price: "67" ,claimed: "40"}]

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

  // write to client about updates
  setInterval(() => {
    let updates = JSON.stringify(updateProductPrice(productsList) || {})

    res.write(
      `id: ${Math.random()}\nevent: update_price\ndata: ${updates}`
    );
    res.write("\n\n");
  }, 3000);

});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});


