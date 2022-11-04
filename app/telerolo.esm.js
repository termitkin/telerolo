import { sendMessage } from './modules/sendMessage.js';
import { checkConfig } from './modules/checkConfig.js';
const telerolo = async (teleroloConfig) => {
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
export { telerolo };
//# sourceMappingURL=telerolo.esm.js.map