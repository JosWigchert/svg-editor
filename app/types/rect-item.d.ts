import type { SvgItem } from '~/types/svg-item'

export class RectItem implements SvgItem {
  private _id: string
  private _element: SVGElement

  private _start: { x: number, y: number }
  private _end: { x: number, y: number }

  constructor() {
    this._id = crypto.randomUUID()
    this._element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
    )
    this._element.id = this._id

    this._start = { x: 0, y: 0 }
    this._end = { x: 20, y: 10 }
  }

  draw(): SVGElement {
    this._element.setAttribute('d', this.generatePath())
    return this._element
  }

  generatePath(): string {
    return `M${this._start.x} ${this._start.y}h${this._end.x - this._start.x}v${
      this._end.y - this._start.y
    }h${this._start.x - this._end.x}z`
  }

  update() {}

  get element(): SVGElement {
    return this._element
  }
}
