const urlArray = [
    "https://eloquentjavascript.net/05_higher_order.html",
    "https://eloquentjavascript.net/11_async.html"
    //, "https://not_exist"
];

const promiseArray = urlArray.map(url => fetch(url));

Promise.race(promiseArray)
    .then(resp => resp.text())
    .then(text => text.length)
    .then(len => console.log(len))
    .catch(e => console.error("ERROR!"));

// An implementation of Promise.race:
function promiseRace(arrayPromises){
    return new Promise((resolve, reject) => {
        for (let p of arrayPromises){
            p.then(p => resolve(p))
             .catch(err => reject(err));
        }
    });
}

