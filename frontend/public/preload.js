const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  clearLocalStorage: () => localStorage.clear()
});

contextBridge.exposeInMainWorld('electron', {
  invokePrint: () => ipcRenderer.invoke('print-document'),
});
