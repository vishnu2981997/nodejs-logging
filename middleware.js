const resDotSendInterceptor = (res, send) => (content) => {
    res.contentBody = content;
    res.send = send;
    res.send(content);
};

const requestLoggerMiddleware = ({logger}) => (req, res, next) => {
    const startTime = process.hrtime();
    res.send = resDotSendInterceptor(res, res.send);
    res.on("finish", () => {
        const totalTime = process.hrtime(startTime);
        const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
        logger.info({body: res.contentBody, responseTime: totalTimeInMs});
    });
    next();
};

module.exports = {requestLoggerMiddleware};