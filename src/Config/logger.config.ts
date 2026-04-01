import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "MM-DD-YYYY HH:mm:ss"
        }),
        winston.format.json(), // format the log message as json
        winston.format.printf(({level, message, timestamp,...data})=>{
            const output = {
                level,
                message,
                timestamp,
                ...data
            }
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.Console(),
        // TODO : we can add logic to integrate and save logs in mongodb
    ]

});

export default logger;