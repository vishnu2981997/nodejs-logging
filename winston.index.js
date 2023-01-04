const express = require("express");
const logger = require("./winston.logger");
const {uuid} = require("uuidv4");
const app = express();

app.use((req, res, next) => {
    req.meta = {
        requestId: uuid(),
        correlationId: uuid(),
    };
    next();
})

app.get("/winston", async (req, res, next) => {
    logger.info('log 1', req);
    logger.info('log 2', req);
    logger.info('log 3', req);
    logger.info('log 4', req);
    logger.info('log 5', req);
    await new Promise(resolve => setTimeout(resolve, 500));
    logger.info('log 6', req);
    logger.info('log 7', req);
    logger.info('log 8', req);
    logger.info('log 9', req);
    logger.info('log 10', req);
    res.status(200).send({});
});

app.listen(3001, () => {
    logger.info("Server Listening On Port 3000");
});