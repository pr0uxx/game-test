export class Logger {
    static DebugToConsole: boolean = true;
    static logError(message: any) {
        this.log(LogSeverity.Error, message);
    }

    static logInfo(message: any) {
        this.log(LogSeverity.Info, message)
    }

    static logDebug(message: any) {
        this.log(LogSeverity.Debug, message)
    }

    static logWarning(message: any) {
        this.log(LogSeverity.Warning, message)
    }

    static logException(message: string)
    {
        console.exception(message);
    }

    private static log(severity: LogSeverity, message: any) {
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
        globalThis.gameLog ? globalThis.gameLog.push(l) : globalThis.gameLog = [l];
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