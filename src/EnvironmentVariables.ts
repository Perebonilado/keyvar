import * as envConfigs from './config.json';

export interface Config {
  databaseHost: string;
  databasePort: number;
  databaseUsername: string;
  databasePassword: string;
  database: string;
}

export class EnvironmentVariables {
  public static get config(): Config {
    const ENV: string = process.env.NODE_ENV || 'local';

    return envConfigs[ENV];
  }
}
