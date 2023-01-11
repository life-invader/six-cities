import type { ConfigSchemaType } from './config.schema';

export interface ConfigInterface {
  get<T extends keyof ConfigSchemaType>(key: T): ConfigSchemaType[T];
}
