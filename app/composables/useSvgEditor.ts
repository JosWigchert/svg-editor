export function useSvgEditor() {
  const viewbox = useState("viewbox", () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }));

  const zoomFactor = useState<number>("zoomFactor", () => 1);

  const svgElement = ref<SVGElement | undefined>(undefined);

  let isDragging = false;
  let lastMouse = { x: 0, y: 0 };

  function getMouseCoords(e: MouseEvent) {
    const rect = svgElement.value?.getBoundingClientRect();
    if (rect === undefined) {
      return {
        x: 0,
        y: 0,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function onWheel(e: WheelEvent) {
    if (svgElement.value === undefined) {
      return;
    }
    const direction = e.deltaY > 0 ? -1 : 1;
    const zoom = direction > 0 ? zoomFactor.value : 1 / zoomFactor.value;

    const mouse = getMouseCoords(e);
    const mx = mouse.x / svgElement.value.clientWidth;
    const my = mouse.y / svgElement.value.clientHeight;

    const vx = viewbox.value.x + viewbox.value.width * mx;
    const vy = viewbox.value.y + viewbox.value.height * my;

    viewbox.value.x = vx - (vx - viewbox.value.x) / zoom;
    viewbox.value.y = vy - (vy - viewbox.value.y) / zoom;
    viewbox.value.width /= zoom;
    viewbox.value.height /= zoom;
  }

  function onMouseDown(e: MouseEvent) {
    if (svgElement.value === undefined) {
      return;
    }

    isDragging = true;
    lastMouse = { x: e.clientX, y: e.clientY };
  }
  function onMouseUp(e: MouseEvent) {
    if (svgElement.value === undefined) {
      return;
    }

    if (!isDragging) {
      return;
    }

    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;

    const scaleX = viewbox.value.width / svgElement.value.clientWidth;
    const scaleY = viewbox.value.height / svgElement.value.clientHeight;

    viewbox.value.x -= dx * scaleX;
    viewbox.value.y -= dy * scaleY;

    lastMouse = { x: e.clientX, y: e.clientY };
  }
  function onMouseMove(_: MouseEvent) {
    if (svgElement.value === undefined) {
      return;
    }

    isDragging = false;
  }

  function setElement(element: SVGElement) {
    svgElement.value = element;
    console.log(svgElement.value);
    center();
  }

  function center() {
    const rect = svgElement.value?.getBoundingClientRect();
    if (rect === undefined) {
      return;
    }

    viewbox.value.x = -rect.width / 2;
    viewbox.value.y = -rect.height / 2;
    viewbox.value.width = rect.width;
    viewbox.value.height = rect.height;
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
  };
}
