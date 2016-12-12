// Need to use require() here, since we must be able to dynamically load modules
const fs = require('mz/fs')
const path = require('path')
const { parse } = require('./json')

module.exports = {
  instantiateStore
}

async function instantiateStore (packageJsonPath) {
  const packageMeta = parse(await fs.readFile(packageJsonPath))

  if (!packageMeta.flux) {
    throw new Error(`Cannot initialize store: No 'flux' property found in package.json.`)
  }
  if (!packageMeta.flux.store || typeof packageMeta.flux.store !== 'string') {
    throw new Error(`Cannot initialize store: No valid 'flux.store' path found in package.json.`)
  }

  const storeFilePath = path.resolve(path.dirname(packageJsonPath), packageMeta.flux.store)
  const initStore = require(storeFilePath)

  return await initStore()
}
