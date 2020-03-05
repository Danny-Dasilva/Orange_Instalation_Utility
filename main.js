// // This is free and unencumbered software released into the public domain.
// // See LICENSE for details

// const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
// const log = require('electron-log');
// const {autoUpdater} = require("electron-updater");
var path = require('path')
// var NativeImage = require('electron').nativeImage

// //-------------------------------------------------------------------
// // Logging
// //
// // THIS SECTION IS NOT REQUIRED
// //
// // This logging setup is not required for auto-updates to work,
// // but it sure makes debugging easier :)
// //-------------------------------------------------------------------
// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
// log.info('App starting...');

// //-------------------------------------------------------------------
// // Define the menu
// //
// // THIS SECTION IS NOT REQUIRED
// //-------------------------------------------------------------------
// let template = []
// if (process.platform === 'darwin') {
//   // OS X
//   const name = app.getName();
//   template.unshift({
//     label: name,
//     submenu: [
//       {
//         label: 'About ' + name,
//         role: 'about'
//       },
//       {
//         label: 'Quit',
//         accelerator: 'Command+Q',
//         click() { app.quit(); }
//       },
//     ]
//   })
// }


// //-------------------------------------------------------------------
// // Open a window that displays the version
// //
// // THIS SECTION IS NOT REQUIRED
// //
// // This isn't required for auto-updates to work, but it's easier
// // for the app to show a window than to have to click "About" to see
// // that updates are working.
// //-------------------------------------------------------------------
// let win;

// function sendStatusToWindow(text) {
//   log.info(text);
//   win.webContents.send('message', text);
// }
// function createDefaultWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     },
//     icon: path.join(__dirname, 'assets/icons/icons/64x64.png')
//   });
//   log.info('teszt', path.join(__dirname, 'assets/icons/icons/64x64.png'));
//   console.log(path.join(__dirname, 'assets/icons/icons/64x64.png'))
//   win.webContents.openDevTools();
//   win.on('closed', () => {
//     win = null;
//   });
//   win.loadURL(`file://${__dirname}/src/index.html#v${app.getVersion()}`);
//   return win;
// }
// autoUpdater.on('checking-for-update', () => {
//   sendStatusToWindow('Checking for update...');
// })
// autoUpdater.on('update-available', (info) => {
//   sendStatusToWindow('Update available.');
// })
// autoUpdater.on('update-not-available', (info) => {
//   sendStatusToWindow('Update not available.');
// })
// autoUpdater.on('error', (err) => {
//   sendStatusToWindow('Error in auto-updater. ' + err);
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendStatusToWindow(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//   sendStatusToWindow('Update downloaded');
// });
// app.on('ready', function() {
//   // Create the Menu
//   let menu = Menu.buildFromTemplate([
//     {
//       label: "File",
//       submenu: [
//         { label: "Adjust Notification Value" },
//         {
//           label: "CoinMarketCap",
//           click() {
//             shell.openExternal("https://coinmarketcap.com");
//           }
//         },
//         { type: "separator" },
//         {
//           label: "Exit",
//           accelerator: "CmdOrCtrl+Q",
//           click: () => {
//             app.quit();
//           }
//         }
//       ]
//     },
//     {
//       label: "View",
//       submenu: [
//         {
//           label: "Reload",
//           accelerator: "F5",
//           click: (item, focusedWindow) => {
//             if (focusedWindow) {
//               // on reload, start fresh and close any old
//               // open secondary windows
//               if (focusedWindow.id === 1) {
//                 BrowserWindow.getAllWindows().forEach(win => {
//                   if (win.id > 1) win.close();
//                 });
//               }
//               focusedWindow.reload();
//             }
//           }
//         },
//         {
//           label: "Toggle Dev Tools",
//           accelerator: "F12",
//           click: () => {
//             win.webContents.toggleDevTools();
//           }
//         }
//       ]
//     }
//   ]);

//   Menu.setApplicationMenu(menu);

//   createDefaultWindow();
// });
// app.on('window-all-closed', () => {
//   app.quit();
// });

// //
// // CHOOSE one of the following options for Auto updates
// //

// //-------------------------------------------------------------------
// // Auto updates - Option 1 - Simplest version
// //
// // This will immediately download an update, then install when the
// // app quits.
// //-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdatesAndNotify();
// });


// ipcMain.on("update-notify-value", (e, arg) => {
//   win.webContents.send("targetPriceVal", arg);
// });

// //-------------------------------------------------------------------
// // Auto updates - Option 2 - More control
// //
// // For details about these events, see the Wiki:
// // https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
// //
// // The app doesn't need to listen to any events except `update-downloaded`
// //
// // Uncomment any of the below events to listen for them.  Also,
// // look in the previous section to see them being used.
// //-------------------------------------------------------------------
// // app.on('ready', function()  {
// //   autoUpdater.checkForUpdates();
// // });
// // autoUpdater.on('checking-for-update', () => {
// // })
// // autoUpdater.on('update-available', (info) => {
// // })
// // autoUpdater.on('update-not-available', (info) => {
// // })
// // autoUpdater.on('error', (err) => {
// // })
// // autoUpdater.on('download-progress', (progressObj) => {
// // })
// // autoUpdater.on('update-downloaded', (info) => {
// //   autoUpdater.quitAndInstall();  
// // })


// This is free and unencumbered software released into the public domain.
// See LICENSE for details

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
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}


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

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
  
}

function createDefaultWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets/icons/icons/64x64.png')
  });
  win.webContents.openDevTools();
  
  
  win.on('closed', () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);

  return win;
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

  createDefaultWindow();
  

});
app.on('window-all-closed', () => {
  app.quit();
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
app.on('ready', function()  {
  win.webContents.on('did-finish-load', () => {
    sendStatusToWindow('Loaded');
    autoUpdater.checkForUpdatesAndNotify();
  })

  
  console.log("working")
});
