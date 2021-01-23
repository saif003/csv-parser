import { EnvVariable } from './constants';

export const getEnvVariable = (key) => {
  return key ? process.env[key] : undefined;
};

export const isProductionEnv = () => {
  return getEnvVariable(EnvVariable.nodeEnv) === 'production';
};