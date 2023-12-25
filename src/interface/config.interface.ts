export default interface IConfig {
  PORT: number;
  DB_CONFIG: {
    DB_URI: string;
  };
  JWT: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
  };
}
