const URL = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA";
const URL1 = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA";
//const URL1 = "https://eloquentjavascript.net/11_async.html"

function checkResponse(rsp) {
    if (!rsp.ok) {
        return Promise.reject(new Error(`HTTP error: ${rsp.status}`));
    }
    return rsp.text();
}

const p1 = fetch(URL);   // Promise<Response>
const p2 = fetch(URL1);  // Promise<Response>

// First way: everything in the promise chain.
p1                                               // Promise<Response>
    .then(checkResponse)                         // Promise<String>
    .then(text => text.length)                   // Promise<Number>
    .then(len => p2
        .then(checkResponse)                     // Promise<String>
        .then(text => text.length)               // Promise<Number>
        .then(len1 => len + len1))               // Promise<Number>
    .then(total => console.log(total))
    .catch(e => console.log("Error:", e));

// This function returns a promise of Number (the length).
// p1: promise of Response
// returns: promise of Number (the length)
function promiseResponseToNumber(p1) {
    return p1                                   // Promise<Response>
        .then(checkResponse)                    // Promise<String>
        .then(text => text.length);             // Promise<Number>
}

// Second way: wrap the functionality of getting the length
// from a response and then sum both lengths.
promiseResponseToNumber(p1)                 // Promise<Number>
    .then(
       len => promiseResponseToNumber(p2)   // Promise<Number>
              .then(len1 => len+len1)       // Promise<Number>
    )
    .then(total => console.log(total))
    .catch(e => console.log("Error:", e));


// Third way: use a function to combine the numbers (more generic way).
// p1: promise of Response
// p2: promise of Response 
// combiner: function(Number, Number) -> Number
// returns: promise of Number (the sum of lengths)
function combineTwoPromiseNumbers(p1, p2, combiner) {
    return promiseResponseToNumber(p1)              // Promise<Number>
        .then(
            len => promiseResponseToNumber(p2)      // Promise<Number>
                .then(len1 => combiner(len, len1))  // Promise<Number>
        )
        .catch(e => console.log("Error:", e));
}

combineTwoPromiseNumbers(p1, p2, (a, b) => a + b)
    .then(len => console.log(len))
    .catch(e => console.log("Error:", e));


