import type { TeleroloConfig } from '../../telerolo.js';

const checkConfig = (config: TeleroloConfig): TeleroloConfig => {
  if (!config.botToken) {
    throw new Error('Bot token is required');
  }

  if (!config.chatId) {
    throw new Error('Chat ID is required');
  }

  if (!config.message) {
    throw new Error('Message is required');
  }

  if (!config.parseMode) {
    throw new Error('Parse mode is required');
  }

  return config;
};

export { checkConfig };
