function getRandomInt(end = 100){
    return Math.floor(Math.random() * end);
}

function resolveAfter3Seconds(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x), 3000);
    });
}

/* Example 1:
 * Wait 3 seconds and print a number. 
*/
async function f1() { // async function
    const x = await resolveAfter3Seconds(getRandomInt());
    console.log("Value of x is:", x);
}

/* Example 2:
 * Wait 3 seconds and print a number.
 * Then, wait more 3 seconds and print another number.
 */
async function f2() { // async function
    const x1 = await resolveAfter3Seconds(getRandomInt());
    console.log("Value of x is:", x1);
    const x2 = await resolveAfter3Seconds(getRandomInt());
    console.log("Value of x is:", x2);
    const x3 = await resolveAfter3Seconds(getRandomInt());
    console.log("Value of x is:", x3);
}

/* Example 3:
 * Repeat N times the wait-print procedure as in Example 2.
 */
async function f3() { // async function
    for (let i = 0; i < 5; i++){
        let x = await resolveAfter3Seconds(getRandomInt());
        console.log("Value of x is:", x);
    }
}

console.log("BEGIN");

f1();
//f2();
//f3();


/* Same as Example 1 (with then/catch):
 */
//resolveAfter3Seconds(getRandomInt())
//    .then(x => console.log("Value of x is:", x));

/* Same as Example 2 (with then/catch):
 * Wait 3 seconds and print a number.
 * Then, wait more 3 seconds and print another number.
 */
// resolveAfter3Seconds(getRandomInt())
//     .then(x => {
//             console.log("Value of x is:", x);
//             return(resolveAfter3Seconds(getRandomInt()));
//         })
//     .then(x => console.log("Value of x is:", x));

/* 
// This example includes a third waiting...
// (with then/catch)
resolveAfter3Seconds(getRandomInt())
     .then(x => {
            console.log("Value of x is:", x);
            return(resolveAfter3Seconds(getRandomInt())); // 1st
        })
    .then(x => {
            console.log("Value of x is:", x);
            return(resolveAfter3Seconds(getRandomInt())); // 2nd
        })
    .then(x => console.log("Value of x is:", x)); // 3rd
*/

/* 
// Same as Example 3 (with then/catch):
let p = resolveAfter3Seconds(getRandomInt()); // 1st
for (let i = 0; i < 5-1; i++){
    p = p.then(x => {
        console.log("Value of x is:", x);
        return(resolveAfter3Seconds(getRandomInt()));
    });
}
p.then(x => console.log("Value of x is:", x));
*/

console.log("END");