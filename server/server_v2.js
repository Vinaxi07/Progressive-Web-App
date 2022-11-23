const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var callFactApiOnInterval = require('./helpers/callApi')
const app = express();

app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (request, response) => response.json({clients: clients.length}));

const PORT = 3001;

let clients = [];
let facts = [];

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})

function eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;
  console.log({data})
    //response.write(data);
    // const clientId = Date.now();
  
    // const newClient = {
    //   id: clientId,
    //   response
    // };
  
    // clients.push(newClient);
  
    // request.on('close', () => {
    //   console.log(`${clientId} Connection closed`);
    //   clients = clients.filter(client => client.id !== clientId);
    // });
  }
  
  app.get('/events', eventsHandler);


function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
  }
  
  async function addFact(request, respsonse) {
  //  console.log({request, respsonse});
   // const newFact = request.json()
    try{

    console.log({request});

   // facts.push(newFact);
    
    //respsonse.json(newFact)

   // console.log({newFact});
}
    catch(error){
        console.log({error});
    }
  //  return sendEventsToAll(newFact);
  }
  
 app.post('/fact', addFact);

 console.log('hello there!');
 callFactApiOnInterval()