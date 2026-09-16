// Example of the use of apply/call methods

function add(a,b) {
    return a+b;
}
  
function multiply(a,b) {
    return a*b;
}
  
// This closure shows the parameters (in/out) of a function f.
function showArguments(f) {
    return function (...args) {
        // ...args is a rest parameter: an indefinite number of arguments as an array.

        console.log('   function arguments:', args);
        //console.log(`   function arguments: ${args}`);

        let ret = f.apply(null, args);
        //let ret = f.call(this, ...args); the same with call method

        console.log(`   function return: ${ret}`);

        return ret;
    };
}
  
let saAdd = showArguments(add);
let saMult = showArguments(multiply);
 
console.log("saAdd:", saAdd(2, 3));
console.log("saMult:", saMult(2, 3));