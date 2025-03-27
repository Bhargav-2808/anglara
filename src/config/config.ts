import { config as cfg } from 'dotenv';
import { z } from 'zod';
import path from 'path';

cfg({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = z.object({
  PORT: z
    .string({
      invalid_type_error: 'PORT must be a number',
      required_error: 'PORT is required',
    })
    .transform((PORT) => Number(PORT)),
  ENVIROMENT: z.string().optional(),
  DATABASE_URL: z.string({
    invalid_type_error: 'DATABASE_URL must be a string',
    required_error: 'DATABASE_URL is required',
  }),
  JWT_SECRET: z.string({
    invalid_type_error: 'JWT_SECRET must be a string',
    required_error: 'JWT_SECRET is required',
  }),
});

const envInput = envVarsSchema.safeParse(process.env);
const envVars = envInput.data;


if (envInput.error) {
  throw new Error('Add all env variables in .env file');
}

export const config = {
  app: {
    port: envVars?.PORT || 8080,
    env: envVars?.ENVIROMENT || 'development',
    dbURL: envVars?.DATABASE_URL || '',
  },
  jwt: {
    secret: envVars?.JWT_SECRET || '',
  }
};
