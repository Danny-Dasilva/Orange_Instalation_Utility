const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');



//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
let win;

let template = []





function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}
// function createDefaultWindow() {
//   win = new BrowserWindow();
//   win.webContents.openDevTools();
//   win.on('closed', () => {
//     win = null;
//   });
//   win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
//   return win;
// }



function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile("./src/index.html");

  //Application Menu
  let menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        { label: "Adjust Notification Value" },
        {
          label: "CoinMarketCap",
          click() {
            shell.openExternal("https://coinmarketcap.com");
          }
        },
        { type: "separator" },
        {
          label: "Exit",
          accelerator: "CmdOrCtrl+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "F5",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              // on reload, start fresh and close any old
              // open secondary windows
              if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach(win => {
                  if (win.id > 1) win.close();
                });
              }
              focusedWindow.reload();
            }
          }
        },
        {
          label: "Toggle Dev Tools",
          accelerator: "F12",
          click: () => {
            win.webContents.toggleDevTools();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}



autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});
app.on('ready', function() {
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});


app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//
// CHOOSE one of the following options for Auto updates
//

//-------------------------------------------------------------------
// Auto updates - Option 1 - Simplest version
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------


ipcMain.on("update-notify-value", (e, arg) => {
  win.webContents.send("targetPriceVal", arg);
});