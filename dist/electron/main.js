"use strict";
const yame_1 = require("yame");
class Plugin extends yame_1.YamePlugin {
    /**
     * Initializes the electron-reload module.
     *
     * @return {Promise<any>}
     */
    initialize() {
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
module.exports = new Plugin();
