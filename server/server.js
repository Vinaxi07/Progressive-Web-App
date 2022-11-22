const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3000;

// return random numbers as stock price for company aTech and bTech
const getStockPrice = (range, base) =>(Math.random() * range + base).toFixed(2);

// returns time string
const getTime = () => new Date().toLocaleTimeString();

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
    res.write(
      `data: {"time": "${getTime()}", "aTechStockPrice": "${getStockPrice(
        2, 20)}", "bTechStockPrice": "${getStockPrice(4, 22)}"}`
    );
    res.write("\n\n");
  }, 3000);

});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});