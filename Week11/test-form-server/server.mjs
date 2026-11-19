import express from 'express';

const PORT = 7200;  // Port number for the tests
const app = express(); // Express function returns an app

// URL-encoded parser
app.use(express.urlencoded());

// Print info about the request
app.use(printInfoRequest);

// For Sample 6
app.get("/", formPost);
app.post("/", echoBody);

// For Sample 9
app.get("/greeting-form", formGreeting);
app.get("/greeting", greeting);
app.post("/greeting", greeting);

// App listening...
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);


// FUNCTIONS:

function printInfoRequest(req, res, next){
  console.log("----- Req Info -----")
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Parameters:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("--------------------");
  next();
}

function formPost(req, res){
  const path = new URL('../html-samples/sample-form-submission.html', import.meta.url);
  res.sendFile(path.pathname);
}

function formGreeting(req, res){
  console.log(import.meta.url)
  const path = new URL('../html-samples/sample-form-get.html', import.meta.url);
  res.sendFile(path.pathname);
}

function greeting(req, res){
  let src;
  if (req.method == "GET") {
    src = req.query;
  }
  else {
    src = req.body;
  }
  res.send(Object.values(src).join(" "));
}

function echoBody(req, res){
  res.send(req.body);
}