const escapeSpecialChars = (str) => {
    return str.replace(/([_*\[\]()~`>#+-=|{}.!])/g, '\\$1');
};
const buildMessageBody = (message) => {
    return escapeSpecialChars(message);
};
const buildMessage = (teleroloConfig) => {
    return new URLSearchParams({
        chat_id: teleroloConfig.chatId,
        parse_mode: teleroloConfig.parseMode,
        disable_web_page_preview: 'false',
        text: buildMessageBody(teleroloConfig.message),
    }).toString();
};
export { buildMessage };
//# sourceMappingURL=buildMessage.js.map