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
      this.console = window.console

      window.addEventListener('error', (e) => {
        this.error(e)
      })
    }

    this.store = config.store ?? new HttpStore(config)
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
    const format = {
      color: 'cyan',
      method: this.console.log
    }
    switch (message.level) {
      case LogLevel.INFO:
        this.render(message.message, format)
        break;
      case LogLevel.WARN:
        format.method = this.console.warn
        this.render(message.message, format)
        break;
      case LogLevel.ERROR:
        format.method = this.console.error
        this.render(message.message, format)
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