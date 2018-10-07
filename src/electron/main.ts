import { YamePlugin } from 'yame';

class Plugin extends YamePlugin {

  /**
   * Initializes the electron-reload module.
   *
   * @return {Promise<any>}
   */
  initialize(): Promise<void> {
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
export = new Plugin();
