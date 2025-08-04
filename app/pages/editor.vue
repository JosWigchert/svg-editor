<template>
    <div class="relative w-screen h-screen overflow-hidden">
        <!-- Overlay Header -->
        <header
            class="absolute top-1 left-1 right-1 z-10 h-12 flex items-center gap-2 dark:bg-slate-800 rounded-xl shadow px-4 py-2 backdrop-blur-md">
            <!-- Action Buttons -->
            <UButton icon="i-mdi:folder-open" variant="ghost" title="Open" />
            <UButton icon="i-mdi:content-save" variant="ghost" title="Save" />
            <UButton icon="i-mdi:download" variant="ghost" title="Download" />
            <Divider orientation="vertical" />
            <UButton icon="i-mdi:undo" variant="ghost" title="Undo" />
            <UButton icon="i-mdi:redo" variant="ghost" title="Redo" />
            <Divider orientation="vertical" />

            <!-- Constraints Dropdown -->
            <UDropdownMenu :items="constraintItems">
                <UButton icon="lucide:menu" variant="ghost" />
            </UDropdownMenu>

            <UInputMenu v-model="commandValue" :items="commands" variant="outline" @update:model-value="onSelect" />
        </header>

        <!-- Fullscreen SVG Viewer -->
        <main class="w-full h-full">
            <SvgEditor />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { ArrayOrNested, DropdownMenuItem, InputMenuItem } from '@nuxt/ui'

const constraintItems = ref<ArrayOrNested<DropdownMenuItem>>([
    [
        {
            label: 'Constraints',
            icon: 'tdesign:constraint',
            children: [
                {
                    label: 'Tangent',
                    icon: 'lucide:tangent',
                },
                {
                    label: 'Parallel',
                    icon: 'mdi:parallel',
                },
            ],
        },
    ],
])

const commandValue = ref({ label: '', icon: '' })

const commands = ref<ArrayOrNested<InputMenuItem>>([
    {
        label: 'Go to Dashboard',
        icon: 'mdi:parallel',
    },
    {
        label: 'Open Settings',
        icon: 'mdi:parallel',
    },
    {
        label: 'Logout',
        icon: 'mdi:parallel',
    },
])

function onSelect(value: InputMenuItem) {
    console.log('Command:', value)
    // Clear input after selection
    commandValue.value = { label: '', icon: '' }
}
</script>
