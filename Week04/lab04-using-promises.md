# Lab 04: Asynchronous Programming and Promises

## Goal

In this lab, students will practice asynchronous JavaScript using Promises and the `fetch` API. The focus is on:

- reading and writing files with `fs/promises`;
- handling asynchronous flow explicitly with `then()` and `catch()`;
- making HTTP requests with `fetch()`;
- composing concurrent async operations with `Promise.all()` and `Promise.any()`;
- implementing small programs that solve practical problems using Promises;
- writing Mocha tests for Exercise 1 and Exercise 3 only.

## General instructions

For each exercise below:

1. Implement the requested functions in ECMAScript modules and export them where specified.
2. Keep synchronous logic synchronous. For asynchronous operations, return a Promise and use `then()` and `catch()`; do not use `async`/`await`.
3. Create a separate main module for each exercise. It should import and call the required function(s), then display the result.
4. Write Mocha tests with `node:assert` only for Exercises 1 and 3. Validate the other exercises by running their main modules.
5. In the Mocha exercises, separate synchronous logic from asynchronous operations and use stubs for file reading or `fetch`, as explained in the lesson.
6. Run the tests with `npm test` and verify that they pass.
7. Save the final versions in your private repository.

### Example project structure

```text
lab04/
├── data/
│   ├── products.json
│   └── text.txt
├── src/
│   ├── functions/
│   │   ├── 01-read-json.mjs
│   │   ├── 02-first-line.mjs
│   │   └── ...
│   └── main/
│       ├── 01-read-json-main.mjs
│       ├── 02-first-line-main.mjs
│       └── ...
├── test/
│   ├── 01-read-json.test.mjs
│   └── 03-count-word.test.mjs
├── package.json
└── node_modules/
```

### Initial commands

```bash
npm init
npm install mocha --save-dev
```

### Package configuration

In `package.json`, add:

```json
{
  "type": "module",
  "scripts": {
    "test": "mocha"
  }
}
```

### Commands

```bash
npm test
```

---

## Exercise 1: Read a JSON file and print the parsed object

Implement a program that reads a JSON file and prints the parsed object, while separating the pure logic from the asynchronous file-reading step.

In the main module, use a real file and print the parsed data and one selected value.

<details>
<summary>Hint</summary>

- Separate the logic into two functions:
  - `parseJson(text)`: only parses the string content as JSON.
  - `readJsonFile(filePath, readText = readFile)`: reads the file and then delegates to `parseJson()`.
- Read the file as UTF-8 text so that `parseJson()` receives a string.
- Use `then()` and `catch()` to handle the Promise returned by the file-reading operation.
- For Mocha tests, call `parseJson()` directly with different strings and inject a stub for `readText` in `readJsonFile()`.

</details>

### Tasks

1. Create `src/functions/01-read-json.mjs` and export the required functions.
2. Create `src/main/01-read-json-main.mjs`; import and call the main function there.
3. Create a JSON fixture with a list of objects and run the main module to print the parsed data and one selected value.
4. In the main module, print the parsed data and one value from it, such as a product name or price.
5. Create a Mocha test file for this exercise with `node:assert`.
6. Test the synchronous logic directly with different JSON strings and use a stub to simulate the file read in the async function.
7. Include at least one success case and one failure case in the Mocha tests.

---

## Exercise 2: Read a file, extract the first line, and save it to a new file

Implement an exported `saveFirstLine(inputPath, outputPath)` function that reads a text file, writes its first line to another file, and returns a Promise fulfilled with the line written. In a separate main module, call the function and report the result.

<details>
<summary>Hint</summary>

- Use `readFile()` and `writeFile()` from `fs/promises`.
- Read the file content as text.
- Extract only the first line.
- Use `then()` chaining to process the data and `catch()` to handle errors.

</details>

### Tasks

1. Create `src/functions/02-first-line.mjs` and export `saveFirstLine(inputPath, outputPath)`.
2. Create `src/main/02-first-line-main.mjs`; import and call the function there.
3. Run the main module with files containing multiple lines, a single line, and no content.
4. In the main module, report the line written to the output file.

---

## Exercise 3: Count the occurrences of a word in fetched text

Implement a program that counts how many times a word appears in text returned by an HTTP request, while separating the pure logic from the asynchronous fetch step.

<details>
<summary>Hint</summary>

- Separate the logic into two functions:
  - `countWord(text, word)`: only counts the number of occurrences in a string.
  - `countWordFromFetch(url, word, fetchImpl = fetch)`: performs the request with `fetch()` and then delegates to `countWord()`.
- Check `response.ok` before reading the response body. If it is `false`, reject with a message that includes `response.status`.
  - For a successful response, read its body with `response.text()` and pass the resulting text to `countWord()`.
- Use `then()` and `catch()` to handle the Promise returned by the request.
- For Mocha tests, test `countWord()` directly with different strings and use a `fetchImpl` stub that supplies a response object.

</details>

### Tasks

1. Create `src/functions/03-count-word.mjs` and export the required functions.
2. Create `src/main/03-count-word-main.mjs`; fetch a real page there, call the main function, and display the result.
3. Try a few different examples in the main module to check case-insensitive matching and repeated occurrences.
4. In the main module, print the count in a clear message.
5. Create a Mocha test file for this exercise with `node:assert`.
6. Test the synchronous logic directly with different strings and use a stub to simulate the network response in the async function.
7. Include Mocha tests for matching and non-matching words, case-insensitive comparisons, successful responses, unsuccessful HTTP status codes, and rejected fetch requests.

