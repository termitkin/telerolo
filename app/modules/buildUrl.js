import { buildMessage } from './buildMessage.js';
const TELEGRAM_API_URL = 'https://api.telegram.org/bot';
const buildUrl = (teleroloConfig) => {
    return `${TELEGRAM_API_URL}${teleroloConfig.botToken}/sendMessage?${buildMessage(teleroloConfig)}`;
};
export { buildUrl };
//# sourceMappingURL=buildUrl.js.map