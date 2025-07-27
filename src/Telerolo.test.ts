import { describe, it, expect, vi, type Mock } from 'vitest';
import { Telerolo } from './Telerolo.js';

global.fetch = vi.fn();

describe('Telerolo', () => {
  const botToken = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';

  it('should create an instance of Telerolo', () => {
    const telerolo = new Telerolo({ botToken });
    expect(telerolo).toBeInstanceOf(Telerolo);
  });

  it('should throw an error if botToken is not provided', () => {
    expect(() => new Telerolo({} as any)).toThrow('Bot token is required');
  });

  describe('sendMessage', () => {
    const telerolo = new Telerolo({ botToken });
    const chatId = '@test_channel';
    const message = 'Test message';

    it('should send a message successfully', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve({ ok: true }) };
      (fetch as Mock).mockResolvedValue(mockResponse);

      const result = await telerolo.sendMessage({ chatId, message });

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(botToken), expect.any(Object));
      expect(result).toEqual({ ok: true });
    });

    it('should throw an error if chat ID is not provided', async () => {
      await expect(telerolo.sendMessage({ message } as any)).rejects.toThrow('Chat ID is required');
    });

    it('should throw an error if message is not provided', async () => {
      await expect(telerolo.sendMessage({ chatId } as any)).rejects.toThrow('Message is required');
    });

    it('should throw an error if the fetch request fails', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };
      (fetch as Mock).mockResolvedValue(mockErrorResponse);

      await expect(telerolo.sendMessage({ chatId, message })).rejects.toThrow('Telegram API error: 404 Not Found');
    });

    it('should correctly build the URL with all parameters', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve({ ok: true }) };
      (fetch as Mock).mockResolvedValue(mockResponse);

      await telerolo.sendMessage({
        chatId,
        message,
        parseMode: 'MarkdownV2',
        disableWebPagePreview: true,
      });

      const expectedUrl = new URL(`https://api.telegram.org/bot${botToken}/sendMessage`);
      expectedUrl.searchParams.set('chat_id', chatId);
      expectedUrl.searchParams.set('text', message);
      expectedUrl.searchParams.set('disable_web_page_preview', 'true');
      expectedUrl.searchParams.set('parse_mode', 'MarkdownV2');

      expect(fetch).toHaveBeenCalledWith(expectedUrl.toString(), expect.any(Object));
    });
  });
});
