// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path"); // Corrected the path module import

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400, // Optional: Set a minimum width
    minHeight: 300, // Optional: Set a minimum height
    fullscreen: true, // Start in full width
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenuBarVisibility(false);

  // Import `electron-is-dev` using dynamic import to avoid issues with ESM
  import("electron-is-dev")
    .then((isDev) => {
      mainWindow.loadURL(isDev.default ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    })
    .catch((err) => console.error("Failed to load isDev:", err));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

app.on("will-resize", (event, newBounds) => {
  const { width, height } = app.getBounds();
  const aspectRatio = 800 / 600; // Initial aspect ratio
  const newWidth = Math.round(newBounds.height * aspectRatio);
  if (newWidth < newBounds.width) {
    // Adjust the height based on the new width to maintain aspect ratio
    event.preventDefault();
    app.setSize(newWidth, newBounds.height);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle('print-document', async (event) => {
  console.log("Before Try");
  try {
    
  const printWindow = new BrowserWindow({
    show: true, // Hide the window as we don't need to display its
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  console.log("Before Load");

  await printWindow.loadURL("http://localhost:3000/print-preview");
  console.log("After Load");

  const printOptions = {
    silent: false,
    deviceName: "KODAK 6800 Printer",
    color: true,
    margins: {
      marginType: 'custom',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    landscape: false,
    scaleFactor: 100,
    pagesPerSheet: 1,
    collate: true,
    copies: 1,
    duplexMode: 'simplex'
  };
  
  console.log("Before Print");

  printWindow.webContents.print(printOptions, (success, errorType) => {
    if (!success) {
      console.error(`Printing failed: ${errorType}`);
    } else {
      console.log(printOptions);
      console.log('Printing succeeded');
    }

    printWindow.close();
  });
  } catch (error) {
    console.log(error);
  }
  
  console.log("After Print");
});