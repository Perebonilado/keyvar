export interface Config {
  databaseHost: string;
  port: number;
  databasePort: number;
  databaseUsername: string;
  databasePassword: string;
  database: string;
  awsAccessKey: string;
  awsSecretKey: string;
  awsStorageBucket: string;
  awsServerLocation: string;
  butterCMSApiKey: string;
  emailHost: string;
  emailUser: string;
  emailPass: string;
  mailChimpApiKey: string;
  mailChimpServerPrefix: string;
  mailChimpAudienceId: string;
}

export default (): Config => ({
  databaseHost: process.env.Database_Host,
  port: process.env.port as unknown as number,
  databasePort: process.env.Database_Port as unknown as number,
  databaseUsername: process.env.Database_Username,
  databasePassword: process.env.Database_Password,
  database: process.env.Database,
  awsAccessKey: process.env.Aws_Access_Key,
  awsSecretKey: process.env.Aws_Secret_Key,
  awsStorageBucket: process.env.Aws_Storage_Bucket,
  awsServerLocation: process.env.Aws_Server_Location,
  butterCMSApiKey: process.env.Butter_CMS_API_KEY,
  emailHost: process.env.Email_host,
  emailPass: process.env.Email_pass,
  emailUser: process.env.Email_user,
  mailChimpApiKey: process.env.MAILCHIMP_API_KEY,
  mailChimpServerPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
  mailChimpAudienceId: process.env.MAILCHIMP_AUDIENCE_ID
});
