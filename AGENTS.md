# AGENTS.md

`telerolo` — маленькая TypeScript-библиотека для отправки сообщений в Telegram-чаты и каналы через Bot API (npm-пакет [telerolo](https://www.npmjs.com/package/telerolo)). Использует встроенный `fetch` Node.js, runtime-зависимостей нет.

## Стек

- TypeScript 5.8, ES modules (`"type": "module"`), `tsc` → `dist/` (вместе с `.d.ts`).
- Node.js `>=18` (`engines`); CI гоняется на Node.js 22.
- Yarn Classic, lock-файл `yarn.lock`.
- Тесты — Vitest, линт — ESLint 9 (flat config `eslint.config.js`) + `eslint-config-prettier`; стиль — `.prettierrc`.

## Команды

| Задача | Команда |
|--------|---------|
| Установка | `yarn install --frozen-lockfile` |
| Линт | `yarn lint` (`yarn lint:fix` — с автоисправлением) |
| Тесты | `yarn test --run` |
| Сборка | `yarn build` |

Подводные камни:

- `yarn test` без `--run` запускает Vitest в watch-режиме (если не выставлен `CI`) и не завершается.
- `eslint.config.js` импортирует `@eslint/js`, которого нет в `devDependencies` — он приходит транзитивно от `eslint`.
- Тестовые файлы (`*.test.ts`) исключены и из сборки (`tsconfig.json`), и из линта.
- `dist/` не коммитится; в npm публикуется только `dist` (`files` в `package.json`).

## Структура

- `src/Telerolo.ts` — весь код: класс `Telerolo` (`new Telerolo({ botToken })`, метод `sendMessage({ chatId, message, parseMode?, disableWebPagePreview? })`), типы `ParseMode`, `TeleroloOptions`, `SendMessageParams`.
  - Параметры передаются query-строкой в `POST https://api.telegram.org/bot<token>/sendMessage`; `parse_mode` по умолчанию `MarkdownV2`.
  - Без `botToken`, `chatId` или `message` бросается ошибка; при не-2xx ответе — `Telegram API error: <status> <statusText>`.
- `src/Telerolo.test.ts` — тесты Vitest с замоканным `global.fetch`.
- `README.md` — публичная документация пакета (на английском); при изменении API обновляйте её.

## Релиз

Публикация в npm выполняется вручную, автоматизации в CI нет. Версия поднимается отдельным коммитом с сообщением-номером версии (`0.1.12`, меняется только `package.json`) и тегом `v<версия>` — так создаёт `yarn version`/`npm version`.

## CI

Gitea Actions, `.gitea/workflows/ci.yml`: на push в `master`, pull request и вручную — `yarn install --frozen-lockfile`, `yarn lint`, `yarn test --run`, `yarn build`.
