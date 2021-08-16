const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Store = require('electron-store');


let mainWindow = null;
const store = new Store();


app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    var width = store.get('width') || 800;
    var height = store.get('height') || 500;
    var x = store.get('x') || 300;
    var y = store.get('y') || 200;
    var isMax = store.get('isMax') || false;
    
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        x: x,
        y: y,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + '/preload.js'
        }
    });

    mainWindow.loadURL('file://' + __dirname + '/main.html');

    if (isMax) {
        mainWindow.maximize();
    }

    mainWindow.on('resize', function () {
        if (mainWindow.isMaximized()) {
            store.set("isMax", true);
        } else {
            store.set("isMax", false);
            const size = mainWindow.getSize();
            store.set("width", size[0]);
            store.set("height", size[1]);
        }
    });

    mainWindow.on('move', function () {
        if (!mainWindow.isMaximized()) {
            const pos = mainWindow.getPosition();
            store.set("x", pos[0]);
            store.set("y", pos[1]);
        }
    })
});

ipcMain.on('quit', (e, arg) => {
    app.quit();
});

ipcMain.on('mini', (e, arg) => {
    mainWindow.minimize();
});

ipcMain.on('resize', (e, arg) => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

ipcMain.on('getWindowSize', (e, arg) => {
    const isMax = mainWindow.isMaximized();
    e.sender.send('getWindowSize-reply', isMax);
});