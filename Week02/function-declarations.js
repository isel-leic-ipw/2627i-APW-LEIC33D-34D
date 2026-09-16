// Declaration Notation
function sum1 (x, y){
    return (x + y);
}

// Anonymous function
const sum2 = function (x, y){
    return (x + y);
}

// Arrow function
const sum3 = (x, y) => x + y;

// Testing
console.log("1:", sum1(2, 4));
console.log("2:", sum2(3, 5));
console.log("3:", sum3(4, 6));