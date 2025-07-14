import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { fork } from 'child_process'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let currentUserProcess = null

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 1200,
    x: 0,
    y: 0,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webWorkers: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  mainWindow.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.ditwin')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  // IPC Events

  ipcMain.handle('test-ipc', async (event, data) => {
    console.log('Received data', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return 'Data was received'
  })

  ipcMain.handle('run-user-code', async (event, code) => {
    return new Promise((resolve, reject) => {
      console.log('Running code', code)

      const child = fork(
        join(__dirname, 'executor.js'), // path
        [], // args
        {
          stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        } // options
      )
      child.stdout.on('data', (data) => {
        console.log('[executor stdout]', data.toString())
        // Remove \n from messages
        data = data.toString().replace(/\n/g, '')
        event.sender.send('user-code-log', { type: 'log', data, level: 'info' })
      })

      child.stderr.on('data', (data) => {
        console.error('[executor stderr]', data.toString())
      })
      currentUserProcess = child
      child.on('message', (message) => {
        console.log('Executor Message received', message)
        if (message.type === 'done') {
          resolve(message.data)
        } else if (message.type === 'error') {
          reject(message.data)
        } else if (message.type === 'log') {
          event.sender.send('user-code-log', message) // <- stream logs
        } else {
          console.log('Unknown message type', message)
        }
      })
      child.on('exit', () => {
        currentUserProcess = null
      })
      try {
        child.send({ code })
      } catch (e) {
        reject(e)
      }
    })
  })

  ipcMain.handle('kill-user-code', () => {
    if (currentUserProcess) {
      console.log('Killing user code')
      currentUserProcess.kill('SIGTERM')
      currentUserProcess = null
      return true
    }
    return false
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  app.quit()
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})
