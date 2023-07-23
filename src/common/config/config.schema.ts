import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchemaType = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  OFFER_IMAGES_UPLOAD_DIRECTORY: string;
  STATIC_DIRECTORY_PATH: string;
  JWT_SECRET: string;
  HOST: string;
};

export const configSchema = convict<ConfigSchemaType>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'MongoDB ip address',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USER: {
    doc: 'Username to connect to MongoDB',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to MongoDB',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to MongoDB',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'course-nodejs-restapi',
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for uploads',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  OFFER_IMAGES_UPLOAD_DIRECTORY: {
    doc: 'Directory for offer images',
    format: String,
    env: 'OFFER_IMAGES_UPLOAD_DIRECTORY',
    default: null,
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Directory for static recourses that wont change',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: null,
  },
  JWT_SECRET: {
    doc: 'Secret string for JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
  HOST: {
    doc: 'Host',
    format: String,
    env: 'HOST',
    default: 'localhost',
  },
});
