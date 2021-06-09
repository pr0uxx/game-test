export class Logger {
    static log: Log[] = [];
    static DebugToConsole: boolean = true;
    static logError(message: any) {
        this.logMessage(LogSeverity.Error, message);
    }

    static logInfo(message: any) {
        this.logMessage(LogSeverity.Info, message)
    }

    static logDebug(message: any) {
        this.logMessage(LogSeverity.Debug, message)
    }

    static logWarning(message: any) {
        this.logMessage(LogSeverity.Warning, message)
    }

    static logException(message: string)
    {
        console.exception(message);
    }

    private static logMessage(severity: LogSeverity, message: any) {
        if (Logger.DebugToConsole) {
            switch (severity) {
                case LogSeverity.Debug:
                    console.debug(message);
                case LogSeverity.Info:
                    console.info(message);
                    break;
                case LogSeverity.Warning:
                    console.warn(message)
                    break;
                case LogSeverity.Error:
                    console.error(message);
                    break;
            }
        }
        const l = new Log(severity, message);
        Logger.log ? Logger.log.push(l) : Logger.log = [l];
    }
}

class Log {
    constructor(s: LogSeverity, message: string) {
        this.severity = s;
        this.message = message;
        this.date = new Date();
    }

    message: string;
    date: Date;
    severity: LogSeverity
}

export enum LogSeverity {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 3
}