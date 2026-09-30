import { readFile } from 'node:fs/promises'

const INPUT_FILE  = "./json-sample.json";

console.log("BEGIN");

readFile(INPUT_FILE)                                // Promise<Buffer>
    .then((fileContent) => fileContent.toString())  // Promise<String>
    .then((text) => JSON.parse(text))               // Promise<Object>
    .then((obj) => console.log(obj))                // Promise<undefined>
    .catch(processError);

console.log("END");

function processError(err) {
    console.log("Error handling file!");
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
}

