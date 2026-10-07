import { containsWordInFile } from '../functions/contains-word.mjs';

const filePath = new URL('../../data/file-test.txt', import.meta.url);
const filePathImg = new URL('../../data/chapter_picture_6.jpg', import.meta.url);
const word = 'example';

containsWordInFile(filePath, word)
  .then((isPresent) => isPresent ? 'contains' : 'does not contain')
  .then((message) => console.log(`The file ${filePath.pathname} ${message} the word "${word}".`))
  .catch((error) => console.error('Error reading the file:', error.message));


containsWordInFile(filePathImg, word)
  .then((isPresent) => isPresent ? 'contains' : 'does not contain')
  .then((message) => console.log(`The file ${filePathImg.pathname} ${message} the word "${word}".`))
  .catch((error) => console.error('Error reading the file:', error.message));