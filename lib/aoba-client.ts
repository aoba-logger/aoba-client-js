import { HttpStore, LogStore } from "./http-store"

interface ClientConfig {
  server: string;
  logInClient?: boolean;
}

export interface LogMessage {
  level: LogLevel | string;
  message: string;
}

function isLogMessage(message: LogMessage | string): message is LogMessage {
  return (message as LogMessage).level !== undefined
}

enum LogLevel {
  INFO,
  WARN,
  ERROR,
}

interface LogFormat {
  color: string;
}
const formatter = (message: string, format?: LogFormat) => {
  console.log(message)
}

export class AobaClient {
  constructor (config: ClientConfig) {
    if (window) {
      window.addEventListener('error', (e) => {
      })
    }

    this.store = new HttpStore(config)
  }

  log (message: LogMessage | string) {
    if (isLogMessage(message)) {
      switch (message.level) {
        case LogLevel.INFO:
          this.info(message.message)
          break;
        case LogLevel.WARN:
          this.warn(message.message)
          break;
        case LogLevel.ERROR:
          this.error(message.message)
          break;
        default:
          // TODO: need refactor
          throw new Error(message.message)
      }
    } else {
      this.info(message);
    }
  }

  info (message: string) {
    formatter(message)
  }

  warn (message: string) {
    formatter(message)
  }

  error (message: string) {
    formatter(message)
  }

  private store: LogStore
}