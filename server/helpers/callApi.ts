// return random numbers as stock price for company aTech and bTech
const getPrice = (range, base) =>(Math.random() * range + base).toFixed(2);

// returns time string
const getTime = () => new Date().toLocaleTimeString();

 function callFactApiOnInterval () {

    const myBody = `data: {"time": "${getTime()}", "aTechStockPrice": "${getPrice(
        2, 20)}", "bTechStockPrice": "${getPrice(4, 22)}"}`

    setInterval(() => {
        callFactApi(myBody)
      }, 3000);
}

const callFactApi = async (myBody) => {

    console.log({'call fact api':myBody});
 
    try{    
         await fetch('http://localhost:3001/fact', {
      method: 'POST',
      body: myBody, // string or object
      headers: {
        'Content-Type': 'text/event-stream'
      }
    });}catch(error){
        console.log({error_server: error});
    }

}

module.exports = callFactApiOnInterval