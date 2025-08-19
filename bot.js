require('dotenv').config();
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { GoogleGenAI, createUserContent, createPartFromUri } = require("@google/genai");

const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const DOWNLOAD_DIR = path.join(__dirname, 'downloads');
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

// Инициализация Google GenAI
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Скачивание файлов с Telegram
async function downloadFile(fileId, fileName) {
  try {
    const file = await bot.getFile(fileId);
    const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
    const filePath = path.join(DOWNLOAD_DIR, fileName);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    fs.writeFileSync(filePath, response.data);
    return filePath;
  } catch (err) {
    console.error('Ошибка загрузки файла:', err);
    return null;
  }
}

// Расшифровка аудио через Google GenAI
async function transcribeAudio(filePath, mimeType = 'audio/ogg') {
  try {
    // Загружаем файл в GenAI
    const uploadedFile = await genAI.files.upload({
      file: filePath,
      config: { mimeType }
    });

    // Создаем контент для модели
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        "Расшифруй и перепиши текст с знаками препинания, и улучши смысл, необходимо убирать слова паразиты и бесполезные слова."
      ])
    });

    return response.text || 'Не удалось расшифровать';
  } catch (err) {
    console.error('Ошибка при расшифровке:', err);
    return '❌ Ошибка при расшифровке аудио';
  }
}

// Обработка голосовых сообщений
bot.on('voice', async (msg) => {
  const chatId = msg.chat.id;
  const fileId = msg.voice.file_id;
  const fileName = `voice_${fileId}.ogg`;

  const filePath = await downloadFile(fileId, fileName);
  if (filePath) {
    bot.sendMessage(chatId, '⏳ Расшифровываю голосовое сообщение...');

    const text = await transcribeAudio(filePath, 'audio/ogg');

    // Функция для форматирования текста как блока кода в MarkdownV2
    function formatAsCodeBlock(text) {
      // Экранируем спецсимволы MarkdownV2
      const escaped = text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
      return `\`\`\`\n${escaped}\n\`\`\``;
    }

    const codeText = formatAsCodeBlock(text);

    bot.sendMessage(chatId, codeText, { parse_mode: 'MarkdownV2' });
  }
});


// Обработка аудиофайлов
bot.on('audio', async (msg) => {
  const chatId = msg.chat.id;
  const fileId = msg.audio.file_id;
  const fileName = msg.audio.file_name || `audio_${fileId}.mp3`;

  const filePath = await downloadFile(fileId, fileName);
  if (filePath) {
    bot.sendMessage(chatId, '⏳ Расшифровываю аудиофайл...');

    const text = await transcribeAudio(filePath, 'audio/mpeg');

    // Функция для экранирования спецсимволов MarkdownV2
    function escapeMarkdownV2(text) {
      return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
    }

    const safeText = escapeMarkdownV2(text);

    bot.sendMessage(
      chatId,
      `📝 Текст:\n\`\`\`\n${safeText}\n\`\`\``,
      { parse_mode: 'MarkdownV2' }
    );
  }
});


console.log('🤖 Бот с ИИ запущен...');
