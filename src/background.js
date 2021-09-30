'use strict'
const electron = require('electron');
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import {archivos} from '../server' 
import {server} from '../server' 
require('../server');
const fs = require('fs');
const path = require('path');
// require('@electron/remote/main').initialize()
const gotTheLock = app.requestSingleInstanceLock()
let win=null
//menu
const Menu=electron.Menu
const MenuItem=electron.MenuItem

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });

  // Create the browser window.
  win = new BrowserWindow({
    minWidth:1300,
    minHeight:768,
    webPreferences: {
      show: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nativeWindowOpen: true
    }
  })
  // win.setMenu(null)
  win.maximize();
  win.show();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log(archivos);
  for (const file of archivos) {
    fs.unlink(path.join((electron.app || electron.remote.app).getPath('userData'), file), err => {
      if (err) throw err;
    });
  }/**/
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
    
  // Create win, load the rest of the app, etc...
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS_DEVTOOLS)
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    createWindow()
    //pal menu
    const ctxMenu= new Menu()
    ctxMenu.append(new MenuItem({label:'cortar',role:'cut'}))
    ctxMenu.append(new MenuItem({label:'copiar',role:'copy'}))
    ctxMenu.append(new MenuItem({label:'pegar',role:'paste'}))
    win.webContents.on('context-menu',function(e,params){
      ctxMenu.popup(win,params.x,params.y)
    })
  })
}


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}