const {createLogger, transports, format} = require("winston");
const { combine, timestamp, label } = format;
require("winston-daily-rotate-file");

const CATEGORY = "Log Rotation";

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "winstonLogs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
});

const logger = createLogger({
    level: "debug",
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        format.json()
    ),
    transports: [fileRotateTransport],
});

module.exports = logger;