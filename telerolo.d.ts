export type ParseMode = 'Markdown' | 'HTML';
export type Message = string;
export type BotToken = string;
export type ChatId = string;

export interface TeleroloConfig {
  message: Message;
  botToken: BotToken;
  chatId: ChatId;
  parseMode: ParseMode;
}
