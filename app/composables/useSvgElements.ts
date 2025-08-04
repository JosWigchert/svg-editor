import type { SvgItem } from '~/types/svg-item'

export const useSvgElements = () => {
  const elements = useState<SvgItem[]>('svg-elements', () => [])

  const addItem = (item: SvgItem) => {
    elements.value.push(item)
  }

  return { elements, addItem }
}
