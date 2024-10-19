import * as dev from './default';

export function get<T>(key: string): T {
  let config: Record<string, unknown>;

  switch (process.env.APP_ENV) {
    case 'staging':
      config = dev // Updated to staging when required
      break;
    default:
      config = dev;
      break;
  }

  return config[key] as T;
}
