import { Sequelize } from 'sequelize-typescript';
import { EnvironmentVariables } from 'src/EnvironmentVariables';
import { JobRole } from '../models/JobRole';
import { Services } from '../models/Services';
import { JobApplicant } from '../models/JobApplicant';
import { BusinessLead } from '../models/BusinessLead';
import { NewsInsightSubscriber } from '../models/NewsInsightSubscriber';
import { BusinessEnquiry } from '../models/BusinessEnquiry';

export let sequelize: Sequelize;

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (): Promise<Sequelize> => {
      sequelize = new Sequelize({
        dialect: 'mysql',
        host: EnvironmentVariables.config.databaseHost,
        port: EnvironmentVariables.config.databasePort,
        username: EnvironmentVariables.config.databaseUsername,
        password: EnvironmentVariables.config.databasePassword,
        database: EnvironmentVariables.config.database,
        logging: false,
        logQueryParameters: false,
        define: { timestamps: false },
      });
      sequelize.addModels([
        JobRole,
        Services,
        JobApplicant,
        BusinessLead,
        NewsInsightSubscriber,
        BusinessEnquiry
      ]);
      return sequelize;
    },
  },
];