---

## Exercise 4: Observe concurrency with `Promise.all()`

Compare running several delayed tasks sequentially with running them concurrently using `Promise.all()`. Use Promises based on `setTimeout()` so that the timing comparison is repeatable and does not depend on network conditions.

The following code provides the sequential version. Use it as a baseline, then implement a concurrent version that starts the same tasks together with `Promise.all()`.

```javascript
// src/functions/04-delayed-task.mjs
export function delayedTask(label, delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve(label), delay);
  });
}
```

```javascript
// src/main/04-sequential-observation.mjs
import { delayedTask } from '../functions/04-delayed-task.mjs';

const results = [];
const startTime = Date.now();

delayedTask('Task A', 1000)
  .then(result => {
    results.push(result);
    return delayedTask('Task B', 2000);
  })
  .then(result => {
    results.push(result);
    return delayedTask('Task C', 1500);
  })
  .then(result => {
    results.push(result);
    console.log('Sequential results:', results);
    console.log(`Sequential elapsed time: ${Date.now() - startTime} ms`);
  })
  .catch(error => console.error('Error:', error));
```

Keep the `delayedTask()` function unchanged. Run the sequential and concurrent versions separately so their tasks do not overlap while you measure them.

### Tasks

1. Create `src/functions/04-delayed-task.mjs` and export `delayedTask()`.
2. Create `src/main/04-sequential-observation.mjs`, import `delayedTask()`, and run the sequential code above.
3. Create `src/main/04-promise-all-observation.mjs`. Import `delayedTask()` and implement a concurrent version that starts the same three tasks together using `Promise.all()`.
4. Measure and print the elapsed time and results for both runs. Run the two main modules separately.
5. Use `then()` and `catch()` to handle the returned Promise.

### Questions

1. How do the measured durations compare with the expected sequential duration (the sum of the delays) and concurrent duration (approximately the longest delay)?
2. If you change the task delays but keep their order in the input array, what changes in the elapsed time and in the order of the results returned by `Promise.all()`?

No Mocha tests are required for this exercise. Validate it by running both main modules separately and observing their output.

---

## Exercise 5: Get the titles of multiple web pages

Implement an exported `getPageTitles(responses)` function that receives an array of HTTP response objects and returns a Promise fulfilled with an array containing the title from each page. A title is the text between the `<title>` and `</title>` tags. This function must not call `fetch()`. In a separate main module, fetch multiple URLs concurrently, pass their response array to the function, and print the titles.

<details>
<summary>Hint</summary>

- Use `Promise.all()` in the main module to fetch several URLs.
- Check each response's `ok` property; reject unsuccessful HTTP responses with a message that includes the status code.
- Pass the resulting array of Responses to `getPageTitles()`.
- In `getPageTitles()`, read each response body as text and extract the title between `<title>` and `</title>`.
- Use `then()` and `catch()` to handle the Promise returned by the function and any errors in the main module.

</details>

### Tasks

1. Create `src/functions/05-fetch-several.mjs` and export `getPageTitles(responses)`.
2. Create `src/main/05-fetch-several-main.mjs`; fetch the URLs there, pass the response objects to the function, and display the result.
3. Try arrays containing different numbers of responses, including an empty array, by calling the function from the main module.
4. In the main module, print each page title.

---

## Exercise 6: Get the first successful text from multiple requests

Implement an exported `firstSuccessfulText(textPromises)` function that receives an array of Promises for response texts and returns a Promise fulfilled with the first text to arrive successfully. The function must not call `fetch()`. In a separate main module, create the text Promises by fetching URLs. Check each response's `ok` property and reject unsuccessful HTTP responses before reading their text.

<details>
<summary>Hint</summary>

- Use `Promise.any()` with the supplied text Promises.
- In the main module, check each HTTP response and reject unsuccessful responses before calling `response.text()`.
- Use `then()` to process the first successful text.
- Use `catch()` to handle the case when all supplied Promises reject.

</details>

### Tasks

1. Create `src/functions/06-first-success.mjs` and export `firstSuccessfulText(textPromises)`.
2. Create `src/main/06-first-success-main.mjs`; create the fetch-and-text Promises there, then pass them to `firstSuccessfulText()`.
3. From the main module, validate with fulfilled Promises containing different texts, a mix of fulfilled and rejected Promises, and an empty array.
4. In the main module, print the beginning of the content for validation.

---

## Main programs and tests for selected exercises

- The only exercises that require Mocha tests are Exercise 1 and Exercise 3.
- The remaining exercises should be validated by running their main programs and checking the output in the terminal.

### Important rule for asynchronous code

- When the function under Mocha test returns a Promise, the test should also return that Promise.
  - This allows Mocha to wait for the asynchronous result before finishing the test.
  - Return the Promise from each asynchronous test so Mocha waits for it.
- Use `assert.rejects()` to verify expected Promise rejections.
- In these two exercises, keep the synchronous logic separate from the asynchronous code and use stubs for external dependencies such as file reading or `fetch`, following the approach shown in the lesson.

## Final check and submission

Before finishing the lab:

1. confirm that each exercise has the required exported function(s) and a separate main module; asynchronous functions should return Promises;
2. write Mocha tests only for Exercise 1 and Exercise 3, covering several input values and edge cases;
3. run the full test suite and verify that the tested functions pass the specified checks;
4. test both success and failure cases when relevant;
5. run each main module to check its user-facing output;
6. save the final versions in your private repository.
