import * as config from './config/index';
export const MONGODB_URL: string = config.get('MONGODB_URL') || '';
export const IS_SEED_ENABLED: boolean = config.get('IS_SEED_ENABLED') || false;
export const PORT: number = config.get('PORT') || 3000;