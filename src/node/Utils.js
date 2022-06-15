class Util {
  static loadURL(webContents, routeLastPath) {
    const webContentsUrl = webContents.getURL();
    const originLocation = webContentsUrl.split('/#/')[0];
    const url = originLocation + `/#/${routeLastPath}`;
    webContents.loadURL(url);
  }
}

module.exports = Util;