# Telerolo

[![npm version](https://badge.fury.io/js/telerolo.svg)](https://badge.fury.io/js/telerolo)

A simple and lightweight Node.js library for sending messages to Telegram channels and chats using a bot.

## 📑 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Detailed Usage](#-detailed-usage)
- [API Reference](#-api-reference)
- [Getting Chat ID](#-getting-chat-id)
- [Usage Examples](#️-usage-examples)
- [Security](#-security)
- [Testing](#-testing)
- [License](#-license)

## ✨ Features

- Simple class-based API
- Written in TypeScript with full type support
- Uses native `fetch` from Node.js
- No unnecessary dependencies
- Parameter validation
- Support for various parsing modes (Markdown, HTML)

## 📋 Requirements

- Node.js >= 18.0.0
- Telegram Bot Token

## 📦 Installation

```bash
npm install telerolo
# or
yarn add telerolo
```

## 🚀 Quick Start

```javascript
import { Telerolo } from 'telerolo';
import 'dotenv/config'; // To load environment variables

// Create a Telerolo instance with your bot token
const telerolo = new Telerolo({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
});

// Send a message
async function sendMessage() {
  try {
    await telerolo.sendMessage({
      chatId: '-1001234567890', // Chat or channel ID
      message: 'Hello, world! 🚀',
    });
    console.log('Message sent!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
```

## 📖 Detailed Usage

### Initialization

```javascript
import { Telerolo } from 'telerolo';

const telerolo = new Telerolo({
  botToken: 'YOUR_BOT_TOKEN_HERE',
});
```

### Send Simple Message

```javascript
await telerolo.sendMessage({
  chatId: '@my_channel',
  message: 'Simple text message',
});
```

### Send Formatted Message

```javascript
// Markdown formatting
await telerolo.sendMessage({
  chatId: '@my_channel',
  message: '*Bold text* and _italic_',
  parseMode: 'Markdown',
});

// HTML formatting
await telerolo.sendMessage({
  chatId: '@my_channel',
  message: '<b>Bold text</b> and <i>italic</i>',
  parseMode: 'HTML',
});

// MarkdownV2 (recommended for complex formatting)
await telerolo.sendMessage({
  chatId: '@my_channel',
  message: '*Bold text* and _italic_ with [link](https://example.com)',
  parseMode: 'MarkdownV2',
});
```

### Disable Web Page Preview

```javascript
await telerolo.sendMessage({
  chatId: '@my_channel',
  message: 'Message with link https://example.com',
  disableWebPagePreview: true,
});
```

## 🔧 API Reference

### TeleroloOptions

```typescript
interface TeleroloOptions {
  botToken: string; // Your Telegram bot token
}
```

### SendMessageParams

```typescript
interface SendMessageParams {
  chatId: string;                    // Chat or channel ID
  message: string;                   // Message text
  parseMode?: ParseMode;             // Parsing mode (default: 'MarkdownV2')
  disableWebPagePreview?: boolean;   // Disable link preview
}
```

### ParseMode

```typescript
type ParseMode = 'Markdown' | 'MarkdownV2' | 'HTML';
```

## 🆔 Getting Chat ID

### Easy Method (Recommended):
Use our dedicated bot [@get_my_channel_id_bot](https://t.me/get_my_channel_id_bot):
1. Add the bot to your channel or group as administrator
2. Send `@get_my_channel_id_bot` message to the channel/group
3. The bot will reply with the chat ID

### Manual Method:

#### For Channel:
1. Add bot to channel as administrator
2. Send any message to the channel
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find `chat.id` in the response

#### For Group:
1. Add bot to the group
2. Send a message to the group
3. Check updates via API as mentioned above

#### For Private Chat:
- Chat ID will be a positive number (e.g., `123456789`)
- For channels and groups - negative number (e.g., `-1001234567890`)

## 🛠️ Usage Examples

### Deploy Notifications

```javascript
async function notifyDeploy(environment, version) {
  await telerolo.sendMessage({
    chatId: '@deploy_notifications',
    message: `🚀 *Deploy completed*\n\nEnvironment: \`${environment}\`\nVersion: \`${version}\`\nTime: ${new Date().toLocaleString()}`,
    parseMode: 'MarkdownV2',
  });
}
```

### Error Monitoring

```javascript
async function notifyError(error, context) {
  await telerolo.sendMessage({
    chatId: '@error_monitoring',
    message: `❌ *Application Error*\n\nError: \`${error.message}\`\nContext: \`${context}\`\nTime: ${new Date().toISOString()}`,
    parseMode: 'MarkdownV2',
  });
}
```

### Daily Reports

```javascript
async function sendDailyReport(stats) {
  await telerolo.sendMessage({
    chatId: '@daily_reports',
    message: `📊 *Daily Report*\n\nUsers: ${stats.users}\nOrders: ${stats.orders}\nRevenue: $${stats.revenue}`,
    parseMode: 'MarkdownV2',
  });
}
```

## 🔒 Security

- Never commit bot token to repository
- Use environment variables to store the token
- Limit bot permissions to only necessary functions

## 🧪 Testing

```bash
npm run test
```

## 📄 License

[MIT](LICENSE)
