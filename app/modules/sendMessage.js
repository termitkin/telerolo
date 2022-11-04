import { buildUrl } from './buildUrl.js';
const sendMessage = async (teleroloConfig) => {
    const url = buildUrl(teleroloConfig);
    return fetch(url, {
        method: 'POST',
    })
        .then((res) => {
        if (res.status !== 200) {
            return false;
        }
        return true;
    })
        .catch((e) => {
        console.log(`Error: ${e}`);
        return false;
    });
};
export { sendMessage };
//# sourceMappingURL=sendMessage.js.map