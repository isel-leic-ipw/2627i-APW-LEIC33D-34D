import express from 'express';
import { hashSync, hash } from 'bcrypt';
const app = express();

app.use(express.json());

// Fast route: verifies the server is running
app.get('/status', (req, res) => {
    const time = new Date().toLocaleTimeString('pt-PT');
    const date = new Date().toLocaleDateString('pt-PT');
    res.send(`${date} ${time} - Server is ok!`);
});

// Slow route: uses synchronous bcrypt with high processing cost
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    console.log(`Starting hash for user: ${username}`);
    
    const startTime = Date.now();
    
    // PROBLEM: bcrypt.hashSync is BLOCKING. 
    // The salt rounds = 18 demands a significant amount of CPU time.
    const saltRounds = 18;
    const hashedPassword = hashSync(password, saltRounds);

    // Do something with the hashed password (e.g., save to database)
    
    const duration = Date.now() - startTime;
    console.log(`Hash completed in ${duration}ms`);

    res.status(201).send(`User registered in ${duration}ms`);
});

app.post('/registerAsync', (req, res) => {
    const { username, password } = req.body;
    const startTime = Date.now();

    // Without a callback, bcrypt.hash returns a Promise
    return hash(password, 18)
        .then(hashedPassword => {

            // Do something with the hashed password (e.g., save to database)

            const duration = Date.now() - startTime;
            console.log(`Hash (async) completed in ${duration}ms`);

            res.status(201).send(`User registered in ${duration}ms`);
        })
        .catch(() => res.status(500).send('Internal error'));
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});