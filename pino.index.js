const app = require('express')()

const {logger, contextMiddleware} = require('./pino.logger');

app.use(contextMiddleware);

app.get('/pino', async function (req, res) {
    logger.info(req, 'log 1');
    logger.info(req, 'log 2');
    logger.info(req, 'log 3');
    logger.info(req, 'log 4');
    logger.info(req, 'log 5');
    await new Promise(resolve => setTimeout(resolve, 500));
    logger.info(req, 'log 6');
    logger.info(req, 'log 7');
    logger.info(req, 'log 8');
    logger.info(req, 'log 9');
    logger.info(req, 'log 10');
    res.status(200).send({});
});

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});

app.listen(3000);