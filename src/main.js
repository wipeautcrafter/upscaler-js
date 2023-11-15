import Upscaler from 'upscaler'

import * as slim from '@upscalerjs/esrgan-slim'
import * as medium from '@upscalerjs/esrgan-medium'
import * as thick from '@upscalerjs/esrgan-thick'

// global definitions
const _models = { slim, medium, thick }

const _names = ['slim', 'medium', 'thick']
const _scales = ['x2', 'x3', 'x4', 'x8']

const _modelUrls = {
  slim: 'https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-slim@1.0.0-beta.10/models/',
  medium: 'https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-medium@1.0.0-beta.11/models/',
  thick: 'https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-thick@1.0.0-beta.14/models/'
}

// AI upscaler class
class AIUpscaler {
  modelNames = _names
  modelScales = _scales

  model = null
  upscaler = null
  
  constructor(modelUrls = _modelUrls) {
    this.modelUrls = modelUrls
  }

  _getModel(name, scale) {
    const baseModel = _models[name][scale]
    if(!baseModel) return null

    const path = encodeURIComponent(scale) + '/model.json'
    const url = new URL(path, this.modelUrls[name])

    baseModel.path = url.href
    return baseModel
  }

  setModel(name, scale) {
    const model = this._getModel(name, scale)
    
    if(model.path === this.model?.path) return
    if(this.upscaler) this.upscaler.dispose()

    this.upscaler = new Upscaler({ model })
    this.model = model
  }

  upscale(image, progress) {
    return this.upscaler.execute(image, {
      output: 'base64',
      patchSize: 64,
      padding: 2,
      progress
    })
  }
}

export default AIUpscaler