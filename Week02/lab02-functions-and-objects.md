# Lab 02: Functions, Objects and Arrays

## Goal

In this lab, you will practice JavaScript functions, closures, objects, and arrays. You will implement and test functions using different syntaxes, work with private state and nested data, and submit your solutions through your private GitHub repository.

## 1. Install Visual Studio Code and Node.js

You need a code editor to write the exercises and Node.js to execute JavaScript
files from the terminal.

### Install Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/download)
for your operating system.

Support for JavaScript is already included in VS Code. It provides syntax
highlighting, code completion, error detection, and navigation through your code.

### Install Node.js

Download the current LTS release from the [official Node.js website](https://nodejs.org/en/download).
The installer includes `node` and `npm`. The command `node` runs JavaScript, and
`npm` helps you install and manage JavaScript packages.

Open a new terminal after installation and verify both commands:

```bash
node --version
npm --version
```

You should see a version number for each command. If a command is not found,
restart VS Code and check that Node.js was added to your system `PATH`.

## 2. Access and organize the repository

Use the GitHub repository of Lab 01 and (re-)organize your lab result files such as:

```
lab-01/
└── files of lab 01...
lab-02/
├── exercise1/
├── exercise2/
└── ...
...
```

## Exercise 1: Three versions of the same function

Implement the following function in the three different forms below:

- declaration notation
- anonymous function expression
- arrow function

The function must count how many digits are in the integer part of a number, without converting the number to a string.

<details>
<summary>Hint</summary>

Use repeated integer divisions by 10 and inspect the remainder after each division.
</details>


### Examples

```js
countDigits(123)
// → 3
countDigits(7)
// → 1
countDigits(0)
// → 1
countDigits(100000)
// → 6
```

### Tasks

1. Implement the function using declaration notation.
2. Implement the same function using an anonymous function expression.
3. Implement the same function using an arrow function.
4. Test all three versions with the examples above.

Save the result in a file named `01-function-notations.js`.

## Exercise 2: Closure accumulator

Implement a closure function that makes an accumulator adding a number as an argument.

### Examples

```javascript
console.log(acc(1));
// → 1
console.log(acc(4));
// → 5
console.log(acc(7));
// → 12
```

### Tasks

1. Create a function `makeAccumulator()`.
2. The returned function must remember the total between calls.
3. Test the function with at least three consecutive calls.

Save the result in a file named `02-accumulator.js`.


## Exercise 3: Objects and arrays practice

For this exercise, save the solutions in a file named `03-objects-and-arrays.js`. **Test each implementation**.

### 3.1 Implement `function showProperties(obj)`

Receives an object `obj`.
Outputs the name and type of each property in the object.

**Example:**

```javascript
const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}}
showProperties(o)
// → a: number
// → b: string
// → c: object
// → d: object
```
<details>
<summary>Hint</summary>

To implement this function, use a `for-in` loop and indexed property access.
</details>

### 3.2 Implement `function executeFunctions(funcArray)`

Receives an array `funcArray`.
Executes all **functions** in the array, assuming they do not receive parameters.

**Example:**

```javascript
function sayHi() { console.log('Hi') }
function sayBye() { console.log('Bye') }

executeFunctions([sayHi, "Oops", , sayBye])
// Output:
// Hi
// Bye
```

### 3.3 Implement `deepEqual(value1, value2)`

Receives two values of any type (values, arrays, and objects).
Implement a function that compares two values deeply, including nested objects.

**Example:**

```javascript
const object1 = {a: 1, b: [2, 3], c: {d: [4]}}
const object2 = {a: 1, b: [2, 3], c: {d: [4]}}
const object3 = {a: 1, b: [2, 3], c: {d: 4}}

console.log(deepEqual(object1, object2))
// → true
console.log(deepEqual(object1, object3))
// → false
```

<details>
<summary>Hint</summary>

Your test for whether you are dealing with a real object will look something like `typeof x == "object" && x != null`. Be careful to compare properties only when both arguments are objects. In all other cases you can just immediately return the result of applying `===`.

Use `Object.keys` to go over the properties. You need to test whether both objects have the same set of property names and whether those properties have identical values. One way to do that is to ensure that both objects have the same number of properties (the lengths of the property lists are the same). And then, when looping over one of the object’s properties to compare them, always first make sure the other actually has a property by that name. If they have the same number of properties and all properties in one also exist in the other, they have the same set of property names.

Returning the correct value from the function is best done by immediately returning `false` when a mismatch is found and returning `true` at the end of the function.
</details>

## Exercise 4: Counter by digit and counting helpers

Implement a closure function that counts how many times a given digit appears in a
number, and then use it to create helper functions such as `counting1` and
`counting5`.

**Example:**

```js
const counting1 = makeCounterDigits(1);
const counting5 = makeCounterDigits(5);

console.log("Counting 1:", counting1(1010002));
// → 2
console.log("Counting 1:", counting1(1011111));
// → 8
console.log("Counting 5:", counting5(510));
// → 1
console.log("Counting 5:", counting5(5453));
// → 3
```

### Tasks

1. Write `makeCounterDigits(digit)`. The returned function should receive a
   number and count how many times the digit appears in that number.
2. Use `makeCounterDigits` to create functions such as `counting1` and
   `counting5`.
3. Test at least one case with no occurrences and one case with multiple occurrences.

Save the result in a file named `04-counter-digits.js`.

## Exercise 5: Timestamped console output

Override the default `console.log` behavior so that every message is preceded by the current date and time.

**Note:** Use `Date()` to get a string with the current date and time in the default format.

### Tasks

1. Save the original `console.log` in a variable.
2. Create a wrapper function that prepends the current date and time to each message.
3. Use a closure so the original function remains available internally without exposing it globally.
4. Test the wrapper with a message such as `"Hello, world!"`.

### Example

```js
console.log("Hello, world!");
```

Output:

```text
Mon Sep 15 2025 10:42:30 GMT+0000 (Coordinated Universal Time) - Hello, world!
```

Save the result in a file named `05-timestamped-console.js`.

## Final check and submission

Run and test all five exercise files, then commit and push the completed work to your private GitHub repository:

```bash
node 01-function-notations.js
node 02-accumulator.js
node 03-objects-and-arrays.js
node 04-counter-digits.js
node 05-timestamped-console.js
```

