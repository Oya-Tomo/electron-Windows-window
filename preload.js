const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const contextBridge = electron.contextBridge;

contextBridge.exposeInMainWorld(
    "api", {
        send_quit: () => {
            ipcRenderer.send('quit', true);
        },
        send_resize: () => {
            ipcRenderer.send('resize', true);
        },
        send_mini: () => {
            ipcRenderer.send('mini', true);
        },
        getWindowSize: () => {
            ipcRenderer.send('getWindowSize', true);
        },
        on: (channel, callback) => {
            ipcRenderer.on(channel, (e, arg) => callback(e, arg));
        }
    }
);