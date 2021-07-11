"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const yame_1 = require("yame");
class Plugin extends yame_1.YamePlugin {
    id = 'yame-dev';
    /**
     * Initializes the electron-reload module only on the electron side.
     *
     * @param {string} type
     * @return {Promise<any>}
     */
    initialize(type) {
        if (this.environment.config.devMode !== true)
            return Promise.resolve();
        if (type === 'ng') {
            console.info('[yame-dev] ng part is doing nothing for now...');
            return Promise.resolve();
        }
        let paths = [this.environment.appDir];
        this.environment.plugins.forEach(plugin => paths = paths.concat(plugin.directories));
        require('electron-reload')(paths, {
            electron: process.execPath,
            paths: paths,
            followSymlinks: true
        });
        return Promise.resolve();
    }
}
exports.Plugin = Plugin;
