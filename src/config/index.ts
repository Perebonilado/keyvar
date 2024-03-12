export interface Config {
  databaseHost: string;
  databasePort: number;
  databaseUsername: string;
  databasePassword: string;
  database: string;
  awsAccessKey: string;
  awsSecretKey: string;
  awsStorageBucket: string;
  awsServerLocation: string;
}

export default (): Config => ({
  databaseHost: process.env.Database_Host,
  databasePort: process.env.Database_Port as unknown as number,
  databaseUsername: process.env.Database_Username,
  databasePassword: process.env.Database_Password,
  database: process.env.Database,
  awsAccessKey: process.env.Aws_Access_Key,
  awsSecretKey: process.env.Aws_Secret_Key,
  awsStorageBucket: process.env.Aws_Storage_Bucket,
  awsServerLocation: process.env.Aws_Server_Location,
});
