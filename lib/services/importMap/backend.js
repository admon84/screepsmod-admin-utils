async function handleMapImport (config, importFunction, value) {
  const { common: { storage: { env } } } = config
  const currentMap = await env.get(env.keys.MAP_URL)
  if (currentMap) {
    if (currentMap !== value) {
      console.log(`Map value in config.yml has changed to ${value}, current map is ${currentMap}`)
      console.log(`If you wish to apply this then call utils.${importFunction}('${value}') manually or system.resetAllData() then restart server.`)
    }
    return
  }
  await config.utils[importFunction](value)
}

module.exports = (config) => {
  config.utils.on('config:update:map', async (urlOrMapId) => {
    await handleMapImport(config, 'importMap', urlOrMapId, config)
  })

  config.utils.on('config:update:mapFile', async (filePath) => {
    await handleMapImport(config, 'importMapFile', filePath, config)
  })
}
