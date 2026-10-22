import express from 'express';

const PORT = 8000;  // Port number for the tests
const app = express(); // Express function returns an app

// Single endpoint to URI "/" with GET method
app.get("/", sendHello);

// App listening...
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);


// FUNCTIONS:

function sendHello(req, res){
    console.log(req.headers);
    res.send("Hello World!");
}

// Testing: 
// 1) Server: Run the server using: 
//   - npm run start-dev
// 2) Client: go to the browser and access the URL: http://localhost:8000/
//    Or use the Rest Client in VScode or Postman to make the following request:
//      GET http://localhost:8000/ HTTP/1.1
