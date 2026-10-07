import assert from 'node:assert/strict';
import { countNonEmptyLines, fetchLineCount } from '../src/functions/fetch-line-count.mjs';

describe('Example 2: Counting Non-Empty Lines', () => {

    // Testing synchronous functions:
    describe('[Sync] Testing countNonEmptyLines', () => {
        it('counts a single non-empty line', () => {
            assert.equal(countNonEmptyLines('Hello world'), 1);
        });

        it('counts non-empty lines', () => {
            assert.equal(countNonEmptyLines('Hello world\n\nJavaScript is simple.'), 2);
        });

        it('ignores lines containing only whitespace', () => {
            assert.equal(countNonEmptyLines('Hello\n  \n\t\nWorld'), 2);
        });

        it('returns zero when the text is empty', () => {
            assert.equal(countNonEmptyLines(''), 0);
        });

        it('handles Windows-style line endings', () => {
            assert.equal(countNonEmptyLines('First line\r\n\r\nSecond line'), 2);
        });
    });

    // Testing asynchronous functions with mocked fetch implementations:
    describe('[Async] Testing fetchLineCount', () => {
        it('counts non-empty lines in the fetched text', () => {
            const mockFetch = () => Promise.resolve({
                ok: true,
                text: () => Promise.resolve('Hello world\n\nJavaScript is simple.')
            });

            return fetchLineCount('https://unused.example', mockFetch)
                .then(result => assert.equal(result, 2));
        });

        it('rejects when the response has not successful status', () => {
            const mockFetch = () => Promise.resolve({
                ok: false,
                status: 404
            });

            return assert.rejects(
                fetchLineCount('https://unused.example', mockFetch),
                /HTTP error: 404/
            );
        });

        it('rejects when the fetch operation fails', () => {
            const mockFetch = () => Promise.reject('Network unavailable');

            return assert.rejects(
                fetchLineCount('https://unused.example', mockFetch),
                /Network unavailable/
            );
        });
    });
});