<template>
  <div class="w-full h-full flex">
    <svg ref="svg" class="flex-1 bg-gray-300" height="100%" width="100%"
      :viewBox="`${svgEditor.viewbox.value.x ?? 0} ${svgEditor.viewbox.value.y ?? 0} ${svgEditor.viewbox.value.width ?? 0} ${svgEditor.viewbox.value.height ?? 0}`"
      preserveAspectRatio="none" @mousedown="svgEditor.events.onMouseDown" @mousemove="svgEditor.events.onMouseMove"
      @mouseup="svgEditor.events.onMouseUp" @wheel.prevent="svgEditor.events.onWheel">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ccc" stroke-width="1" vector-effect="non-scaling-stroke" />
        </pattern>
      </defs>

      <!-- Grid -->
      <rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#grid)" />

      <!-- Axes -->
      <line x1="-1000" y1="0.25" x2="1000" y2="0.25" stroke="red" stroke-width="1" vector-effect="non-scaling-stroke" />
      <line x1="0.25" y1="-1000" x2="0.25" y2="1000" stroke="green" stroke-width="1"
        vector-effect="non-scaling-stroke" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { RectItem } from '~/types/rect-item'

const svg = ref<SVGSVGElement | null>(null)
const svgEditor = useSvgEditor()
const svgElements = useSvgElements()
const rect = new RectItem()

svgElements.addItem(rect)

onMounted(async () => {
  if (svg.value) {
    svgEditor.setElement(svg.value)
  }
})
</script>
