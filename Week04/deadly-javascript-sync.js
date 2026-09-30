let x = 0;
let count = 0;

setTimeout(() => {x = 1}, 1000);

while(x == 0) {
    setTimeout(() => {x = 1}, 1000);
    console.log(count++, "waiting...");
}

console.log("End waiting, now I can rest!!!");