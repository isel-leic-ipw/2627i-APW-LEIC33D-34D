import assert from 'node:assert/strict';
import { containsWord, containsWordInFile } from '../src/functions/contains-word.mjs';

describe('Example 1: Finding Words in Text', () => {

    // Testing synchronous functions:
    describe('[Sync Tests] containsWord', () => {
        it('finds a word without considering letter case', () => {
            const buffer = Buffer.from('Promises help coordinate tasks.');
            assert.equal(containsWord(buffer, 'PROMISES'), true);
        });

        it('returns false when the word is absent', () => {
            const buffer = Buffer.from('Promises help coordinate tasks.');
            assert.equal(containsWord(buffer, 'javascript'), false);
        });
    });

    // Testing asynchronous functions with mocked Promise stubs:
    describe('[Async Tests] containsWordInFile', () => {
        it('returns true when the reader stub provides matching text in the Buffer', () => {
            const buffer = Buffer.from('Promises help coordinate tasks.');
            const mockReadBuffer = () => Promise.resolve(buffer);
            return containsWordInFile('unused.txt', 'promises', mockReadBuffer)
                .then(result => assert.equal(result, true));
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
                .then(result => assert.equal(result, false));
        });
    });
    
});