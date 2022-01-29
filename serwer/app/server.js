const express = require('express');
const app = express();
const { port } = require('./config');
const path = require('path');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const rateLimiterMiddleware = require('./middleware/rate-limiter-middleware');

// db connnect
require('./db/dbConnect');

app.use(express.static(path.join(__dirname, 'build')))

// ddos
app.use(rateLimiterMiddleware);
// parser
app.use(bodyParser.json());
// router
app.use('/api', apiRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
// connect server
app.listen(port, () => {
    console.log(`serwer słucha na porcie ${port}..... http://localhost:${port}`);
})
