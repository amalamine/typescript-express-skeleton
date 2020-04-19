
import { bootstrapApp } from './bootstrap';

export const prepareServer = async (options?: {}) => {
    const settings = await bootstrapApp();
    return settings;
};
