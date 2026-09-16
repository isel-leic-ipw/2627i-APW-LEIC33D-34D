// Stack call:
function chicken() {
    return egg();
}

function egg() {
    return chicken();
}

console.log(chicken() + " came first.");
// --> RangeError: Maximum call stack size exceeded
