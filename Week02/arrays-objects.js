'use strict'; // strict mode: this is undefined

// ----------------------------
// Some object notations
let o1 = {};
let o2 = new Object();
let s1 = "Hello";
let s2 = new String("Hello");

// ----------------------------
// Object literal
let obj = { x: 3, y: 2 };
console.log("1:", typeof obj);
console.log("2.", obj['x']); // or obj.x
console.log("3.", obj.y); // or obj['y']

for (let i in obj) {
    console.log("4.", i, obj[i]);
}


// ----------------------------
// Array
const arr = [1, 2, 6, 8, 10];
console.log("5:", typeof arr);

for (let i in arr){
    console.log("6. ", i, arr[i]);
}
for (let elem of arr){
    console.log("7. ", elem);
}

// ----------------------------
// Constructing objects

// Way 1: Defining Methods for an object.
function formatCoordFunction() {
    return ("(" + this.x + ", " + this.y + ")");
}

const point1 = {
    x: 0.1,
    y: 2.8,
    formatCoordFunction
};
console.log("8:", point1.formatCoordFunction());

// Using the method call in object obj:
console.log("9:", formatCoordFunction.call(obj));

// In strict mode, calling formatCoordFunction (standalone) raises Error
//console.log("9.1:", formatCoordFunction()); // Error

// Way 2: Defining Methods for an object using anonymous function.
const point2 = {
    x: 3.2,
    y: 5.9,
    formatCoord: function () {
        return ("(" + this.x + ", " + this.y + ")");
    }
};
console.log("10:", point2.formatCoord());

// Way 3: Defining Methods for an object.
const point3 = {
    x: 5.2,
    y: 6.4,
    formatCoord() {
        return "(" + this.x + ", " + this.y + ")";
    }
};
console.log("11:", point3.formatCoord());
