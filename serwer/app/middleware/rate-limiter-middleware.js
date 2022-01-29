const {RateLimiterMemory} = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
    points: 2, // how requests
    duration: 1 // time duration
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip).then(() => {
        next();
    })
    .catch(() => {
        res.status(429).send('Too many Requests')
    })
}

module.exports = rateLimiterMiddleware;