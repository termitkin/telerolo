import type { Message, TeleroloConfig } from './../../telerolo.js';

const escapeSpecialChars = (str: string): string => {
  return str.replace(/([_*\[\]()~`>#+-=|{}.!])/g, '\\$1');
};

const buildMessageBody = (message: Message): string => {
  return escapeSpecialChars(message);
};

const buildMessage = (teleroloConfig: TeleroloConfig): string => {
  return new URLSearchParams({
    chat_id: teleroloConfig.chatId,
    parse_mode: teleroloConfig.parseMode,
    disable_web_page_preview: 'false',
    text: buildMessageBody(teleroloConfig.message),
  }).toString();
};

export { buildMessage };
