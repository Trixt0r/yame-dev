import { YamePlugin } from 'yame';

export class Plugin extends YamePlugin {

  id = 'yame-dev';

  /**
   * Initializes the electron-reload module only on the electron side.
   *
   * @param {string} type
   * @return {Promise<any>}
   */
  initialize(type: string): Promise<void> {
    if (this.environment.config.devMode !== true) return Promise.resolve();
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
