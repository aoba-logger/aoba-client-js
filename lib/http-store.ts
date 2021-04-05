import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { LogMessage } from './aoba-client';

const request = (config?: AxiosRequestConfig) => axios.create(config)


export interface LogStore {
  save(message: LogMessage): Promise<void>;
}

interface HttpStoreConfig {
  server: string;
}

export class HttpStore implements LogStore {
  async save (message: LogMessage) {
    await this.request.put('/log', message)
  }

  private request: AxiosInstance;

  constructor (config: HttpStoreConfig) {
    this.request = request({ baseURL: config.server })
  }
}