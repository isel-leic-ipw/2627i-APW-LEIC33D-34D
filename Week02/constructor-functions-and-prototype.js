'use strict'

////////////////////////////////////////
// Constructor function and Prototype //
////////////////////////////////////////

// Defining Methods for an object.
function formatCoordFunction() {
    return ("(" + this.x + ", " + this.y + ")");
}

function Point2D(x, y) {
    this.x = x;
    this.y = y;
    this.formatCoord = formatCoordFunction;
}

let point4 = new Point2D(3.4, 5.6);
let point5 = new Point2D(8.2, 3.0);
console.log("1:", point4);
console.log("2:", point5);

// Examples of Function Constructors:
console.log("FC 1:", Object); // the Object constructor
console.log("FC 2:", Function); // the Function constructor
console.log("FC 3:", Array); // the Array constructor
console.log("FC 4:", String); // the String constructor
console.log("FC 5:", Point2D); // My function constructor

// Show the constructors of a constructor function
console.log("Constructor 1:", Object.constructor);
console.log("Constructor 2:", String.constructor);
console.log("Constructor 3:", Point2D.constructor);
console.log("Constructor 4:", formatCoordFunction.constructor);
console.log("Constructor 5:", point4.constructor); // my object
console.log("Constructor 6:", point4.constructor.constructor);

// Prototype: if we need to add a new property...
Point2D.prototype.color = "black";
Point2D.prototype.setColor = function (color) {
    this.color = color;
}

point4.setColor("green");
console.log("3:", point4);
console.log("4:", point5, point5.color); // Search property in the prototype

// -----------------------------
// Prototype: example with built-in constructor function String: add a new enclose method.
//let s1 = new String("ISEL");
let s1 = "ISEL";

console.log("5.", s1.enclose); // Not exists!
console.log("6.", s1.constructor);

// Adding a new method for a String:
String.prototype.enclose = function () {
    return `*** ${this} ***`
}

let s2 = "LEIC";

console.log("7.", s1.enclose);

console.log("8.", s2.enclose());
console.log("9.", s1.enclose());

// -----------------------------
// Prototype: example with built-in constructor function String: modify substring method.

console.log("10.", s1.substring(2, 4));

// Modifying an existing method for bad:
String.prototype.substring = function (b, e) {
    return "Busted!!!!";
};

console.log("10.", s1.substring(2, 4));
