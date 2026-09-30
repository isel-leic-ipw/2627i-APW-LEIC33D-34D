
export const VAL = 2000000000; // a constant for the tests

// SYNC FUNCTION
// The input is a Number and output is a String.
// (Number) -> String
export function longOperation(a) {
    // This loop simulates a long operation by consuming CPU.
    for(let i = 0; i < a; ++i);

    // Return a String
    return "sync: VAL = " + a.toString();
}

// ASYNC WITH CALLBACK
// (Number, Function) -> undefined
export function longOperationAsyncWithCallback(a, callback) {    
    if(!Number(a)) return "Error"; // How to handle error here??
    // Asynchronous operation with setTimeout
    let product = "async with Callback (setTimeout) a=" + a;    
    // setTimeout sets asynchronously a callback to handler the product after 3 seconds.
    setTimeout(() => callback(product), 3000);
    console.log("Callback was set...");
}

// ASYNC WITH PROMISE
// (Number) -> Promise
export function longOperationAsyncWithPromise(a) {
    const p = new Promise(function(resolve, reject) {
        if(!Number(a)) { // Handling error
            // Promise rejects.
            reject("'a' must be a number");
        }
        else {
            let product = "async with Promise a=" + a;
            // After 3 seconds, the Promise resolves.
            setTimeout(() => resolve(product), 3000);
        }
    });
    console.log("Promise was set (pending state)...");
    return p;
}

// (String) -> undefined
export function processResultError(error) {
    console.log("Calling processResultError...");
    console.error("\tError:", error);
}

// (String) -> undefined
export function processResult(result) {
    console.log("Calling processResult...");
    console.log("\tMessage:", result);
}
