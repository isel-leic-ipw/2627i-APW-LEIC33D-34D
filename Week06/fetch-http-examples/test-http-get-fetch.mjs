var requestOptions = {
    method: 'GET',
    headers : {
        "Host": "info.cern.ch",
        "Accept": "text/html,application/xhtml+xml,application/xml;",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache"
    }
  };
  
  fetch("http://info.cern.ch/hypertext/WWW/TheProject.html", requestOptions)
    .then(response => {
      console.log("Status code:", response.status); 
      console.log("Header:", response.headers); 
      return response;
    })
    .then(response => response.text())
    .then(text => console.log("Body:\n" + text))
    .catch(error => console.log('error', error.message));
