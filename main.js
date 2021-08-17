const { app, BrowserWindow, ipcMain} = require('electron');
const Store = require("electron-store");

let mainWindow = null;
const store = new Store();

widthKey = 'window-width';
heightKey = 'window-height';
isMaxKey = 'window-isMax';

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    var width = store.get(widthKey) || 800;
    var height = store.get(heightKey) || 500;
    var isMax = store.get(isMaxKey) || false;

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        webPreferences: {
            nodeIntegration: false, 
            contextIsolation: true,
            preload: __dirname + '/preload.js'
        }
    });

    mainWindow.loadURL("file://" + __dirname + "/main.html");

    if (isMax) {
        mainWindow.maximize();
    }

    mainWindow.on('resize', () => {
        if (!mainWindow.isMaximized()) {
            store.set(widthKey, mainWindow.getSize()[0]);
            store.set(heightKey, mainWindow.getSize()[1]);
            store.set(isMaxKey, false);
        } else {
            store.set(isMaxKey, true);
        }
    });

    mainWindow.on('close', () => {
        mainWindow = null;
    });
});

ipcMain.on('quit', (e, arg) => {
    app.quit();
});

ipcMain.on('resize', (e, arg) => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

ipcMain.on('mini', (e, arg) => {
    mainWindow.minimize();
});

ipcMain.on('get_window_size', (e, arg) => {
    const isMax = mainWindow.isMaximized();
    e.sender.send('get_window_size_reply', isMax);
});
