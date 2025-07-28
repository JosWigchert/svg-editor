<template>
    <div class="flex flex-col h-screen">
        <!-- Top Toolbar -->
        <header class="flex items-center gap-2 bg-gray-100 border-b px-4 py-2">
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

        </header>

        <!-- Main SVG Viewer -->
        <main class="flex-1 bg-white">
            <SvgEditor />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const searchOpen = ref(false);

const constraintItems = ref<DropdownMenuItem>([
    [
        {
            label: 'Constraints',
            icon: 'tdesign:constraint',
            children: [
                {
                    label: 'Tangent',
                    icon: 'lucide:tangent'
                },
                {
                    label: 'Parallel',
                    icon: 'mdi:parallel'
                }
            ]
        }
    ]
]);

</script>
