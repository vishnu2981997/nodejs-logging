const resDotSendInterceptor = (correlationId, res, send) => (content) => {
    res.contentBody = content;
    res.send = send;
    res.send({...content, correlationId: correlationId});
};

const startTimeMiddleware = (req, res, next) => {
    req.startTime = process.hrtime();
    next();
}

const requestLoggerMiddleware = ({logger}) => (req, res, next) => {
    const startTime = req.startTime;
    res.send = resDotSendInterceptor(req.correlationId, res, res.send);
    res.on("finish", () => {
        const totalTime = process.hrtime(startTime);
        const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
        logger.info({response: res.contentBody, responseTime: totalTimeInMs});
    });
    next();
};

module.exports = {requestLoggerMiddleware, startTimeMiddleware};