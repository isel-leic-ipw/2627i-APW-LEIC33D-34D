import { longOperation, processResult, longOperationAsyncWithCallback, VAL } from "./longOperation.mjs";

console.log("BEGIN");


console.log("Asynchronous function with callback");
// Async model with callback
longOperationAsyncWithCallback(VAL, processResult);

// Adding "concurrence":
//let res = longOperation(VAL);
//processResult(res);

console.log("END");