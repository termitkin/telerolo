import { buildMessage } from './buildMessage.js';
import type { TeleroloConfig } from '../../telerolo.js';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

const buildUrl = (teleroloConfig: TeleroloConfig): string => {
  const url = `${TELEGRAM_API_URL}${teleroloConfig.botToken}/sendMessage?${buildMessage(teleroloConfig)}`;

  console.log('url', url);

  return url;
};

export { buildUrl };
