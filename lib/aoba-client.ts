import { HttpStore, LogStore } from "./http-store"

interface ClientConfig {
  server: string;
  logInClient?: boolean;
  store?: LogStore;
}

export interface LogMessage {
  level: LogLevel | string;
  /** 'api error', 'network error', etc */
  type?: string;
  message: any[];
}

function isLogMessage(message: LogMessage | string): message is LogMessage {
  return (message as LogMessage).level !== undefined
}

enum LogLevel {
  INFO,
  WARN,
  ERROR,
}

interface RenderFormat {
  color: string;
  method: Console['log'] | Console['warn'] | Console['error'];
}

export class AobaClient {
  constructor(config: ClientConfig) {
    if (window && window.console) {
      this.console.log = window.console.log
      this.console.warn = window.console.warn
      this.console.error = window.console.error

      window.addEventListener('error', (e) => {
      })
    }

    this.store = new HttpStore(config)
  }

  private console: {
    log: Console['log'],
    warn: Console['warn'],
    error: Console['error']
  }

  private render(message: any[], format?: RenderFormat) {
    const engine = format?.method ?? this.console.log
    engine(...message)
  }

  log(message: LogMessage) {
    switch (message.level) {
      case LogLevel.INFO:
        break;
      case LogLevel.WARN:
        break;
      case LogLevel.ERROR:
        break;
      default:
        this.render(message.message)
        break;
    }
    this.store.save(message)
  }

  info(...message: any[]) {
    this.log({
      level: LogLevel.INFO,
      message
    })
  }

  warn(...message: any[]) {
    this.log({
      level: LogLevel.WARN,
      message
    })
  }

  error(...message: any[]) {
    this.log({
      level: LogLevel.ERROR,
      message
    })
  }

  private store: LogStore
}