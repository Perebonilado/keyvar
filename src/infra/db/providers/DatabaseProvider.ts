import { Sequelize } from 'sequelize-typescript';
import { EnvironmentVariables } from 'src/EnvironmentVariables';
import { JobRoleModel } from '../models/JobRoleModel';
import { PricingPlanModel } from '../models/PricingPlanModel';
import { JobApplicantModel } from '../models/JobApplicantModel';
import { BusinessLeadModel } from '../models/BusinessLeadModel';
import { NewsInsightSubscriberModel } from '../models/NewsInsightSubscriberModel';
import { BusinessEnquiryModel } from '../models/BusinessEnquiryModel';
import { JobApplicationModel } from '../models/JobApplicationModel';
import { JobStatusModel } from '../models/JobStatusModel';

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
        JobRoleModel,
        PricingPlanModel,
        JobApplicantModel,
        BusinessLeadModel,
        NewsInsightSubscriberModel,
        BusinessEnquiryModel,
        JobApplicationModel,
        JobStatusModel,
      ]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
