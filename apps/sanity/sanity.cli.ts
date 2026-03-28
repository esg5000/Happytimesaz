import { defineCliConfig } from 'sanity/cli'
import { mergeConfig } from 'vite'
import studioViteConfig from './vite.config'

export default defineCliConfig({
  api: {
    projectId: '7nd2gpk6',
    dataset: 'production'
  },
  deployment: {
    appId: 'ralpb442xtu3x8z0w77zh00n'
  },
  vite: (config) => mergeConfig(config, studioViteConfig)
})