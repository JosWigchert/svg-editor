export interface SvgItem {
  draw(): SVGElement
  create(): SvgCreateStep
}

export interface SvgCreateStep {
  next(): SvgCreateStep
}
