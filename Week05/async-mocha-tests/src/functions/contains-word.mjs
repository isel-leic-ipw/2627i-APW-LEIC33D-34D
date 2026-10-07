import { readFile } from 'node:fs/promises';

/**
 * Checks whether a given word appears as a standalone token in a buffer's text.
 * Parameters:
 *    buffer: The data whose content will be searched.
 *    word: The word to look for as a standalone token.
 *    return: True if the word is found as a standalone token, otherwise false.
 */
export function containsWord(buffer, word) {
    let text = buffer.toString();
    // /\W+/ is a regular expression that matches consecutive non-word characters.
    return text.toLowerCase().split(/\W+/).includes(word.toLowerCase());
}

/**
 * Reads a file and checks whether it contains the specified word.
 * Parameters:
 *    filePath: The path to the file to read.
 *    word: The word to look for in the file content.
 *    readBuffer (optional): A function used to read the file buffer.
 *    return: A promise that resolves to true if the word is found, otherwise false.
 */
export function containsWordInFile(filePath, word, readBuffer = readFile) {
    return readBuffer(filePath)
        .then(buffer => containsWord(buffer, word));
}