# Telegram Audio Transcription Bot

## English

### Description
This project is a Telegram bot built with Node.js that transcribes voice messages and audio files using Google's Gemini AI. The bot downloads the audio, uploads it to Gemini for transcription, and improves the text by adding punctuation, removing filler words, and enhancing clarity.

### Features
- Transcribes voice messages (OGG format).
- Transcribes audio files (MP3 format).
- Improves transcribed text: adds punctuation, removes parasites and unnecessary words.
- Sends the transcribed text back to the user in the chat.
- Supports MarkdownV2 for formatted output.

### Requirements
- Node.js (v14 or higher recommended).
- Telegram Bot Token (from BotFather).
- Google Gemini API Key.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   BOT_TOKEN=your-telegram-bot-token
   GEMINI_API_KEY=your-gemini-api-key
   ```
4. Run the bot:
   ```
   node bot.js
   ```

### Usage
- Send a voice message or audio file to the bot in Telegram.
- The bot will respond with "⏳ Transcribing..." and then send the transcribed text.

### Dependencies
- `node-telegram-bot-api`: For interacting with Telegram API.
- `axios`: For downloading files.
- `@google/genai`: For Google Gemini AI integration.
- `dotenv`: For environment variables.
- `fs`, `path`: Built-in Node.js modules.

### License
MIT License. See [LICENSE](LICENSE) for details.

## Русский

### Описание
Этот проект представляет собой Telegram-бота, построенного на Node.js, который расшифровывает голосовые сообщения и аудиофайлы с использованием ИИ Google Gemini. Бот скачивает аудио, загружает его в Gemini для расшифровки и улучшает текст, добавляя знаки препинания, удаляя слова-паразиты и повышая ясность.

### Возможности
- Расшифровка голосовых сообщений (формат OGG).
- Расшифровка аудиофайлов (формат MP3).
- Улучшение расшифрованного текста: добавление знаков препинания, удаление паразитов и ненужных слов.
- Отправка расшифрованного текста обратно пользователю в чат.
- Поддержка MarkdownV2 для форматированного вывода.

### Требования
- Node.js (рекомендуется v14 или выше).
- Токен Telegram-бота (от BotFather).
- Ключ API Google Gemini.

### Установка
1. Клонируйте репозиторий:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Установите зависимости:
   ```
   npm install
   ```
3. Создайте файл `.env` в корневой директории со следующим содержимым:
   ```
   BOT_TOKEN=your-telegram-bot-token
   GEMINI_API_KEY=your-gemini-api-key
   ```
4. Запустите бота:
   ```
   node bot.js
   ```

### Использование
- Отправьте голосовое сообщение или аудиофайл боту в Telegram.
- Бот ответит "⏳ Расшифровываю..." и затем отправит расшифрованный текст.

### Зависимости
- `node-telegram-bot-api`: Для взаимодействия с API Telegram.
- `axios`: Для скачивания файлов.
- `@google/genai`: Для интеграции с Google Gemini AI.
- `dotenv`: Для переменных окружения.
- `fs`, `path`: Встроенные модули Node.js.

### Лицензия
Лицензия MIT. Подробности в файле [LICENSE](LICENSE).