import { longOperation, processResult, VAL } from "./longOperation.mjs";

console.log("BEGIN");

// Sync model
console.log("Synchronous function");
let res = longOperation(VAL);
processResult(res);

console.log("END");