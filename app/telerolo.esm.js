import { sendMessage } from './modules/sendMessage.js';
import { checkConfig } from './modules/checkConfig.js';
const main = async (teleroloConfig) => {
    try {
        const config = checkConfig(teleroloConfig);
        return sendMessage(config);
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        console.log(e);
        return false;
    }
};
export { main };
//# sourceMappingURL=telerolo.esm.js.map