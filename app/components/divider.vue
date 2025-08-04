<template>
  <div :class="classes" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: v => ['horizontal', 'vertical'].includes(v),
  },
})

const classes = computed(() =>
  props.orientation === 'vertical'
    ? 'h-3/4 border-l border-green-400/10 mx-1'
    : 'w-3/4 border-t border-green-400/10 my-1',
)
</script>
