const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  invokePrint: () => ipcRenderer.invoke('print-document'),
});
