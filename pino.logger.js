const pino = require('pino');
const uuid = require('uuid');
const context = require('./asyncContext.js');

const streams = [
    {
        stream: pino.destination({
            dest: `./pinoLogs/app.log`,
            sync: false
        })
    },
];

const logger = pino({
        level: process.env.PINO_LOG_LEVEL || 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level: (label) => {
                return {level: label};
            },
        },
        serializers: {
            err: (err) => {
                return {stack: err.stack, msg: err.message}
            }
        },
        hooks: {
            logMethod (inputArgs, method) {
                if (inputArgs.length === 2 && typeof inputArgs[0] === "string") {
                    const temp = inputArgs[0];
                    inputArgs[0] = {
                        additionalData: inputArgs[1],
                    };
                    inputArgs[1] = temp;
                }
                return method.apply(this, inputArgs)
            }
        }
    },
    pino.multistream(streams)
)

module.exports.logger = new Proxy(logger, {
    get(target, property, receiver) {
        target = context.getStore()?.get('logger') || target;
        return Reflect.get(target, property, receiver);
    },
});

module.exports.contextMiddleware = (req, res, next) => {
    const child = logger.child({
        requestId: uuid.v4(),
        correlationId: uuid.v4(),
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
        body: req.body,
        contentType: req.headers["content-type"],
        userAgent: req.headers["uer-agent"],
        host: req.headers.host,
        clientIP: req.socket.remoteAddress,
    });
    const store = new Map();
    store.set('logger', child);

    return context.run(store, next);
};