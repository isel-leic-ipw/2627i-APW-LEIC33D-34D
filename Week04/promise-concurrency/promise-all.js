const urlArray = [
    "https://eloquentjavascript.net/05_higher_order.html",
    "https://eloquentjavascript.net/11_async.html",
    "https://eloquentjavascript.net/10_modules.html"
    , "http://not.exist"
];

//promiseArray = urlArray.map(url => fetch(url));

// For each fetch, verify the response status and reject if not ok
promiseArray = urlArray.map(url => fetch(url).then(resp => {
    if (!resp.ok)
        return Promise.reject(`HTTP status ${resp.status}`);
    return resp;
}));

// Sum of the lengths of the text of all responses
Promise.all(promiseArray) // Promise<Array<Response>>
// promiseAll(promiseArray) // My implementation of Promise.all
    .then(arrResp => Promise.all(arrResp.map(resp => resp.text()))) // Promise<Array<String>>
    .then(arrText => arrText.reduce((t1, t2) => t1 + t2.length, 0))
    .then(totalLen => console.log(totalLen))
    .catch(e => console.error("ERROR!!!", e.message));


// My implementation of Promise.all:
function promiseAll(arrayPromises){
    const arrayValues = [];
    let count = 0;
    let rejected = false;
    return new Promise((resolve, reject) => {
        for (let p of arrayPromises){
            p.then(value => {
                arrayValues.push(value);
                count++;
                if (count == arrayPromises.length)
                    resolve(arrayValues);
            }).catch(err => {
                if (! rejected){
                    reject(err);
                    rejected = true;
                }
            });

        }
    });
}
