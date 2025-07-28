<template>
    <svg :ref="svg" class="w-full h-full bg-gray-300"
        :viewBox="`${svgEditor.viewbox.x ?? 0} ${svgEditor.viewbox.y ?? 0} ${svgEditor.viewbox.width ?? 0} ${svgEditor.viewbox.height ?? 0}`"
        @mousedown="svgEditor.events.onMouseDown" @mousemove="svgEditor.events.onMouseMove"
        @mouseup="svgEditor.events.onMouseUp" @wheel.prevent="svgEditor.events.onWheel">
        <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ccc" stroke-width="0.5" />
            </pattern>
        </defs>

        <!-- Grid -->
        <rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#grid)" />

        <!-- Axes -->
        <line x1="-1000" y1="0" x2="1000" y2="0" stroke="red" stroke-width="1" vector-effect="non-scaling-stroke" />
        <line x1="0" y1="-1000" x2="0" y2="1000" stroke="green" stroke-width="1" vector-effect="non-scaling-stroke" />
    </svg>
</template>

<script setup>
const svg = ref(undefined)

const svgEditor = useSvgEditor();

onMounted(async () => {
    await nextTick();

    if (svg.value) {
        svgEditor.setElement(svg.value);
    }
    console.log("Test");
    console.log(svgEditor.viewbox.value);
    console.log(svg.value);
});

</script>