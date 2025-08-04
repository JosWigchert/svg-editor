import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

enum MouseButtons {
  Left = 1,
  Right = 2,
  Middle = 4,
  Back = 8,
  Forward = 16,
}

export function useSvgEditor() {
  const viewbox = useState('viewbox', () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }))

  const zoomFactor = useState<number>('zoomFactor', () => 1.1)

  const svgElement = ref<SVGElement | null>(null)
  const size = ref({ width: 0, height: 0 })
  //   const aspectRatio = computed(() => {
  //     const { width, height } = size.value;
  //     if (width === 0 || height === 0) return 1;
  //     return width / height;
  //   });

  let isDragging = false
  let lastMouse = { x: 0, y: 0 }

  const center = () => {
    const rect = svgElement.value?.getBoundingClientRect()
    if (!rect) return

    viewbox.value.x = -rect.width / 2
    viewbox.value.y = -rect.height / 2
    viewbox.value.width = rect.width
    viewbox.value.height = rect.height

    console.log('centering:', viewbox.value)
  }

  function getMouseCoords(e: MouseEvent) {
    const rect = svgElement.value?.getBoundingClientRect()
    if (!rect) {
      return {
        x: 0,
        y: 0,
      }
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function onWheel(e: WheelEvent) {
    if (!svgElement.value) {
      return
    }
    console.log('onWheel')

    const direction = e.deltaY > 0 ? -1 : 1
    const zoom = direction > 0 ? zoomFactor.value : 1 / zoomFactor.value
    console.log('direction:', direction)
    console.log('zoom:', zoom)

    const mouse = getMouseCoords(e)
    const mx = mouse.x / svgElement.value.clientWidth
    const my = mouse.y / svgElement.value.clientHeight

    const vx = viewbox.value.x + viewbox.value.width * mx
    const vy = viewbox.value.y + viewbox.value.height * my

    console.log('viewbox:', viewbox.value)
    viewbox.value.x = vx - (vx - viewbox.value.x) / zoom
    viewbox.value.y = vy - (vy - viewbox.value.y) / zoom
    viewbox.value.width /= zoom
    viewbox.value.height /= zoom
    console.log('viewbox2:', viewbox.value)
  }

  function onMouseDown(e: MouseEvent) {
    console.log('onMouseDown')
    isDragging = true
    lastMouse = { x: e.clientX, y: e.clientY }
  }

  function onMouseMove(e: MouseEvent) {
    console.log('onMouseMove: ')

    if (e.buttons === MouseButtons.Middle) {
      drag(e)
    }
  }

  function drag(e: MouseEvent) {
    if (!isDragging || !svgElement.value) return

    const dx = e.clientX - lastMouse.x
    const dy = e.clientY - lastMouse.y

    const scaleX = viewbox.value.width / svgElement.value.clientWidth
    const scaleY = viewbox.value.height / svgElement.value.clientHeight

    viewbox.value.x -= dx * scaleX
    viewbox.value.y -= dy * scaleY

    lastMouse = { x: e.clientX, y: e.clientY }
  }

  function onMouseUp(_: MouseEvent) {
    console.log('onMouseUp')
    isDragging = false
  }

  function onResize() {
    if (!svgElement.value) return

    const rect = svgElement.value.getBoundingClientRect()
    console.log(rect)

    size.value.width = rect.width
    size.value.height = rect.height

    const zoomScale = viewbox.value.width / rect.width

    const centerX = viewbox.value.x + viewbox.value.width / 2
    const centerY = viewbox.value.y + viewbox.value.height / 2

    viewbox.value.width = rect.width * zoomScale
    viewbox.value.height = rect.height * zoomScale

    viewbox.value.x = centerX - viewbox.value.width / 2
    viewbox.value.y = centerY - viewbox.value.height / 2

    console.log('onResize (zoom-aware)', viewbox.value)
  }

  function setElement(element: SVGElement) {
    svgElement.value = element
    center()

    // Setup resize observer on the client
    if (import.meta.client) {
      useResizeObserver(svgElement, () => {
        console.log('resize')
        onResize()
        center()
      })
    }
  }

  return {
    viewbox,
    center,
    setElement,
    events: {
      onMouseUp,
      onMouseDown,
      onMouseMove,
      onWheel,
    },
  }
}
