<template>
    <img
        v-show="isDragging"
        ref="draggable"
        src="@/assets/images/Pie Chart 饼环图.png"
        alt=""
        class="draggable"
        :style="{ top: position.y, left: position.x }"
    />
    <div class="wrap">
        <img src="@/assets/images/左侧.png" class="left" alt="" @mousedown="onMouseDown" />
        <div class="middle">
            <img src="@/assets/images/按钮.png" class="btns" alt="" />
            <div class="middle-c">
                <img v-show="showDrag" src="@/assets/images/Pie Chart 饼环图.png" alt="" class="chart1" />
                <!-- <img src="@/assets/images/Column Chart 柱形图.png" alt="" class="chart2" /> -->
            </div>
        </div>
        <div class="right">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="设计" name="v1" class="v1">
                    <img src="@/assets/images/Frame 30.png" class="btns" alt="" />
                    <img src="@/assets/images/Frame 31.png" class="btns" alt="" />
                    <img src="@/assets/images/Frame 32.png" class="btns" alt="" />
                </el-tab-pane>
                <el-tab-pane label="数据" name="v2" class="v1">
                    <img src="@/assets/images/Frame 427319111 (1) copy.png" class="btns" alt="" />
                    <img src="@/assets/images/Frame 427319116 (1) copy.png" class="btns" alt="" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const position = ref({ x: '40%', y: '90%' });
    const isDragging = ref(false);
    const offset = ref({ x: 0, y: 0 });
    const showDrag = ref(false);
    const draggable = ref();
    const onMouseDown = (event) => {
        console.log(draggable);
        offset.value = {
            x: event.clientX - draggable.value.offsetLeft,
            y: event.clientY - draggable.value.offsetTop
        };
        isDragging.value = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event) => {
        console.log(isDragging.value);
        if (!isDragging.value) return;
        console.log(event.clientX);
        position.value = {
            x: event.clientX - offset.value.x + 'px',
            y: event.clientY - offset.value.y + 'px'
        };
    };

    const onMouseUp = () => {
        console.log('up');
        isDragging.value = false;
        showDrag.value = true;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
</script>
<style scoped lang="scss">
    .demo-tabs {
    }
    .draggable {
        width: 400px;

        position: absolute;
        cursor: grab;
        user-select: none;
    }
    .drag {
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
            flex: 1;
            height: 100%;
            img {
                width: 90%;
            }
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
