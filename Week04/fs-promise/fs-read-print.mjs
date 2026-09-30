import { readFile } from 'node:fs/promises';

const INPUT_FILE  = "./aFile1.txt";

console.log("BEGIN");

let line;


const p = readFile(INPUT_FILE); // Promise<Buffer>
console.log(p);
const p1 = p.then(processFile); // Promise<undefined>
console.log(p1);
p1.catch(processError);

readFile(INPUT_FILE) // Promise<Buffer>
    .then(processFile) // Promise<undefined>
    .catch(processError)
    .finally(() => console.log("File reading completed."));

// line is undefined because the readFile function is async.
console.log("--->", line);

console.log("END");

function processFile(fileContent) {
    console.log("File content ready");
    const fileContentStr = fileContent.toString();
    line = fileContentStr.split("\n")[0];
    console.log(fileContentStr);
    console.log(line);
}

function processError(err) {
    console.log("Error handling file!");
    console.error("Message:", err.message);
    console.error("Error code:", err.code);
}

