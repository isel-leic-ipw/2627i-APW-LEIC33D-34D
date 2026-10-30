import express from 'express'

const app = express()
app.use(express.json())

// Middleware 1: logs every request
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
}

// Middleware 2: checks for an API key in the "x-api-key" header
function requireApiKey(req, res, next) {
    console.log('Checking for API key...')
    if (req.get('x-api-key') !== 'secret') {
        return res.status(401).json({ error: 'Missing or invalid API key' })
    }
    next()
}

// Middleware 3: measures how long the request takes
function measureResponseTime(req, res, next) {
    const startedAt = Date.now();
    // When the response is finished, log the time taken
    // res.on('finish', ...) is an event listener that triggers when the response has been sent
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} took ${Date.now() - startedAt}ms`)
    })
    next()
}

// 1. Applied globally to all routes
app.use(logger)

// 2. Applied to all routes under a path prefix
app.use('/admin', requireApiKey)

// 3. No extra middleware (only the global logger runs)
app.get('/', (req, res) => {
    res.send('Public home page')
})

// 4. Middleware with app.get
app.get('/private', requireApiKey, (req, res) => {
    res.send('Private data')
})

// 5. Checks the API key and name before creating an item
app.post('/lists', requireApiKey, measureResponseTime, (req, res) => {
    res.status(201).json({ name: req.body.name })
})

// 6. Reuses the same middleware when updating an item
app.put('/lists/:id', measureResponseTime, (req, res) => {
    res.json({ id: req.params.id, name: req.body.name })
})

// 7. Covered by app.use('/admin', ...)
app.delete('/admin/lists/:id', (req, res) => {
    res.json({ deleted: req.params.id })
})

app.listen(3001, () => console.log('Listening on http://localhost:3001'))
