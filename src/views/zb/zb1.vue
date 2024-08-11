<template>
    <div class="wrap">
        <img src="@/assets/images/左侧.png" class="left" alt="" @mousedown="onMouseDown" />
        <img
            v-show="isDragging"
            src="@/assets/images/Pie Chart 饼环图.png"
            alt=""
            class="drag"
            :style="{ top: position.y + 'px', left: position.x + 'px' }"
        />
        <div class="middle">
            <img src="@/assets/images/按钮.png" class="btns" alt="" />
            <div class="middle-c">
                <img v-show="showDrag" src="@/assets/images/Pie Chart 饼环图.png" alt="" class="chart1" />
                <!-- <img src="@/assets/images/Column Chart 柱形图.png" alt="" class="chart2" /> -->
            </div>
        </div>
        <img v-if="route.query.type == '1'" src="@/assets/images/右侧 (1).png" alt="" class="right" />
        <img v-else src="@/assets/images/右侧.png" alt="" class="right" />
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const position = ref({ x: 650, y: 1200 });
    const isDragging = ref(false);
    const offset = ref({ x: 0, y: 0 });
    const showDrag = ref(false);
    const onMouseDown = (event) => {
        offset.value = {
            x: event.clientX - position.value.x,
            y: event.clientY - position.value.y
        };
        isDragging.value = true;
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
        showDrag.value = true;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
</script>
<style scoped lang="scss">
    .drag {
        width: 400px;
        position: absolute;
        cursor: grab;
        user-select: none;
    }
    .wrap {
        display: flex;
        height: 95%;
        width: 100%;
        gap: 40px;
        flex-wrap: nowrap;
        .left {
            height: 100%;
        }
        .right {
            height: 100%;
        }
        .middle {
            display: flex;
            flex-direction: column;
            align-items: end;
            height: 100%;
            width: 50%;
            .btns {
                height: 55px;
                margin: 30px 0;
            }
            .middle-c {
                background: #1a1848;
                height: 100%;
                width: 100%;
                padding: 30px;
                .chart1 {
                    height: 600px;
                    margin-bottom: 50px;
                }
                .chart2 {
                    width: 100%;
                }
            }
        }
    }
</style>
