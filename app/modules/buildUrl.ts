import { buildMessage } from './buildMessage.js';
import type { TeleroloConfig } from '../../telerolo.js';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

const buildUrl = (teleroloConfig: TeleroloConfig): string => {
  return `${TELEGRAM_API_URL}${teleroloConfig.botToken}/sendMessage?${buildMessage(teleroloConfig)}`;
};

export { buildUrl };
