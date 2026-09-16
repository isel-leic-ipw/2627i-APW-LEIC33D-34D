// Scope
console.log("1:", h); // definition of h (var) was hoisted
//console.log("1.1:", g); // ReferenceError: g is not defined -- Why??
{ 
    var h = 5;
    let g = "g";
}
console.log("2:", h);
//console.log("2.1:", g); // ReferenceError: g is not defined -- Why??

// Function and scope
console.log("4:", test());
console.log("5:", typeof test);
//console.log("5.1:", k); // ReferenceError: k is not defined -- Why??

function test(){
    var k = 4;
    console.log("3: test with k =", k);
}
