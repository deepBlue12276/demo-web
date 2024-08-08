<template>
    <div
        ref="draggable"
        class="draggable"
        @mousedown="onMouseDown"
        :style="{ top: position.y + 'px', left: position.x + 'px' }"
    >
        <slot></slot>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const position = ref({ x: 0, y: 0 });
    const isDragging = ref(false);
    const offset = ref({ x: 0, y: 0 });

    const draggable = ref(null);

    const onMouseDown = (event) => {
        isDragging.value = true;
        offset.value = {
            x: event.clientX - position.value.x,
            y: event.clientY - position.value.y
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event) => {
        if (!isDragging.value) return;

        position.value = {
            x: event.clientX - offset.value.x,
            y: event.clientY - offset.value.y
        };
    };

    const onMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
</script>

<style scoped>
    .draggable {
        position: absolute;
        cursor: grab;
        user-select: none;
    }
</style>
