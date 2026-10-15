let requestOptionsUrlEncoded = {
    method: 'POST',
    headers : {
        "Host": "echo.free.beeceptor.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": 49
    },
    body : "acronym=URL&meaning=Uniform%20Resource%20Location"
  };

  let requestOptionsJson = {
    method: 'POST',
    headers : {
        "Host": "echo.free.beeceptor.com",
        "Content-Type": "application/json"
    },
    body : JSON.stringify({
        "acronym": "JSON",
        "meaning": "JavaScript Object Notation"
    })
  };
  

fetch("http://echo.free.beeceptor.com/", requestOptionsUrlEncoded)
//fetch("http://echo.free.beeceptor.com/", requestOptionsJson)
  .then(resp => {
    console.log(resp.headers); 
    console.log("Status:", resp.status, resp.statusText); 
    return resp;
  })
  .then(resp => resp.json())
  .then(objResp => console.log("Response echoed:", objResp))
  .catch(error => console.log('error', error));
