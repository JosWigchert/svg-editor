<template>
    <div :class="classes" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    orientation: {
        type: String,
        default: 'horizontal',
        validator: v => ['horizontal', 'vertical'].includes(v)
    }
})

const classes = computed(() =>
    props.orientation === 'vertical'
        ? 'h-3/4 border-l border-gray-300 mx-0.25'
        : 'w-3/4 border-t border-gray-300 my-0.25'
)
</script>
