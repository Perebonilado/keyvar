import { Sequelize } from 'sequelize-typescript';
import { EnvironmentVariables } from 'src/EnvironmentVariables';
import { JobRole } from '../models/JobRole';
import { Service } from '../models/Service';
import { JobApplicant } from '../models/JobApplicant';
import { BusinessLead } from '../models/BusinessLead';
import { NewsInsightSubscriber } from '../models/NewsInsightSubscriber';
import { BusinessEnquiry } from '../models/BusinessEnquiry';
import { JobApplication } from '../models/JobApplication';
import { JobStatus } from '../models/JobStatus';

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
        Service,
        JobApplicant,
        BusinessLead,
        NewsInsightSubscriber,
        BusinessEnquiry,
        JobApplication,
        JobStatus,
      ]);

      await sequelize.sync();
      
      return sequelize;
    },
  },
];
