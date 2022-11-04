import { sendMessage } from './modules/sendMessage.js';
import { checkConfig } from './modules/checkConfig.js';
import type { TeleroloConfig } from '../telerolo.js';

const telerolo = async (teleroloConfig: TeleroloConfig): Promise<boolean> => {
  try {
    const config = checkConfig(teleroloConfig);

    return sendMessage(config);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }

    console.log(e);

    return false;
  }
};

export { telerolo };
