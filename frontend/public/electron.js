// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
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
      nodeIntegration: true, // Consider security implications
      contextIsolation: false, // Consider security implications
    },
  });

  // Import `electron-is-dev` using dynamic import to avoid issues with ESM
  import("electron-is-dev")
    .then((isDev) => {
      mainWindow.loadURL(isDev.default ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    })
    .catch((err) => console.error("Failed to load isDev:", err));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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
