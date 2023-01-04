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
        formatters: {
            level: (label) => {
                return {level: label};
            },
        },
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
    const child = logger.child({ requestId: uuid.v4() });
    const store = new Map();
    store.set('logger', child);

    return context.run(store, next);
};