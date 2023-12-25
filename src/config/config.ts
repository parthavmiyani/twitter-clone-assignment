import IConfig from './../interface/config.interface';

const config: IConfig = {
  PORT: Number(process.env.PORT) || 3000,
  DB_CONFIG: {
    DB_URI: process.env.MONGO_URI as string,
  },
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRATION || '1d',
  },
};

export default config;
