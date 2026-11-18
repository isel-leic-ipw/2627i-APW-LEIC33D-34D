import express from 'express';
import fs from 'node:fs/promises';

const PORT = 7200;
const app = express();

app.get('/:filename', readFile); // readFile returns a Promise

/*
// 404 Not Found handler: creates a 404 Error and passes it to the error handler middleware
app.use((req, res, next) => {
    const error = new Error(`Path not found - ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});
*/
app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
  );

// Functions:

function readFile (req, res, next) {
    const filename = req.params.filename;
    const filePromise = fs.readFile(filename);
    return filePromise.then(data => res.send(data));
}

// Error handler function as middleware can catch Promise rejections.
function errorHandler(err, req, res, next){
    console.log(err);
    switch (err.code) {
        case 'ENOENT':
            res.status(404).json({
                statusCode: 404,
                error: err.message
            });
            break;
        default:
            res.status(500).json({
                statusCode: 500,
                error: err.message
            });
    }
}
