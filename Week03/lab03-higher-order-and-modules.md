# Lab 03: Higher-order Functions, Modules and Testing

## Goal

In this lab, you will practice the main ideas of higher-order functions and modular JavaScript development. The focus is on:

- writing functions that receive other functions as arguments;
- using functional patterns such as `filter`, `map`, and `reduce`;
- creating and exporting ECMAScript modules;
- writing small test cases with Mocha to validate the behaviour of each function;
- using npm to create Node.js projects, install the Mocha dependency, and run tests.

## General instructions

For each exercise below:

1. create an **ECMAScript module**;
2. export the function(s) you implement;
3. initialize an npm project:
    ```bash
    npm init
    ```
4. add the property `'type': 'module'` to the `package.json` file;
5. install Mocha:
    ```bash
    npm install mocha --save-dev
    ```
6. write a Mocha test file in the `test` directory to validate the expected behaviour;
7. update the `package.json` file to run tests with `mocha` via the `scripts.test` property;
8. run the tests from the terminal:
    ```bash
    npm test
    ```


## Exercise 1: Implement `function myEvery(array, callbackFn)`

- Receives an array `array` and a function `callbackFn`. You may choose to ignore the array argument and use `this` instead, and extend `Array.prototype`.
- Returns `true` if every element satisfies the condition implemented by `callbackFn`; otherwise, returns `false`.
- The `callbackFn` function receives an array element as an argument and returns `true` or `false`.
- Do not use the built-in Array method `Array.prototype.every`.

**Example:**

```javascript
    const numbers = [2, 6, 8, 10];
    console.log(myEvery(numbers, n => n % 2 === 0));
    // true
    console.log(numbers.myEvery(n => n % 2 === 0)); // using this
    // true
```

## Exercise 2: Implement `function filterProduct(products, minPrice)`

- Receives an array `products` (objects with at least a `price` property) and a number `minPrice`.
- Returns a new array containing only the products whose price is greater than `minPrice`.

**Example:**

```javascript
const products = [
  {name: 'Apple', price: 5},
  {name: 'Orange', price: 10},
  {name: 'Banana', price: 3}
]

const expensive = filterProduct(products, 4)
// expensive: [
//   {name: 'Apple', price: 5},
//   {name: 'Orange', price: 10}
// ]
```

## Exercise 3: Implement `function mapProduct(products)`

- Receives an array `products`.
- Returns a new array containing only the product names.

**Example:**

```javascript
const products = [
  {name: 'Apple', price: 5},
  {name: 'Orange', price: 10},
  {name: 'Banana', price: 3}
]

const names = mapProduct(products)
// names: ['Apple', 'Orange', 'Banana']
```

---

## Exercise 4: Implement `function reduceProduct(products)`

- Receives an array `products`.
- Returns the total sum of the prices of all products.

**Example:**

``` javascript
const products = [
  {name: 'Apple', price: 5},
  {name: 'Orange', price: 10},
  {name: 'Banana', price: 3}
]

const total = reduceProduct(products)
// total: 18
```

## Exercise 5: Implement `function filterProperties(propNames, obj)`
- Receives a string array in `propNames` and an object in `obj`.  
- Returns a new object with the properties from `obj` whose names are present in `propNames`.  
- If `propNames` contains names that do not exist in `obj`, those properties are not added to the returned object.

**Example:**

```javascript
const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'}

const props = ['b', 'd', 'g', 'a']
const oFiltered = filterProperties(props, o)
// oFiltered: {a: 1, b: 'Thor', d: {x: 10}}
```

## Implement `function filterPropertiesN(propNames, objs)`

- Receives a string array in `propNames` and an object array in `objs`.  
- Returns a new object array with objects produced by applying the `filterProperties` function with `propNames` to each object in `objs`.

**NOTE:** In this implementation, try not using any cycle instruction (`for`/`while`) or the `Array.prototype.forEach` method.

**Example:**

```javascript
const objs = [
   {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
   {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
   {x: 'Vision', y: false}
]

const props = ['b', 'd', 'g', 'a']
const objsFiltered = filterPropertiesN(props, objs)
/*
 objsFiltered: [
   {a: 1, b: 'Thor', d: {x: 10}},
   {b: 'Hulk', a: [1,2,3], d: {x: 10}, g: false}, 
   { }
 ]
*/
```