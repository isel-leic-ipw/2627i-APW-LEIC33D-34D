"use strict";

// --------------------------------
// Higher-order function
// --------------------------------

// --------------------------------
// For each:
// For each element, apply a function:
function myForEach(callbackfn){
    for (let elem of this){
        callbackfn(elem);
    }
}
const names = ['Ana', 'Bob'];
console.log("--- myForEach with call ---");
myForEach.call(names, elem => console.log(elem));
myForEach.call(names, function (elem){ console.log(elem);});

// Add myForEach to the prototype of Array:
Array.prototype.myForEach = myForEach;

console.log("\n--- myForEach vs forEach ---");
names.myForEach((elem) => console.log(elem));
names.forEach((elem) => console.log(elem));

// Modify all elements of an array to upper case (not possible with forEach!):
console.log("\n--- other forEach samples ---");
names.forEach(elem => elem.toUpperCase()); // elem is a variable assigned to the elements of the array in the scope of the arrow function.
console.log(names); // Not modify the elements!
names.forEach((elem, index, theArray) => theArray[index] = elem.toUpperCase());
console.log(names);

// --------------------------------
// Filtering:
// Objective: filter elements of an array according to a predicated function and return an new array of these elements.
// Examples:
//  Filter the even numbers in [1, 4, 3, 20, 11, 5, 2, 6, 8] -> [4, 20, 2, 6, 8]
//  Filter the numbers greater than 10 in [1, 4, 3, 20, 11, 5, 2, 6, 8] -> [20, 11]
function myFilter(predicate){
    let res = [];
    for (let elem of this){
        if (predicate(elem)){
            res.push(elem);
        }
    }
    return(res);
}

Array.prototype.myFilter = myFilter;

console.log("\n--- myFilter vs filter ---");
// For instance, filter even elements:
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].myFilter((n) => n % 2 == 0));
// For instance, filter elements greater than 10:
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].myFilter((n) => n > 10));

// With filter built-in from an array:
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].filter((n) => n % 2 == 0));
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].filter((n) => n > 10));


// --------------------------------
// Mapping:
// Objective: Return an array with the returned value of a callback function applied to each element of an array.
function myMap(callbackfn){
    let res = [];
    for (let elem of this){
        res.push(callbackfn(elem));
    }
    return res;
}

Array.prototype.myMap = myMap;

console.log("\n--- myMap vs map ---");
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].myMap((n) => n * n));
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].map((n) => n * n));

// Generate an array with the lower case of the names in the array:
console.log(names, "-->", names.map(elem => elem.toLowerCase()));

// --------------------------------
// Reducing:
// Objective: combine all elements of an array according to a combination function.
function myReduce(callbackfn){
    if (this == null) return undefined;
    let current = this[0];
    for (let i = 1; i < this.length; i++){
        current = callbackfn(current, this[i]);
    }
    return current;
}

Array.prototype.myReduce = myReduce;

console.log("\n--- myReduce vs reduce ---");
console.log([1, 2, 3].myReduce((elem1, elem2) => elem1 + elem2));
console.log([1, 2, 3].reduce((elem1, elem2) => elem1 + elem2));


// Some:
// Objective:returns true if the predicate function is true for some value of the array.
function mySome(predicate){
    for (let elem of this){
        if (predicate(elem)) return true;
    }
    return false;
}

Array.prototype.mySome = mySome;

console.log("\n--- mySome vs some ---");
console.log([1, 20, 2].mySome((elem) => elem > 20));
console.log([1, 20, 2].some((elem) => elem > 20));
