export type ParseMode = 'Markdown' | 'MarkdownV2' | 'HTML';

export interface TeleroloOptions {
  botToken: string;
}

export interface SendMessageParams {
  chatId: string;
  message: string;
  parseMode?: ParseMode;
  disableWebPagePreview?: boolean;
}

export class Telerolo {
  private readonly botToken: string;
  private static readonly TELEGRAM_API_URL = 'https://api.telegram.org/bot';

  constructor(options: TeleroloOptions) {
    if (!options.botToken) {
      throw new Error('Bot token is required');
    }
    this.botToken = options.botToken;
  }

  public async sendMessage(params: SendMessageParams) {
    this.checkSendMessageParams(params);
    const url = this.buildUrl(params);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private checkSendMessageParams(params: SendMessageParams): void {
    if (!params.chatId) {
      throw new Error('Chat ID is required');
    }

    if (!params.message) {
      throw new Error('Message is required');
    }
  }

  private buildUrl(params: SendMessageParams): string {
    const queryParams = new URLSearchParams({
      chat_id: params.chatId,
      text: params.message,
    });

    if (params.disableWebPagePreview !== undefined) {
      queryParams.set('disable_web_page_preview', String(params.disableWebPagePreview));
    }

    queryParams.set('parse_mode', params.parseMode ?? 'MarkdownV2');

    return `${Telerolo.TELEGRAM_API_URL}${this.botToken}/sendMessage?${queryParams.toString()}`;
  }
}
