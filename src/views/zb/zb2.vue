<template>
    <div class="wrap">
        <div class="left">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="指标库" name="v1">
                    <div class="tab-content">
                        <img src="@/assets/images/Frame 27.png" alt="" />
                        <div class="list">
                            <div class="list-item" @mousedown="onMouseDown($event, 1)">区域派发工单</div>
                            <div
                                v-if="isDragging[1]"
                                class="list-item draggable"
                                :style="{ top: position[dragType].y + 'px', left: position[dragType].x + 'px' }"
                            >
                                区域派发工单
                            </div>
                            <div class="list-item">区域待处理工单</div>
                            <div class="list-item" @mousedown="onMouseDown($event, 2)">区域已处理工单</div>
                            <div
                                v-if="isDragging[2]"
                                class="list-item draggable"
                                :style="{ top: position[dragType].y + 'px', left: position[dragType].x + 'px' }"
                            >
                                区域已处理工单
                            </div>
                            <div class="list-item">区域超时工单</div>
                            <div class="list-item">营销成功工单</div>
                            <div class="list-item">营销成功率</div>
                            <div class="list-item">业务转化率</div>
                            <div class="list-item">携转工单拍发量</div>
                            <div class="list-item">数据需求类工单...</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="统计维度" name="v2">
                    <div class="tab-content">
                        <img src="@/assets/images/Frame 27.png" alt="" />
                        <div class="list">
                            <div class="list-item">全省</div>
                            <div class="list-item">市</div>
                            <div class="list-item">县</div>
                            <div class="list-item">网格</div>
                            <div class="list-item">微格</div>
                            <div class="list-item">求和</div>
                            <div class="list-item">平均值</div>
                            <div class="list-item">占比</div>
                            <div class="list-item">年</div>
                            <div class="list-item" @mousedown="onMouseDown($event, 0)">月</div>
                            <div
                                v-if="isDragging[0]"
                                class="list-item draggable"
                                :style="{ top: position[dragType].y + 'px', left: position[dragType].x + 'px' }"
                            >
                                月
                            </div>
                            <div class="list-item">日</div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="middle">
            <img src="@/assets/images/按钮.png" class="btns" alt="" />
            <div class="middle-c">
                <el-table
                    border
                    :data="tableData"
                    width="auto"
                    header-row-class-name="table-head"
                    :style="`width: ${tableWidth}px; background: #404087`"
                >
                    <el-table-column v-for="c in columns" :prop="c.prop" :label="c.label" width="150" align="center" />
                </el-table>
            </div>
        </div>
        <img src="@/assets/images/右侧 (2).png" alt="" class="right" />
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const c1 = [
        {
            prop: 'm',
            label: '月'
        }
    ];
    const c2 = [
        {
            prop: 'm',
            label: '月'
        },
        {
            prop: 'p',
            label: '派发量'
        }
    ];
    const c3 = [
        {
            prop: 'm',
            label: '月'
        },
        {
            prop: 'p',
            label: '派发量'
        },
        {
            prop: 'c',
            label: '处理量'
        }
    ];
    const d1 = [
        {
            m: '2024.08'
        },
        {
            m: '2024.07'
        },
        {
            m: '2024.06'
        },
        {
            m: '2024.05'
        },
        {
            m: '2024.04'
        },
        {
            m: '2024.03'
        },
        {
            m: '2024.02'
        },
        {
            m: '2024.01'
        },
        {
            m: '2023.12'
        },
        {
            m: '2023.11'
        },
        {
            m: '2023.10'
        },
        {
            m: '2023.09'
        }
    ];
    const d2 = [
        {
            m: '2024.08',
            p: '1332'
        },
        {
            m: '2024.07',
            p: '1208'
        },
        {
            m: '2024.06',
            p: '998'
        },
        {
            m: '2024.05',
            p: '1153'
        },
        {
            m: '2024.04',
            p: '1265'
        },
        {
            m: '2024.03',
            p: '984'
        },
        {
            m: '2024.02',
            p: '435'
        },
        {
            m: '2024.01',
            p: '1323'
        },
        {
            m: '2023.12',
            p: '994'
        },
        {
            m: '2023.11',
            p: '1437'
        },
        {
            m: '2023.10',
            p: '1232'
        },
        {
            m: '2023.09',
            p: '1549'
        }
    ];
    const d3 = [
        {
            m: '2024.08',
            p: '1332',
            c: '231'
        },
        {
            m: '2024.07',
            p: '1208',
            c: '984'
        },
        {
            m: '2024.06',
            p: '998',
            c: '878'
        },
        {
            m: '2024.05',
            p: '1153',
            c: '1149'
        },
        {
            m: '2024.04',
            p: '1265',
            c: '1264'
        },
        {
            m: '2024.03',
            p: '984',
            c: '976'
        },
        {
            m: '2024.02',
            p: '435',
            c: '430'
        },
        {
            m: '2024.01',
            p: '1323',
            c: '1323'
        },
        {
            m: '2023.12',
            p: '994',
            c: '994'
        },
        {
            m: '2023.11',
            p: '1437',
            c: '1307'
        },
        {
            m: '2023.10',
            p: '1232',
            c: '1117'
        },
        {
            m: '2023.09',
            p: '1549',
            c: '1540'
        }
    ];
    const activeName = ref('v1');
    const tableData = ref([]);
    const columns = ref([]);
    const tableWidth = ref();
    const generatorData = () => {
        if (dragType.value == 0) {
            columns.value = c1;
            tableData.value = d1;
        } else if (dragType.value == 1) {
            columns.value = c2;
            tableData.value = d2;
        } else if (dragType.value == 2) {
            columns.value = c3;
            tableData.value = d3;
        }
    };
    const position = ref([
        { x: 170, y: 330 },
        { x: 0, y: 50 },
        { x: 0, y: 125 }
    ]);
    const isDragging = ref([false, false, false]);
    const dragType = ref();
    const offset = ref({ x: 0, y: 0 });

    const onMouseDown = (event, type) => {
        dragType.value = type;
        console.log(dragType.value);
        offset.value = {
            x: event.clientX - position.value[dragType.value].x,
            y: event.clientY - position.value[dragType.value].y
        };
        isDragging.value[type] = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event) => {
        if (!isDragging.value[dragType.value]) return;

        position.value[dragType.value] = {
            x: event.clientX - offset.value.x,
            y: event.clientY - offset.value.y
        };
    };

    const onMouseUp = () => {
        isDragging.value[dragType.value] = false;
        generatorData();
        tableWidth.value = (dragType.value + 1) * 150;
        console.log(tableData.value);
        console.log(columns.value);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
</script>
<style scoped lang="scss">
    .table-head {
        background: #2d2c68;
    }
    .wrap {
        display: flex;
        height: 100%;
        width: 100%;
        gap: 40px;
        flex-wrap: nowrap;
    }
    .left {
        background: #1a1848;
        width: 800px;
        height: 100%;
        padding: 40px;
        .tab-content {
            img {
                width: 100%;
                margin-bottom: 40px;
            }
            .list {
                display: flex;
                flex-wrap: wrap;
                gap: 60px;
                align-items: center;
                justify-content: space-between;
            }
            .list-item {
                background: #232258;
                width: 45%;
                height: 100px;
                border-radius: 10px;
                line-height: 100px;
                text-align: center;
                color: #fff;
                cursor: pointer;
            }
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
            display: flex;
            justify-content: center;
            .chart1 {
                height: 600px;
                margin-bottom: 50px;
            }
            .chart2 {
                width: 100%;
            }
        }
    }
    .draggable {
        position: absolute;
        cursor: grab;
        user-select: none;
    }
    .right {
        height: 100%;
    }
</style>
