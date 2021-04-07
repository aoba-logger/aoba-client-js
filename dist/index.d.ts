interface LogStore {
    save(message: LogMessage): Promise<void>;
}

interface ClientConfig {
    server: string;
    logInClient?: boolean;
    store?: LogStore;
}
interface LogMessage {
    level: LogLevel | string;
    /** 'api error', 'network error', etc */
    type?: string;
    message: any[];
}
declare enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2
}
declare class AobaClient {
    constructor(config: ClientConfig);
    private console;
    private render;
    log(message: LogMessage): void;
    info(...message: any[]): void;
    warn(...message: any[]): void;
    error(...message: any[]): void;
    private store;
}

export { AobaClient };
