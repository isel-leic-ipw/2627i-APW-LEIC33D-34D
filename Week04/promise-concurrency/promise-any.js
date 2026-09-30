const urlArray = [
    "https://eloquentjavascript.net/05_higher_order.html",
    "https://eloquentjavascript.net/11_async.html"
    , "https://not_exist"
];

const promiseArray = urlArray.map(url => fetch(url));

Promise.any(promiseArray)
    .then(resp => resp.text())
    .then(text => text.length)
    .then(len => console.log(len))
    .catch(e => console.error("ERROR!", e));

// An implementation of Promise.any:
function promiseAny(arrayPromises){
    let count = 0;
    let rejectArray = [];
    return new Promise((resolve, reject) => {
        for (let p of arrayPromises){
            p.then(value => resolve(value))
             .catch(err => {
                count++;
                rejectArray.push(err);
                if (count == arrayPromises.length){
                    reject(rejectArray);
                }
            });

        }
    });
}

