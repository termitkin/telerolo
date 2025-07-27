# Telerolo

[![npm version](https://badge.fury.io/js/telerolo.svg)](https://badge.fury.io/js/telerolo)

A simple and lightweight Node.js library that makes it easy to send messages to Telegram channels or chats using a bot.

## Features

- Simple class-based API.
- Written in TypeScript with out-of-the-box type support.
- Uses the native `fetch` from Node.js.
- No unnecessary dependencies.

## Installation

```bash
npm install telerolo
# or
yarn add telerolo
```

## Usage

```javascript
import { Telerolo } from 'telerolo';
import 'dotenv/config'; // To load environment variables

// 1. Create a Telerolo instance with your bot token
const telerolo = new Telerolo({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
});

// 2. Send a message
async function sendMyMessage() {
  try {
    await telerolo.sendMessage({
      chatId: '-1001234567890', // a chat ID like '-1001234567890'
      message: 'Hello, world! 🚀',
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
```

## License

[MIT](LICENSE)
