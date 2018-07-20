const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win
// appearance-based, light, dark, titlebar, selection, menu, popover, sidebar, medium-light or ultra-dark. 
function createWindow() {
   let appIcon = path.join(__dirname, 'assets/icons/png/icon.png');
   win = new BrowserWindow({width: 925,
        height: 900,
        minWidth: 500,
        minHeight: 200,
        icon: appIcon,
        hasShadow: true,
        center: true,
       // fullscreen: true,
        vibrancy: "ultra-dark"
        });
   visible = true;

   win.setMenu(null); // Remove default menu
   win.setMenuBarVisibility(visible)
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('ready', createWindow)