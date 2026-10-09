import assert from 'node:assert/strict';
import { mock } from 'node:test';
import { containsWord, containsWordInFile } from '../src/functions/contains-word.mjs';

// A helper function that creates a wrapper around a given function to track the number of times it is called.
// This helper avoids using mock modules and provides a simple way to count function calls for testing purposes.
function createCallTracker(fn) {
    let count = 0;
    const tracked = function (...args) {
        count++;
        return fn(...args);
    };
    tracked.getCount = () => count;
    return tracked;
}

describe('Example 1: Finding Words in Text', () => {

    // Testing synchronous functions:
    describe('[Sync Tests] containsWord', () => {
        it('finds a word without considering letter case', () => {
            const buffer = Buffer.from('Promises help coordinate tasks.');
            assert.strictEqual(containsWord(buffer, 'PROMISES'), true);
        });

        it('returns false when the word is absent', () => {
            const buffer = Buffer.from('Promises help coordinate tasks.');
            assert.strictEqual(containsWord(buffer, 'javascript'), false);
        });

        // To test the number of calls to containsWord(), we can use:
        // [1] a mock function (needs to import mock from node:test) or 
        // [2] a wrapper function that counts calls (no need extra modules).

        it('[1] verifies the correct number of calls for an array of 2 buffers', () => {
            const bufferArray = [
                Buffer.from('Promises help coordinate tasks in JavaScript.'),
                Buffer.from('JavaScript is a programming language.')
            ];

            // Creates a mock function that wraps containsWord() and tracks its calls.
            const mockContainsWord = mock.fn(containsWord);

            // Calls the mock function for each buffer in the array.
            assert.strictEqual(bufferArray.every(buffer => mockContainsWord(buffer, 'javascript')), true);

            // Verifies that the mock function was called exactly 2 times.
            assert.strictEqual(mockContainsWord.mock.callCount(), 2); 
        });

        it('[2] verifies the correct number of calls for an array of 2 buffers', () => {
            
            // Creates a wrapper function (closure) that tracks the number of calls to containsWord().
            const callscontainsWord = createCallTracker(containsWord);

            const bufferArray = [
                Buffer.from('Promises help coordinate tasks in JavaScript.'),
                Buffer.from('JavaScript is a programming language.')
            ];

            assert.strictEqual(bufferArray.every(buffer => callscontainsWord(buffer, 'javascript')), true);
            
            // Verifica se foi chamado exatamente 2 vezes
            assert.strictEqual(callscontainsWord.getCount(), 2);
        });

    });

    // Testing asynchronous functions with mocked Promise stubs:
    describe('[Async Tests] containsWordInFile', () => {
        it('returns true when the reader stub provides matching text in the Buffer', () => {
            const buffer = Buffer.from('Promises help coordinate tasks.');
            const mockReadBuffer = () => Promise.resolve(buffer);
            return containsWordInFile('unused.txt', 'promises', mockReadBuffer)
                .then(result => assert.strictEqual(result, true));
        });

        it('rejects when the reader stub fails', () => {
            const mockReadBuffer = () => Promise.reject('Read failed');
            return assert.rejects(
                containsWordInFile('unused.txt', 'word', mockReadBuffer),
                /Read failed/
            );
        });

        it('returns false when the reader stub provides non-text bytes in the Buffer', () => {
            const mockReadBuffer = () => Promise.resolve(Buffer.from([0x00, 0xff, 0x00, 0xff]));
            return containsWordInFile('unused.bmp', 'image', mockReadBuffer)
                .then(result => assert.strictEqual(result, false));
        });
    });
    
});