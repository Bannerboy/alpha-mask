export class AlphaMask {
  constructor(
    source,
    mask,
    {removeMask = true, replaceSource = true, debug = false} = {}
  ) {
    this.source = source
    this.mask = mask
    this.debug = debug

    this.getImages().then(() => {
      this.applyMask()

      if (!debug) {
        if (removeMask) this.removeMask()

        if (replaceSource && this.source instanceof HTMLElement)
          this.replaceSource()
      }
    })
  }

  async getImages() {
    return new Promise(async (resolve, reject) => {
      this.sourceImage = await this.getImage(this.source)
      this.maskImage = await this.getImage(this.mask)
      resolve()
    })
  }

  applyMask() {
    const canvas = (this.canvas = document.createElement('canvas')),
      context = this.canvas.getContext('2d'),
      width = (canvas.width = this.sourceImage.naturalWidth),
      height = (canvas.height = this.sourceImage.naturalHeight)

    context.drawImage(this.maskImage, 0, 0, width, height)
    context.globalCompositeOperation = 'source-in'
    context.drawImage(this.sourceImage, 0, 0, width, height)

    if (this.debug) document.body.appendChild(canvas)
  }

  replaceSource() {
    const dataURL = (this.dataURL = this.canvas.toDataURL())
    if (this.source instanceof HTMLImageElement) {
      this.source.src = image
    }

    if (this.source instanceof HTMLElement) {
      this.source.style.backgroundImage = `url(${dataURL})`
    }
  }

  async getImage(parameter) {
    return new Promise((resolve, reject) => {
      if (parameter instanceof HTMLImageElement) return resolve(parameter)

      if (parameter instanceof HTMLElement) {
        const element = parameter
        const style =
          element.currentStyle || window.getComputedStyle(element, false)
        if (style.backgroundImage) {
          let image = new Image()
          image.onload = () => resolve(image)
          image.src = style.backgroundImage.slice(4, -1).replace(/"/g, '')
        }
      }

      if (parameter instanceof String) {
        let image = new Image()
        image.onload = () => resolve(image)
        image.src = parameter
      }
    })
  }

  removeMask() {
    if (this.mask instanceof HTMLElement)
      this.mask.parentNode.removeChild(this.mask)
  }
}
