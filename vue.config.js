module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions:{
        asar: false,
        extraResources: [
          {
            from: "./node_modules/node-adodb/lib/adodb.js",
            to: "adodb.js"
          },
        ]
      },
  
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      
    },
    
  },
  
}
