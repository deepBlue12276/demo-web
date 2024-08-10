<template>
    <div class="list-page">
        <div class="head">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="在途工单" name="v1" class="v1">
                    <div class="form">
                        <img src="@/assets/images/Frame 427319103.png" alt="" />
                        <img src="@/assets/images/Frame 427319111.png" alt="" />
                        <img src="@/assets/images/Frame 427319114.png" alt="" />
                        <img src="@/assets/images/Frame 427319115 copy.png" alt="" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="完结工单" name="v2"
                    ><div class="form">
                        <img src="@/assets/images/Frame 427319103.png" alt="" />
                        <img src="@/assets/images/Frame 427319111.png" alt="" />
                        <img src="@/assets/images/Frame 427319114.png" alt="" />
                        <img src="@/assets/images/Frame 427319115.png" alt="" />
                        <img src="@/assets/images/Frame 427319116.png" alt="" /></div
                ></el-tab-pane>
                <el-tab-pane label="搁置工单" name="v3"
                    ><div class="form">
                        <img src="@/assets/images/Frame 427319103.png" alt="" />
                        <img src="@/assets/images/Frame 427319111.png" alt="" />
                        <img src="@/assets/images/Frame 427319114.png" alt="" />
                        <img src="@/assets/images/Frame 427319115.png" alt="" />
                        <img src="@/assets/images/Frame 427319116.png" alt="" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-loading="loading" class="content">
            <!-- <img src="@/assets/images/Frame 427319104.png" alt="" />
            <div class="table">
                <el-table border :data="tableData[activeName]" width="auto" header-row-class-name="table-head">
                    <el-table-column
                        :prop="c.prop"
                        :label="c.label"
                        width="150"
                        v-for="c in columns[activeName]"
                        align="center"
                    />
                </el-table>
            </div> -->
            <img v-if="activeName == 'v1' && !loading" src="@/assets/images/Frame 427319114 (1).png" alt="" />
            <img v-if="activeName == 'v2' && !loading" src="@/assets/images/Frame 427319114 (2).png" alt="" />
            <img v-if="activeName == 'v3' && !loading" src="@/assets/images/Frame 427319114 (3).png" alt="" />
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const tableData = ref({
        v1: [
            {
                a: 'GDPG00163784394',
                b: '携转工单',
                c: '携转工单',
                d: '处理超时',
                e: '接口异常',
                f: '2024-08-01 03:48'
            }
        ],
        v2: [],
        v3: []
    });
    const columns = ref({
        v1: [],
        v2: [],
        v3: []
    });
    const loading = ref(false);
    const activeName = ref('v1');
    const handleClick = (v) => {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            activeName.value = v.paneName;
        }, 500);
    };
</script>
<style scoped lang="scss">
    .list-page {
        background: #000928;
        &::-webkit-scrollbar {
            width: 0;
        }

        /* 隐藏水平滚动条 */
        &::-webkit-scrollbar {
            height: 0;
        }
        .head {
            background: #111037;
            padding: 20px 0;
        }
        .form {
            display: flex;
            flex-direction: column;
            gap: 50px;

            img {
                width: 100%;
            }
        }
        .content {
            padding: 40px 0;
            display: flex;
            flex-direction: column;
            gap: 50px;
            height: 100%;
            img {
                width: 100%;
            }
            .table {
                padding: 0 40px;
            }
        }
    }
</style>
