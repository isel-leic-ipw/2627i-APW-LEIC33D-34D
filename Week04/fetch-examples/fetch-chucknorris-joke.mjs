const URL_CHUCK_NORRIS_JOKE = "https://api.chucknorris.io/jokes/mLUozC5_T3uidSRnZ0nNgQ";


// Example of using fetch() to print the length of the content of a Chuck Norris joke: 
// using intermediate variables to store the promises returned by fetch() and then().
/*
const responseP = fetch(URL_CHUCK_NORRIS_JOKE);
const textP = responseP.then(resp => {
    if (!resp.ok) return Promise.reject(`HTTP status: ${resp.status}`);
    return resp.text();
});
const textP2 = textP.then(text => {console.log(text); return text});
const lenP = textP2.then(text => text.length);
const p = lenP.then(len => console.log("Length of content:", len));
p.catch((err) => {console.log("Error", err)});
*/

// The same example (recommended):
// using chain of then() calls to process the promises returned by fetch().
fetch(URL_CHUCK_NORRIS_JOKE)        // Promise <Response>
    .then(resp => {                 // Promise <Response>
        if (!resp.ok) return Promise.reject(`HTTP status: ${resp.status}`);
        return resp.text();
    })                              // Promise <String>
    .then(text => {console.log("Content:", text); return text}) // Promise <String>
    .then(text => text.length)      // Promise <Number>
    .then(len => console.log("Length of content:", len))  // Promise <undefined>
    .catch((err) => console.error("Error", err));

// Example of using fetch() to print a Chuck Norris joke
fetch(URL_CHUCK_NORRIS_JOKE)        // Promise <Response>
    .then(resp => {                 // Promise <Response>
        if (!resp.ok) return Promise.reject(`HTTP status: ${resp.status}`);
        return resp.json();
    })                              // Promise <Object>
    .then(obj => console.log(obj.value)) // Promise <undefined>
    .catch((err) => console.error("Error", err));
