// Closure example: variable c is in a function scope
function setCounter() {
    let c = 0; // this local variable remains in the closure scope
    return function () {
        c++; 
        return(c);
    }
}

const counter = setCounter();
const counter2 = setCounter();
console.log(typeof counter);
console.log("Ex1 closure counter:", counter());
console.log("Ex2 closure counter:", counter());
console.log("Ex3 closure counter:", counter());
console.log("Ex4 closure counter2:", counter2());
console.log("Ex5 closure counter2:", counter2());

// Closure example: variable c is in a block scope
let counter3;
{
    let c = 0; // this local variable remains in the closure scope
    counter3 = function (inc){
        c += inc;
        return(c);
    }
}

console.log("Ex6 closure counter3:", counter3(2));
console.log("Ex7 closure counter3:", counter3(1));
console.log("Ex8 closure counter3:", counter3(3));

// Closure example: variable x (argument) is in a function scope
function makeAdder(x) {
    return function (y) {
        return(x + y);
    }
}

const adder7 = makeAdder(7);
console.log("Ex9 closure adder7:", adder7(2));
console.log("Ex10 closure adder7:", adder7(10));
console.log("Ex11 closure adder3:", makeAdder(3)(10));