
// Modifying an existing method for good: adding a prefix to each substring
console.log("Hello,".concat("LEIC ", "and ", "ISEL"));
// Example: if the prefix is ##, then the result must be:
// ' ## Hello, ## LEIC  ## and  ## ISEL'

/*
//Using a global variable to store the old implementation
const oldConcat = String.prototype.concat; // Not recommended
String.prototype.concat = function (...args) {
    const PREFIX = " #1# ";
    let newArgs = [];
    console.log("--->", args);
    for (let arg of args) newArgs.push(PREFIX + arg);
    //let newArgs = args.map(s => PREFIX + s);
    return oldConcat.apply(PREFIX + this, newArgs);
}
*/

/*
//Storing the old implementation in String prototype instead of in a global variable
String.prototype.oldConcat = String.prototype.concat;
String.prototype.concat = function (...args) {
    const PREFIX = " #2# ";
    let newArgs = [];
    for (let arg of args) newArgs.push(PREFIX + arg);
    //let newArgs = args.map(s => PREFIX + s);
    return (PREFIX + this).oldConcat(newArgs);
}
*/

// Creating a new scope (block) to create a new closure: better way
{
    // Using a local variable to store the old implementation
    let oldConcat = String.prototype.concat;
    String.prototype.concat = function (...args) {
        const PREFIX = " #3# ";
        let newArgs = [];
        for (let arg of args) newArgs.push(PREFIX + arg);
        //let newArgs = args.map(s => PREFIX + s);
        return oldConcat.apply(PREFIX + this, newArgs);
    };
}

console.log("Hello,".concat("LEIC ", "and ", "ISEL"));
//console.log(oldConcat);
