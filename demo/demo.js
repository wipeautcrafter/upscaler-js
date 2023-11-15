const image = document.getElementById('image')
const result = document.getElementById('result')
const models = document.getElementById('models')
const scales = document.getElementById('scales')
const button = document.getElementById('upscale')

const upscaler = new AIUpscaler({
  slim: 'https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-slim@1.0.0-beta.10/models/',
  medium: 'https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-medium@1.0.0-beta.11/models/',
  thick: 'https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-thick@1.0.0-beta.14/models/'
})

// populate select fields
upscaler.modelNames.forEach(m => {
  const opt = document.createElement('option')
  opt.textContent = m
  models.appendChild(opt)
})

upscaler.modelScales.forEach(m => {
  const opt = document.createElement('option')
  opt.textContent = m
  scales.appendChild(opt)
})

// on upscale button click
button.addEventListener('click', () => {
  result.src = ''

  upscaler.setModel(models.value, scales.value)
  console.info('using model', upscaler.model)

  upscaler.upscale(image, (prog) => {
    console.log('progress', prog)
  }).then((src) => {
    result.src = src
  })
})